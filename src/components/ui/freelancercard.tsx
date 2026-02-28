import { Star, MapPin } from "lucide-react";
import { freelancers } from "@/data/info";
import { FreelancerCardProps } from "@/types";

const FreelancerCard = ({
  name,
  title,
  rating,
  description,
  location,
  badge,
  avatar_color,
}: FreelancerCardProps & { location?: string; badge?: string; avatar_color?: string }) => {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const bgColor = avatar_color || "#6366f1";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-3 sm:p-5 lg:p-6 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200">
      {/* Mobile: stacked layout, Desktop: horizontal */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4">
        <div
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0"
          style={{ backgroundColor: bgColor }}
        >
          {initials}
        </div>
        <div className="min-w-0 flex-1 text-center sm:text-left w-full">
          <div className="flex items-center justify-center sm:justify-between gap-1 sm:gap-2">
            <h3 className="font-semibold text-gray-900 dark:text-white truncate text-xs sm:text-base">{name}</h3>
            <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
              <Star size={12} className="sm:w-3.5 sm:h-3.5 text-red-500 fill-red-500" />
              <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">{rating}</span>
            </div>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-[11px] sm:text-sm">{title}</p>
          {location && (
            <p className="text-gray-400 text-[10px] sm:text-xs flex items-center justify-center sm:justify-start gap-1 mt-0.5">
              <MapPin size={10} className="sm:w-[11px] sm:h-[11px]" />
              {location}
            </p>
          )}
        </div>
      </div>

      <p className="hidden sm:block text-gray-500 dark:text-gray-400 text-sm leading-relaxed mt-3 line-clamp-2">
        {description}
      </p>

      {badge && (
        <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-50 dark:border-gray-700 text-center sm:text-left">
          <span className={`inline-block text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-medium ${
            badge === "Expert"
              ? "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400"
              : badge === "Intermediate"
                ? "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                : "bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
          }`}>
            {badge}
          </span>
        </div>
      )}
    </div>
  );
};

const TopRatedFreelancers = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
      {freelancers.slice(0, 6).map((freelancer) => (
        <FreelancerCard key={freelancer.name} {...freelancer} />
      ))}
    </div>
  );
};

export default TopRatedFreelancers;
