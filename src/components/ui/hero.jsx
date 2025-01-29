import SearchBar from "./searchbar.jsx";
import heroImage from "../../assets/gradworklandingpage.jpg";

const Hero = () => (
  <div className="relative h-96 bg-gray-100 flex items-center justify-center">
    <div className="absolute inset-0">
      <img
        src={heroImage} 
        alt="Student studying"
        className="w-full h-full object-cover opacity-50 backdrop-brightness-110"
      />
      <div className="absolute inset-0 bg-black opacity-70"></div>
    </div>
    <div className="relative w-full z-10 text-center px-3">
      <h1 className="text-2xl font-semibold text-white mb-6 font-MNS">Empowering College Students</h1>
      <SearchBar />
    </div>
  </div>
);

export default Hero;
