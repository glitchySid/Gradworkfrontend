// Sample data and search logic
import { serviceNames } from "./info.js";

export const searchServices = (query) => {
  if (!query) return [];

  const lowercaseQuery = query.toLowerCase();
  return serviceNames
    .filter((service) => service.toLowerCase().includes(lowercaseQuery))
    .slice(0, 3); // Limit to maximum 3 results
};
