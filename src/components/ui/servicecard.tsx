import Image from "next/image";
import Link from "next/link";
import { services } from "@/data/info";
import { ChevronRight } from "lucide-react";

// Map service titles to backend category slugs
const categoryMap: Record<string, string> = {
  "Video Editing": "VideoEditing",
  "Graphic Designer": "Design",
  "Social Media Mgr": "ContentWriting",
  "JavaScript Expert": "WebDevelopment",
  "Marketing": "ContentWriting",
  "Translators": "Other",
};

const ServiceCard = () => (
  <>
    {/* Desktop: image cards */}
    <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 px-4 sm:px-6 gap-6">
      {services.map((service, index) => {
        const category = categoryMap[service.title] || "other";
        return (
          <Link
            href={`/explore?category=${category}`}
            className="relative overflow-hidden rounded-lg min-h-[200px] hover:shadow-lg transition-shadow duration-300 block"
            key={index}
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover transform hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <h3 className="text-white p-4 font-semibold text-lg">
                {service.title}
              </h3>
            </div>
          </Link>
        );
      })}
    </div>

    {/* Mobile: compact text list */}
    <div className="sm:hidden px-4">
      <div className="grid grid-cols-2 gap-2">
        {services.map((service, index) => {
          const category = categoryMap[service.title] || "other";
          return (
            <Link
              href={`/explore?category=${category}`}
              key={index}
              className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-3 border border-gray-100 dark:border-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 dark:hover:border-red-800 transition-colors"
            >
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{service.title}</span>
              <ChevronRight size={16} className="text-gray-400 dark:text-gray-500 flex-shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  </>
);

export default ServiceCard;
