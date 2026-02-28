import Image from "next/image";
import { TeamMemberCardProps } from "@/types";

const TeamMemberCard = ({ name, role, description }: TeamMemberCardProps) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 sm:p-6 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 text-center">
    <Image
      src="/assets/gradworklandingpage.jpg"
      alt={name}
      width={64}
      height={64}
      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover mx-auto mb-4"
    />
    <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{name}</h3>
    <p className="text-red-500 text-xs sm:text-sm font-medium mt-0.5">{role}</p>
    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-3 leading-relaxed">{description}</p>
  </div>
);

export default TeamMemberCard;
