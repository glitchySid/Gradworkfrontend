import sellservice from "../../assets/sellservice.svg";
import buyservice from "../../assets/buyservice.svg";

const ChooseService = ({setCurrentPage}) => {
return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-3xl font-normal mb-8">What are you looking for?</h1>

      <div className="flex space-x-8 m-20">
        {/* Sell Services Card */}
        <img 
          src={sellservice} 
          alt="Sell Services" 
          className="w-60 h-45 mb-4 hover:w-65" 
          onClick={() => setCurrentPage(prev => prev + 1)} // Fix: Wrap in arrow function
        />
        {/* Buy Services Card */}
        <img src={buyservice} 
          alt="Buy Services" 
          className="w-60 h-45 mb-5"
          onClick={() => setCurrentPage(prev => prev+1)}
        />
      </div>
      <p className="mt-8 text-gray-500 font-normal">Skip this →</p>
    </div>
  );
}


export default ChooseService;
