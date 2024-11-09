import graphics_designing from "../assets/service/graphics_designing.jpg";
import javascript_expert from "../assets/service/javascript_expert.jpg";
import social_media from "../assets/service/social_media.png";
import marketing from "../assets/service/marketing.png";
import translate from "../assets/service/translate.png";
import video_editing from "../assets/service/video_editing.png";

const services = [
  { title: "Video Editing", image: video_editing },
  { title: "Graphic Designer", image: graphics_designing },
  { title: "Social Media Mgr", image: social_media },
  { title: "JavaScript Expert", image: javascript_expert },
  { title: "Marketing", image: marketing },
  { title: "Translators", image: translate },
];

const ServiceCard = () => (
  // Changed to 1 column on mobile, 2 on tablet, 3 on desktop
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-4 sm:px-6 gap-6">
    {services.map((service, index) => (
      <div
        className="relative overflow-hidden rounded-lg min-h-[200px] hover:shadow-lg transition-shadow duration-300"
        key={index}
      >
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <h3 className="text-white p-3 sm:p-4 font-semibold text-base sm:text-lg">
            {service.title}
          </h3>
        </div>
      </div>
    ))}
  </div>
);

export default ServiceCard;
