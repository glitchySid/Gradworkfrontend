import { Search, Mail } from 'lucide-react';
import registrationMan from '../../assets/backgroundman_registration_page.png';
import SearchBar from '../ui/searchbar';

const RegistrationPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              <span className="text-red-500">Grad</span>Work.
            </h1>
          </div>

          {/* Search Bar */}
          <SearchBar />
          {/*<div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search Services..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>*/}

          {/* Header Buttons */}
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
              Sign Up
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600">👤</span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Registration Form */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">Register Your Account</h2>

            <div className="space-y-4">
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Mail className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">Email Or Phone Number</span>
              </button>

              <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                  />
                </svg>
                <span className="text-gray-700">Continue with Google</span>
              </button>
            </div>

            <div className="flex items-center justify-center">
              <span className="px-4 text-gray-500">OR</span>
            </div>

            <button className="w-full px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
              Login Account
            </button>
          </div>

          {/* Image Section */}
          <div className="hidden md:block">
            <div className="relative w-full aspect-square">
              {/* Red circle background */}
              <div className="absolute inset-0 rounded-full bg-red-500" />
              {/* Image container with overflow hidden */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <img
                  src={registrationMan} // Replace with your actual image path
                  alt="Professional"
                  className="w-full h-full object-cover object-center transform scale-[0.99]" // Slightly scaled down to ensure proper fit
                  style={{
                    objectPosition: "130% 40%" // Adjust these values to fine-tune image position
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegistrationPage;
