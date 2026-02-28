import { Freelancer, Service, TeamMember } from "@/types";

export const services: Service[] = [
  { title: "Video Editing", image: "/assets/service/video_editing.png" },
  {
    title: "Graphic Designer",
    image: "/assets/service/graphics_designing.jpg",
  },
  { title: "Social Media Mgr", image: "/assets/service/social_media.png" },
  {
    title: "JavaScript Expert",
    image: "/assets/service/javascript_expert.jpg",
  },
  { title: "Marketing", image: "/assets/service/marketing.png" },
  { title: "Translators", image: "/assets/service/translate.png" },
];

export const freelancers: Freelancer[] = [
  {
    name: "Siddhesh Mhatre",
    username: "siddhesh_dev",
    badge: "Expert",
    location: "Mumbai",
    title: "Backend Developer",
    rating: "4.9",
    avatar_color: "#6366f1",
    description:
      "Full-stack Rust & Node.js developer with 2+ years building production APIs, microservices, and real-time systems. Specializing in Actix-Web, PostgreSQL, and cloud deployments.",
  },
  {
    name: "Aditya Tiwari",
    username: "adi_frontend",
    badge: "Expert",
    location: "Mumbai",
    title: "Frontend Developer",
    rating: "4.8",
    avatar_color: "#ec4899",
    description:
      "React & Next.js specialist building responsive, performant web apps. Experienced with TypeScript, Tailwind CSS, and modern component architectures.",
  },
  {
    name: "Soham Gadekar",
    username: "soham_ux",
    badge: "Expert",
    location: "Pune",
    title: "UI/UX Designer",
    rating: "4.7",
    avatar_color: "#f59e0b",
    description:
      "Creative UI/UX designer crafting intuitive interfaces and design systems. Proficient in Figma, prototyping, and translating user research into pixel-perfect designs.",
  },
  {
    name: "Riya Kapoor",
    username: "riya_edits",
    badge: "Intermediate",
    location: "Delhi",
    title: "Video Editor",
    rating: "4.6",
    avatar_color: "#10b981",
    description:
      "Professional video editor delivering polished content for YouTube, reels, and ads. Skilled in Premiere Pro, After Effects, and color grading.",
  },
  {
    name: "Arjun Nair",
    username: "arjun_mobile",
    badge: "Intermediate",
    location: "Bangalore",
    title: "Mobile App Developer",
    rating: "4.5",
    avatar_color: "#8b5cf6",
    description:
      "Cross-platform mobile developer building native-quality apps with React Native and Flutter. From MVP to production, I ship fast and iterate quickly.",
  },
  {
    name: "Meera Joshi",
    username: "meera_data",
    badge: "Beginner",
    location: "Hyderabad",
    title: "Data Analyst",
    rating: "4.3",
    avatar_color: "#ef4444",
    description:
      "Aspiring data analyst with strong Python and SQL skills. I turn raw datasets into actionable insights using pandas, matplotlib, and Tableau dashboards.",
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: "Siddhesh Mhatre",
    role: "Backend Developer",
    description: "Hello there! I'm aspiring backend developer from 2 years.",
  },
  {
    name: "Aditya Tiwari",
    role: "Frontend Developer",
    description:
      "Hello! I'm a frontend developer with a passion for creating efficient systems.",
  },
  {
    name: "Soham Gadekar",
    role: "UI/UX Designer",
    description:
      "Hey! I'm a UI/UX designer looking forward to help the freelance industry.",
  },
];

export const serviceNames: string[] = [
  "Web Development",
  "Mobile App Development",
  "Database Design & Optimization",
  "API Development & Integration",
  "Cloud Architecture (AWS/Azure)",
  "DevOps Implementation",
  "UI/UX Design",
  "Frontend Development",
  "Backend Development",
  "React Development",
  "Python Programming",
  "Machine Learning Solutions",
  "WordPress Development",
  "E-commerce Development",
  "Code Review & Optimization",
  "Software Testing & QA",
  "Cybersecurity Consulting",
  "Systems Architecture",
  "Data Analytics & Visualization",
  "Blockchain Development",
  "Video Editing",
  "Graphics Designer",
];
