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
  name: "Mukilan E V",
  tagline: "Designing Experience-Driven Environments",
  description:
    "Executive Architect & Conceptual designer connecting people with nature through sustainable, site-responsive architecture.",
  established: "2026",
  location: "Barjora, West Bengal, India",
  currentProject: {
    name: "New Guest House",
    location: "Barsingsar",
    status: "Planning",
  },
  stats: [
    { label: "BArch", value: 2026, suffix: "" },
    { label: "Experience", value: 3, suffix: " Yrs" },
    { label: "Internships", value: 3, suffix: "" },
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
    name: "Mukilan E V",
    title: "Executive Architect",
    image: "/images/team/mukilan.png",
    bio: "Mukilan E V is an Executive Architect at Pinnacle FutureBuild Pvt. Limited. A conceptual designer focused on designing experience-driven environments that connect people with nature. He holds a BArch from the National Institute of Technology, Tiruchirappalli.",
  },
];

// ─── Skills ──────────────────────────────────────────────────────────────────

export const skills: Skill[] = [
  // Design
  { name: "Concept Development", icon: "Lightbulb", category: "design" },
  { name: "User Experience Design", icon: "Users", category: "design" },
  { name: "Architectural Design", icon: "Compass", category: "design" },
  { name: "Conceptual Design", icon: "PenTool", category: "design" },
  // Technical
  { name: "BIM Technology", icon: "Layers", category: "technical" },
  { name: "3D Modeling", icon: "Box", category: "technical" },
  { name: "Site-Responsive Planning", icon: "Map", category: "technical" },
  { name: "Spatial Layouts", icon: "Maximize", category: "technical" },
  // Software
  { name: "Rhinoceros", icon: "Hexagon", category: "software" },
  { name: "AutoCAD", icon: "PenTool", category: "software" },
  { name: "Revit", icon: "LayoutGrid", category: "software" },
  { name: "SketchUp", icon: "Cuboid", category: "software" },
  // Sustainability
  { name: "Sustainable Design", icon: "Leaf", category: "sustainability" },
  { name: "Net-Zero Principles", icon: "Wind", category: "sustainability" },
  { name: "Nature-Integrated Design", icon: "TreePine", category: "sustainability" },
  { name: "Environmental Performance", icon: "Activity", category: "sustainability" },
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
    year: "July 2026 - Present",
    title: "Executive Architect at Pinnacle",
    description: "Executive Architect @Pinnacle FutureBuild Pvt. Limited. BIM Architect, Conceptual designer, designing Experience-Driven Environments that Connect People with Nature.",
    location: "Durgapur",
  },
  {
    year: "Dec 2025",
    title: "Research Advisory at NLC India Limited",
    description: "Worked on the design and development of the New Guest House near LSN Township, Barsingsar, contributing to concept generation, site-responsive planning and sustainable design integration. Developed architectural plans, spatial layouts and detailed design strategies while incorporating net-zero and nature-integrated design principles.",
    location: "Neyveli Township",
  },
  {
    year: "Dec 2024 - Jun 2025",
    title: "Intern Architect at Mindspace Architects",
    description: "Architectural intern.",
    location: "Bengaluru, Karnataka, India",
  },
  {
    year: "Jun 2024 - Jul 2024",
    title: "Architectural Intern at LP Builders",
    description: "Architectural intern.",
    location: "Vadalur, Tamil Nadu, India",
  },
  {
    year: "Dec 2023 - Jan 2024",
    title: "Architectural Intern at L&T Construction",
    description: "Architectural intern.",
    location: "Manapakkam Chennai Tamilnadu",
  },
  {
    year: "2021 - 2026",
    title: "BArch at NIT Tiruchirappalli",
    description: "Bachelor of Architecture, National Institute of Technology, Tiruchirappalli.",
  },
];

// ─── Contact ─────────────────────────────────────────────────────────────────

export const contactInfo: ContactInfo = {
  office: {
    name: "Mukilan E V",
    address: ["Barjora, West Bengal", "India"],
  },
  phone: "+91", // Add your phone here
  email: "mukilan@example.com", // Add your email here
  inquiries: [
    { label: "New business inquiries", email: "mukilan@example.com" },
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
  eyebrow: "About Me",
  headline: "Designing Experience-Driven Environments",
  paragraphs: [
    "I am Mukilan E V, an Executive Architect at Pinnacle FutureBuild Pvt. Limited, and a conceptual designer.",
    "My focus is on designing experience-driven environments that connect people with nature. With experience spanning from conceptual generation and site-responsive planning to sustainable design integration, I strive to incorporate net-zero and nature-integrated principles to enhance environmental and user performance.",
  ],
  capabilities: [
    "Concept Development",
    "User Experience Design (UED)",
    "Rhinoceros",
    "BIM Architecture",
    "Site-responsive Planning",
    "Net-Zero Principles",
    "Nature-Integrated Design",
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
