import SearchBar from "./searchbar.jsx";
import heroImage from "../../assets/gradworklandingpage.jpg";

const Hero = () => (
    <div className="p-8">
        <div className="relative h-[250px] md:h-[300px] lg:h-[500px] bg-gray-100 flex items-center justify-center">
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
                <img
                    src={heroImage}
                    alt="Student studying"
                    className="w-full h-full object-cover opacity-50 backdrop-brightness-110 rounded-2xl"
                />
                <div className="absolute inset-0 bg-black opacity-70 rounded-2xl"></div>
            </div>
            <div className="relative w-full z-10 text-center px-3">
                <h1 className="text-2xl font-semibold text-white mb-6 font-MNS">Empowering College Students</h1>
                <SearchBar/>
            </div>
        </div>
    </div>
);

export default Hero;
