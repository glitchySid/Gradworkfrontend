import { MessageCircle } from "lucide-react";
import PropTypes from "prop-types";

const ButtonIcon = ({ name, icon: Icon = MessageCircle }) => (
  <button className="flex items-center gap-2 bg-red-500 transform hover:scale-110 transition-transform duration-200 text-white px-4 py-2 rounded-lg">
    <Icon size={20} />
    {name}
  </button>
);

ButtonIcon.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
};

export default ButtonIcon;
