
// info.js
import graphics_designing from '../assets/service/graphics_designing.jpg';
import javascript_expert from '../assets/service/javascript_expert.jpg';
import social_media from '../assets/service/social_media.png';
import marketing from '../assets/service/marketing.png';
import translate from '../assets/service/translate.png';
import video_editing from '../assets/service/video_editing.png';

const services = [
  { title: 'Video Editing', image: video_editing},
  { title: 'Graphic Designer', image: graphics_designing },
  { title: 'Social Media Mgr', image: social_media },
  { title: 'JavaScript Expert', image:  javascript_expert },
  { title: 'Marketing', image: marketing },
  { title: 'Translators', image:  translate  },
];
const ServiceCard = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-6"> 
      {services.map((services) => ( 
  <div className="relative overflow-hidden rounded-lg aspect-square" key={services.key}>
    <img
      src={services.image}
      alt={services.title}
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
      <h3 className="text-white p-4 font-semibold">{services.title}</h3>
    </div>

  </div>
  ))}
  </div>
);

export default ServiceCard;
