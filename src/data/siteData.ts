// ─── Types ───────────────────────────────────────────────────────────────────

export interface Project {
  title: string;
  image: string;
  location: string;
  status: string;
  typology: string;
  scale: string;
  description: string;
}

export interface TeamMember {
  name: string;
  title: string;
  image: string;
  bio: string;
}

export interface Skill {
  name: string;
  icon: string; // Lucide icon name
  category: "design" | "technical" | "software" | "sustainability";
}

export interface ExperienceItem {
  year: string;
  title: string;
  description: string;
  location?: string;
}

export interface ContactInfo {
  office: { name: string; address: string[] };
  phone: string;
  email: string;
  inquiries: { label: string; email: string }[];
  socials: { name: string; url: string; shortName: string }[];
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  established: string;
  location: string;
  currentProject: { name: string; location: string; status: string };
  stats: { label: string; value: number; suffix: string }[];
}

// ─── Site Config ─────────────────────────────────────────────────────────────

export const siteConfig: SiteConfig = {
  name: "Mukilan Architecture",
  tagline: "Architecture for Life",
  description:
    "Every structure exists in harmony with its environment — celebrating the threshold between built form and nature.",
  established: "2008",
  location: "Chennai, India",
  currentProject: {
    name: "Bal Harbour Residence",
    location: "Miami, FL",
    status: "In Progress",
  },
  stats: [
    { label: "Projects", value: 94, suffix: "+" },
    { label: "Years", value: 16, suffix: "" },
    { label: "Awards", value: 32, suffix: "" },
  ],
};

// ─── Projects ────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    title: "Coastal Villa",
    image: "/images/projects/coastal-villa.png",
    location: "Malibu, California",
    status: "Completed 2023",
    typology: "Private / Residential",
    scale: "8,500 sq ft",
    description:
      "A breathtaking coastal retreat featuring panoramic ocean views, integrating natural stone and sustainable timber to blend seamlessly with the rocky clifftop.",
  },
  {
    title: "Tech Pavilion",
    image: "/images/projects/tech-pavilion.png",
    location: "Silicon Valley, CA",
    status: "Completed 2022",
    typology: "Commercial / Office",
    scale: "45,000 sq ft",
    description:
      "A sleek contemporary office building with a dramatic cantilevered structure and glass facade designed to maximize natural light and foster collaboration.",
  },
  {
    title: "Beach Resort",
    image: "/images/projects/beach-resort.png",
    location: "Bali, Indonesia",
    status: "Completed 2021",
    typology: "Hospitality / Resort",
    scale: "120,000 sq ft",
    description:
      "A luxurious tropical resort with thatched roof pavilions and wooden walkways over crystal clear water, representing modern minimalist architecture in nature.",
  },
  {
    title: "Cultural Center",
    image: "/images/projects/cultural-center.png",
    location: "Kyoto, Japan",
    status: "In Progress",
    typology: "Public / Cultural",
    scale: "65,000 sq ft",
    description:
      "A modern museum building characterized by dramatic curved concrete walls and large glass atriums that embrace traditional and contemporary art.",
  },
  {
    title: "Hillside House",
    image: "/images/projects/hillside-house.png",
    location: "Aspen, Colorado",
    status: "Completed 2024",
    typology: "Private / Residential",
    scale: "12,000 sq ft",
    description:
      "Built into rocky terrain with rich brown natural stone, this residence features cascading green terraces and floor-to-ceiling windows overlooking a lush valley.",
  },
  {
    title: "Boutique Hotel",
    image: "/images/projects/boutique-hotel.png",
    location: "Miami, Florida",
    status: "Completed 2023",
    typology: "Hospitality / Hotel",
    scale: "85,000 sq ft",
    description:
      "An elegant lobby interior with soaring ceilings, warm golden pendant lighting, and rich mahogany wood columns forming a luxury minimalist design.",
  },
  {
    title: "Garden Residence",
    image: "/images/projects/garden-residence.png",
    location: "Portland, Oregon",
    status: "Completed 2020",
    typology: "Private / Residential",
    scale: "5,400 sq ft",
    description:
      "A sustainable family home designed around a central ancient oak tree, blurring the lines between indoor living and the lush outdoor environment.",
  },
  {
    title: "Lakeside Retreat",
    image: "/images/projects/lakeside-retreat.png",
    location: "Lake Tahoe, NV",
    status: "Completed 2022",
    typology: "Hospitality / Retreat",
    scale: "18,000 sq ft",
    description:
      "A series of interconnected timber cabins floating above the forest floor, offering guests an immersive woodland experience without disturbing the site.",
  },
  {
    title: "Urban Tower",
    image: "/images/projects/urban-tower.png",
    location: "New York, NY",
    status: "In Progress",
    typology: "Commercial / High-rise",
    scale: "450,000 sq ft",
    description:
      "A striking addition to the city skyline, featuring an articulated glass facade and integrated sky gardens that provide green spaces at altitude.",
  },
  {
    title: "Heritage Restoration",
    image: "/images/projects/heritage-restoration.png",
    location: "London, UK",
    status: "Completed 2021",
    typology: "Public / Civic",
    scale: "32,000 sq ft",
    description:
      "Careful adaptive reuse of a 19th-century industrial building into a vibrant community hub, preserving historic masonry while inserting modern glass interventions.",
  },
];

// ─── Team ────────────────────────────────────────────────────────────────────

