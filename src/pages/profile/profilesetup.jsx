import { MapPin } from 'lucide-react';
import Header from '../../components/ui/header.jsx';
import { freelancers } from '../../data/info.js';
import Mockup3 from '../../assets/mockup3.svg';

function getRandomInt(min, max) {
  min = Math.ceil(min); // Round min up to the nearest integer
  max = Math.floor(max); // Round max down to the nearest integer
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive
}

const SellerSetupPage = () => {
  const randomNumber =  getRandomInt(0, 3);


  return (
    <div>
      <Header/>
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="flex items-start gap-4">
        {/* Profile Image and Main Info */}
        <div className="flex-1 m-6 mt-8">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              {/* Profile Picture */}
              <div className="w-24 h-24 rounded-full bg-red-800">
                </div>
              
              {/* Name and Details */}
              <div>
                <h1 className="text-xl font-bold">{freelancers[randomNumber].name}</h1>
                <p className="text-gray-600">@{freelancers[randomNumber].username}</p>
                
                {/* Location and Reviews */}
                <div className="mt-2">
                  <div className="flex items-center gap-4 text-gray-600">
                    <div>Reviews({freelancers[randomNumber].rating})</div>
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span>{freelancers[randomNumber].location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Begginer Badge */}
            <div className="bg-red-500 text-white px-4 py-1 rounded-full text-sm">
              Begginer
            </div>
          </div>
          
          {/* About Section */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">About Me</h2>
            <p className="text-gray-700 leading-relaxed">
                {freelancers[randomNumber].description}
            </p>
          </div>
        </div>
      </div>
    </div>
      {/*PortfolioPageV*/}
    <div className="max-w-6xl mx-auto p-6 h-screen/2">
      <h1 className="text-3xl font-bold mb-10 mt-10">Portfolio</h1>
      
  <div className="rounded-2xl bg-white p-6 shadow-lg border border-[#c5c5c5]">
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Image placeholder */}
      <div className="lg:w-1/2">
        <img src={Mockup3} className="h-full object-cover rounded-xl bg-gray-100" /> 
      </div>
          
          {/* Content */}
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-2xl font-bold">The Bunters: A Journey Home</h2>
            
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-gray-600">
                This project is a real estate website where users can browse rental properties.
                You can check it out here: 
                <a 
                  href="https://real-estate-react-project-three.vercel.app/" 
                  className="text-blue-600 hover:underline ml-1"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  https://real-estate-react-project-three.vercel.app/
                </a>
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Key Features:</h3>
              <ul className="text-gray-600 space-y-2">
                <li>- The website has smooth animations and transitions, making it visually appealing and easy to use.</li>
                <li>- It is designed to be user-friendly, providing a seamless experience whether you&#39;re on a computer or a mobile device.</li>
                <li>- On the Rent page, you can filter properties based on different criteria to find the best match for your needs.</li>
                <li>- The overall design is clean and modern, making it easy to navigate and find information quickly.</li>
              </ul>
            </div>
            
            <div className="flex justify-between items-center pt-4">
              <div>
                <h3 className="font-medium mb-1">Duration</h3>
                <p className="text-gray-600">1 - 7 weeks</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Price</h3>
                <p className="text-gray-600">₹8,000 - ₹12,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};



export default SellerSetupPage;
