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
    name: "Aarav Sharma",
    username: "AaravTheCoder",
    badge: "Expert",
    location: "Mumbai",
    title: "Video Editor",
    rating: "4.8",
    description:
      "I'll transform your raw footage into a polished, professional video with seamless cuts, effects, and sound design. Let me bring your vision to life with high-quality editing tailored to your needs!",
  },
  {
    name: "Priya Patel",
    username: "PriyaDesigns",
    badge: "Intermediate",
    location: "Delhi",
    title: "Web Developer",
    rating: "4.5",
    description:
      "I specialize in creating responsive and user-friendly websites. From front-end development to back-end integration, I can build a website that meets your specific requirements.",
  },
  {
    name: "Rahul Singh",
    username: "RahulGraphics",
    badge: "Beginner",
    location: "Bangalore",
    title: "Graphic Designer",
    rating: "4.2",
    description:
      "I'm a passionate graphic designer with a focus on creating visually appealing logos, branding materials, and marketing collateral. Let me help you elevate your brand's image.",
  },
  {
    name: "Anika Joshi",
    username: "AnikaApps",
    badge: "Expert",
    location: "Chennai",
    title: "Mobile App Developer",
    rating: "4.9",
    description:
      "I develop high-performance and user-friendly mobile applications for iOS and Android platforms. I can bring your app idea to life with clean code and intuitive design.",
  },
  {
    name: "Vikram Reddy",
    username: "VikramData",
    badge: "Intermediate",
    location: "Hyderabad",
    title: "Data Analyst",
    rating: "4.6",
    description:
      "I have expertise in data analysis and visualization, helping businesses make data-driven decisions. I can extract insights from complex datasets and present them in a clear and concise manner.",
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
