import SearchBar from "./ui/searchbar.jsx";
import heroImage from "../assets/gradworklandingpage.jpg";

const Hero = () => (
  <div className="relative h-96 bg-gray-100 flex items-center justify-center">
    <div className="absolute inset-0">
      <img
        src={heroImage}
        alt="Student studying"
        className="w-full h-full object-cover opacity-60 brightness-75"
      />
    </div>
    <div className="relative z-10 text-center px-3">
      <h1 className="text-3xl font-bold mb-6">Empowering College Students</h1>
      <SearchBar />
    </div>
  </div>
);

export default Hero;
