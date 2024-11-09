// Sample data and search logic
export const serviceNames = [
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
  "Blockchain Development"
];

export const searchServices = (query) => {
  if (!query) return [];
  
  const lowercaseQuery = query.toLowerCase();
  return serviceNames
    .filter(service => 
      service.toLowerCase().includes(lowercaseQuery)
    )
    .slice(0, 3); // Limit to maximum 3 results
};
