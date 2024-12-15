import React from "react";
import { MessageCircle } from "lucide-react";
import { freelancers } from "../data/info";
import gradworklandingpage from "../assets/gradworklandingpage.jpg";

const FreelancerCard = ({
  name,
  title,
  rating,
  description,
}) => {
  const imageUrl = "../assets/gradworklandingpage.jpg";
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="space-y-4">
        {/* Header with profile info and rating */}
        <div className="flex justify-between items-start">
          <div className="flex gap-4">
            <img
              src={gradworklandingpage}
              alt={name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
              <p className="text-gray-600">{title}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-2 py-1 bg-red-100 rounded-md flex items-center gap-1 h-4 sm:h-8">
              <span className="text-red-500 font-medium">{rating}</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-red-500">★</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2">
            Description
          </h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Message Button */}
        <div className="mt-4">
          <button className="flex items-center gap-2 bg-red-500 transform hover:scale-110 transition-transform duration-200 text-white px-4 py-2 rounded-lg">
            <MessageCircle size={20} />
            Message
          </button>
        </div>
      </div>
    </div>
  );
};

// Example usage component
const TopRatedFreelancers = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {freelancers.map((freelancer) => (
          <FreelancerCard key={freelancer.name} {...freelancer} />
        ))}
      </div>
    </div>
  );
};

export default TopRatedFreelancers;