export const teamMembers: TeamMember[] = [
  {
    name: "Mukilan EV",
    title: "CEO & Founding Principal",
    image: "/images/team/mukilan.png",
    bio: "Mukilan EV founded Mukilan Architecture with a vision to create buildings that exist in harmony with their environment. With over a decade of experience in contemporary architectural design, he leads the studio with a philosophy that blends bold innovation with deep respect for natural landscapes and cultural context.",
  },
  {
    name: "Naveenraj SS",
    title: "Senior Developer",
    image: "/images/team/naveenraj.png",
    bio: "Naveenraj SS brings cutting-edge technology expertise to the studio, bridging the gap between architectural design and digital innovation. His work in computational design and BIM technology has helped the firm push the boundaries of what's possible in modern architecture.",
  },
];

// ─── Skills ──────────────────────────────────────────────────────────────────

export const skills: Skill[] = [
  // Design
  { name: "Architectural Design", icon: "Compass", category: "design" },
  { name: "Interior Design", icon: "Armchair", category: "design" },
  { name: "Urban Planning", icon: "Map", category: "design" },
  { name: "Landscape Architecture", icon: "Trees", category: "design" },
  // Technical
  { name: "Structural Analysis", icon: "Building2", category: "technical" },
  { name: "3D Modeling", icon: "Box", category: "technical" },
  { name: "BIM Technology", icon: "Layers", category: "technical" },
  { name: "Parametric Design", icon: "Spline", category: "technical" },
  // Software
  { name: "AutoCAD", icon: "PenTool", category: "software" },
  { name: "Revit", icon: "LayoutGrid", category: "software" },
  { name: "SketchUp", icon: "Cuboid", category: "software" },
  { name: "V-Ray Rendering", icon: "Sun", category: "software" },
  // Sustainability
  { name: "Green Building", icon: "Leaf", category: "sustainability" },
  { name: "Energy Efficiency", icon: "Zap", category: "sustainability" },
  { name: "Material Science", icon: "Blocks", category: "sustainability" },
  { name: "LEED Certification", icon: "Award", category: "sustainability" },
];

export const skillCategories = [
  { key: "design" as const, label: "Design" },
  { key: "technical" as const, label: "Technical" },
  { key: "software" as const, label: "Software" },
  { key: "sustainability" as const, label: "Sustainability" },
];

// ─── Experience ──────────────────────────────────────────────────────────────

export const experience: ExperienceItem[] = [
  {
    year: "2008",
    title: "Mukilan Architecture Founded",
    description:
      "Established the studio in Chennai with a mission to design buildings that harmonize with their natural surroundings.",
    location: "Chennai, India",
  },
  {
    year: "2012",
    title: "First International Project",
    description:
      "Expanded beyond India with a landmark residential commission in Southeast Asia, establishing our reputation for site-sensitive design.",
    location: "Bali, Indonesia",
  },
  {
    year: "2016",
    title: "Award-Winning Cultural Center",
    description:
      "Received national recognition for the design of a public cultural center that seamlessly integrated modern form with traditional spatial principles.",
    location: "Kyoto, Japan",
  },
  {
    year: "2019",
    title: "Sustainability Pioneer",
    description:
      "Achieved LEED Platinum certification on three consecutive projects, cementing our commitment to environmentally responsible architecture.",
  },
  {
    year: "2022",
    title: "Global Practice Expansion",
    description:
      "Opened satellite operations to serve projects across North America and Europe, bringing our design philosophy to new landscapes and cultures.",
    location: "Miami, FL",
  },
  {
    year: "2024",
    title: "Studio Growth & Innovation",
    description:
      "Integrated computational design and BIM workflows, expanding our team and capabilities to tackle increasingly ambitious and complex commissions worldwide.",
    location: "Chennai, India",
  },
];

// ─── Contact ─────────────────────────────────────────────────────────────────

export const contactInfo: ContactInfo = {
  office: {
    name: "Mukilan Architecture Studio",
    address: ["Chennai, Tamil Nadu", "India"],
  },
  phone: "+91 9677335058",
  email: "mukilan@gmail.com",
  inquiries: [
    { label: "New business inquiries", email: "mukilan@gmail.com" },
    { label: "Media & press inquiries", email: "mukilan@gmail.com" },
  ],
  socials: [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/mukilan-e-v-2ab80525b",
      shortName: "IN",
    },
  ],
};

// ─── About ───────────────────────────────────────────────────────────────────

export const aboutContent = {
  eyebrow: "About the Studio",
  headline: "Designing at the Intersection of Nature and Innovation",
  paragraphs: [
    "Mukilan Architecture is a Chennai-based design practice founded by Mukilan EV in 2008. We craft buildings by carefully balancing the needs of the individual and the attributes of the location — creating architecture that exists in profound dialogue with its environment.",
    "Our multidisciplinary team combines architectural design, computational technology, and sustainable building practices to deliver projects that are simultaneously bold and humble, contemporary yet timeless.",
  ],
  capabilities: [
    "Residential Design",
    "Commercial Architecture",
    "Hospitality & Resorts",
    "Cultural Spaces",
    "Urban Planning",
    "Interior Design",
    "Landscape Architecture",
    "Heritage Restoration",
    "Sustainable Design",
    "BIM & Computational Design",
  ],
};

// ─── Navigation ──────────────────────────────────────────────────────────────

export const navLinks = [
  { name: "About", id: "#about" },
  { name: "Works", id: "#works" },
  { name: "Philosophy", id: "#philosophy" },
  { name: "Experience", id: "#experience" },
  { name: "Skills", id: "#skills" },
  { name: "Studio", id: "#people" },
  { name: "Contact", id: "#contact" },
];
