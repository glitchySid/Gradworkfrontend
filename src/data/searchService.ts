import { serviceNames } from "./info";

export const searchServices = (query: string): string[] => {
  if (!query) return [];

  const lowercaseQuery = query.toLowerCase();
  return serviceNames
    .filter((service) => service.toLowerCase().includes(lowercaseQuery))
    .slice(0, 3); // Limit to maximum 3 results
};
