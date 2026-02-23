import { LucideIcon, MessageCircle } from "lucide-react";
import { ButtonIconProps } from "@/types";

const ButtonIcon = ({ name, icon: Icon = MessageCircle }: ButtonIconProps) => (
  <button className="flex items-center gap-2 bg-red-500 transform hover:scale-110 transition-transform duration-200 text-white px-4 py-2 rounded-lg">
    <Icon size={20} />
    {name}
  </button>
);

export default ButtonIcon;
