import { services } from "../data/info";

const ServiceCard = () => (
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
