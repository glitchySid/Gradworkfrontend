import graphics_designing from '../assets/gradworklandingpage.jpg';

const TeamMemberCard = ({ name, role, description }) => (
  <div className="border rounded-lg p-4">
    <div className="flex items-center gap-4 mb-2">
      <img
        src={graphics_designing}
        alt={name}
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
