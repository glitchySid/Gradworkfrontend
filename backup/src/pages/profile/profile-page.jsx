import { MapPin } from "lucide-react";
import Header from "../../components/ui/header.jsx";
import { freelancers } from "../../data/info.js";
import PortfolioPageV from "./portfolio-page.jsx";
import ReviewCard from "./reviews.jsx";
import { reviews } from "./zod-reviews.js";
import ScreenshotCard from "./screenshots-card.jsx";
import Footer from "../../components/ui/footer.jsx";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const SellerSetupPage = () => {
  const randomNumber = getRandomInt(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-white rounded-xl shadow-sm m-6 p-6">
          <div className="flex flex-col lg:flex-row items-start gap-4 p-6">
            <div className="flex-1 p-4">
              <div className="flex flex-col sm:flex-row items-start justify-center sm:justify-between">
                <div className="flex items-start gap-5 flex-wrap justify-center sm:justify-start">
                  <div className="w-24 h-24 rounded-full bg-red-800" />
                  <div className="p-2">
                    <h1 className="text-xl font-bold">
                      {freelancers[randomNumber].name}
                    </h1>
                    <p className="text-gray-600">
                      @{freelancers[randomNumber].username}
                    </p>
                    <div className="mt-2 p-3">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-gray-600">
                        <div>Reviews({freelancers[randomNumber].rating})</div>
                        <div className="flex items-center gap-1">
                          <MapPin size={16} />
                          <span>{freelancers[randomNumber].location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-red-500 text-white px-4 py-1 rounded-full text-sm mt-4 sm:mt-0">
                  Beginner
                </div>
              </div>
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">About Me</h2>
                <p className="text-gray-700 leading-relaxed">
                  {freelancers[randomNumber].description}
                </p>
              </div>
            </div>
          </div>
        </div>
        <PortfolioPageV />
        <div className="m-5 mt-6 mb-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ScreenshotCard
              imageUrl="/path/to/image1.jpg"
              title="Mobile App Home"
            />
            <ScreenshotCard
              imageUrl="/path/to/image2.jpg"
              title="Settings Screen"
            />
            <ScreenshotCard imageUrl="/path/to/image3.jpg" title="UI" />
            <ScreenshotCard /> {/* Will show fallback grey container */}
          </div>
        </div>
        <div className="mb-9">
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
          {/*view more button*/}
        </div>
        <div className="flex justify-center m-5">
          <button className="rounded-full p-4 bg-gray-100 border border-black w-40">
            View More
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SellerSetupPage;
