const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT_DIR = path.join(__dirname, 'oppenoffice.com');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.webmanifest': 'application/manifest+json',
  '.tif': 'image/tiff',
  '.tiff': 'image/tiff',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

// Build a filename lookup cache for the dist directories (JS & CSS)
const fileCache = new Map();
// Keep a list of all available media images for fallback
const mediaImages = [];

function buildFileCache(dir) {
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isFile()) {
        const match = file.match(/\.([a-f0-9]{20})\.(js|css)$/);
        if (match) {
          const hash = match[1];
          const ext = match[2];
          const key = `${hash}.${ext}`;
          fileCache.set(key, fullPath);
        }
        fileCache.set(file, fullPath);
      } else if (stat.isDirectory()) {
        buildFileCache(fullPath);
      }
    }
  } catch (e) {
  }
}

function buildMediaCache(dir) {
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isFile()) {
        if (fullPath.match(/\.(jpg|jpeg|png|webp|gif|tif)$/i)) {
          mediaImages.push(fullPath);
        }
      } else if (stat.isDirectory()) {
        buildMediaCache(fullPath);
      }
    }
  } catch (e) {
  }
}

buildFileCache(path.join(ROOT_DIR, 'static', 'dist'));
buildMediaCache(path.join(ROOT_DIR, 'media'));

console.log(`  📦 Cached ${fileCache.size} dist files for fast lookup`);
console.log(`  🖼️  Cached ${mediaImages.length} media images for fallbacks`);

function findFileByHash(requestedBasename) {
  if (fileCache.has(requestedBasename)) {
    return fileCache.get(requestedBasename);
  }
  const stripped = requestedBasename.replace(/~/g, '');
  if (fileCache.has(stripped)) {
    return fileCache.get(stripped);
  }
  const match = requestedBasename.match(/\.([a-f0-9]{20})\.(js|css)$/);
  if (match) {
    const key = `${match[1]}.${match[2]}`;
    if (fileCache.has(key)) {
      return fileCache.get(key);
    }
  }
  return null;
}

function getMediaFallback(requestedUrlPath) {
  if (mediaImages.length === 0) return null;
  
  const basename = path.basename(requestedUrlPath).toLowerCase();
  
  // Try to find an image with a matching base name (ignore size suffixes)
  // e.g. "Emiliano_Homepage_Desktop.jpg.3600x2394..." -> "emiliano_homepage_desktop"
  let cleanName = basename.split('.')[0];
  if (cleanName.length > 3) {
    const nameMatch = mediaImages.find(img => path.basename(img).toLowerCase().includes(cleanName));
    if (nameMatch) return nameMatch;
  }
  
  // Try to find an image for the same project/folder
  const parts = requestedUrlPath.split('/');
  if (parts.length > 2) {
    const folderName = parts[parts.length - 2].toLowerCase();
    if (folderName && folderName !== 'work' && folderName !== 'homeimage') {
      const folderMatch = mediaImages.find(img => img.toLowerCase().includes(folderName));
      if (folderMatch) return folderMatch;
    }
  }
  
  // Pick a random image deterministically based on the URL so it's consistent
  const hash = requestedUrlPath.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return mediaImages[hash % mediaImages.length];
}

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/') {
    urlPath = '/index.html';
  }

  const filePath = path.join(ROOT_DIR, urlPath);
  if (!filePath.startsWith(ROOT_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  if (urlPath.startsWith('/static/dist/')) {
    const basename = path.basename(urlPath);
    const cachedPath = findFileByHash(basename);
    
    if (cachedPath) {
      fs.readFile(cachedPath, (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end('Internal Server Error');
          return;
        }
        const ext = path.extname(cachedPath).toLowerCase();
        res.writeHead(200, {
          'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
          'Cache-Control': 'public, max-age=3600',
          'Access-Control-Allow-Origin': '*',
        });
        res.end(data);
      });
      return;
    }
  }

  // Check if file exists exactly as requested
  fs.readFile(filePath, (err, data) => {
    if (!err) {
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, {
        'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
      });
      res.end(data);
      return;
    }

    // If it's a media request and file is missing, use fuzzy fallback
    if (urlPath.startsWith('/media/')) {
      const fallbackPath = getMediaFallback(urlPath);
      if (fallbackPath) {
        fs.readFile(fallbackPath, (fallbackErr, fallbackData) => {
          if (!fallbackErr) {
            const ext = path.extname(fallbackPath).toLowerCase();
            res.writeHead(200, {
              'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
              'Cache-Control': 'public, max-age=3600',
              'Access-Control-Allow-Origin': '*',
            });
            res.end(fallbackData);
            console.log(`[200] ${urlPath} -> ${path.basename(fallbackPath)} (fallback)`);
          } else {
            res.writeHead(404);
            res.end('Not Found');
          }
        });
        return;
      }
    }

    // Standard 404 - If not an asset, fallback to index.html for SPA routing
    if (!path.basename(urlPath).includes('.')) {
      fs.readFile(path.join(ROOT_DIR, 'index.html'), (err, data) => {
        if (!err) {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(data);
        } else {
          res.writeHead(404);
          res.end('Not Found');
        }
      });
      return;
    }
    
    if (!path.basename(urlPath).includes('favicon')) {
      console.log(`[404] ${urlPath}`);
    }
    res.writeHead(404);
    res.end('Not Found');
  });
});

server.listen(PORT, () => {
  console.log(`\n  ✅ Oppenheim Architecture website is running!\n`);
  console.log(`  🌐 Open in your browser: http://localhost:${PORT}\n`);
  console.log(`  Press Ctrl+C to stop the server.\n`);
});
