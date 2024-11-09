
import { Search } from 'lucide-react';
import heroImage from '../assets/gradworklandingpage.jpg'
import React from 'react';

const Hero = () => (
  <div className="relative h-96 bg-gray-100 flex items-center justify-center">
    <div className="absolute inset-0">
      <img
        src={heroImage}
        alt="Student studying"
        className="w-full h-full object-cover opacity-60"
      />
    </div>
    <div className="relative z-10 text-center px-3">
      <h1 className="text-3xl font-bold mb-6">Empowering College Students</h1>
      <div className="relative max-w-xl mx-auto">
        <Search className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search Services"
          className="w-full p-3 pl-12 rounded-lg border shadow-sm"
        />
      </div>
    </div>
  </div>
);

export default Hero;
