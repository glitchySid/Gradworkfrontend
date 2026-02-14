import Image from "next/image";
import { TeamMemberCardProps } from "@/types";

const TeamMemberCard = ({ name, role, description }: TeamMemberCardProps) => (
  <div className="border rounded-lg p-4">
    <div className="flex items-center gap-4 mb-2">
      <Image
        src="/assets/gradworklandingpage.jpg"
        alt={name}
        width={40}
        height={40}
        className="w-10 h-10 rounded-full"
      />
      <div>
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-gray-600">{role}</p>
      </div>
    </div>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

export default TeamMemberCard;
