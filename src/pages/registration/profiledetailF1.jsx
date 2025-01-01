import { Camera } from 'lucide-react';
import { useState } from 'react';

const ElegantProfileForm = ({setCurrentPage}) => {
  const [remoteWork, setRemoteWork] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">Personal Info.</h1>
        <p className="text-gray-500 mb-8">This personal information will be displayed to other users</p>
        
        {/* Profile Picture Section */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <div className="w-32 h-32 bg-red-800 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer">
              <Camera className="w-12 h-12 text-white" />
            </div>
            <p className="text-center mt-3 text-gray-600 font-medium">Profile Pic</p>
          </div>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              First Name
              <span className="text-red-800">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent outline-none transition-all"
              placeholder="Enter first name"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Last Name
              <span className="text-red-800">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent outline-none transition-all"
              placeholder="Enter last name"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              User Name
              <span className="text-red-800">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent outline-none transition-all"
              placeholder="Enter username"
            />
          </div>
        </div>

        {/* Remote Work Option */}
        <div className="mb-12">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Open for remote work?
            <span className="text-red-800">*</span>
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => setRemoteWork(true)}
              className={`px-6 py-2 rounded-lg transition-all ${
                remoteWork
                  ? 'bg-red-800 text-white'
                  : 'bg-white border border-gray-300 text-gray-700'
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => setRemoteWork(false)}
              className={`px-6 py-2 rounded-lg transition-all ${
                !remoteWork
                  ? 'bg-red-800 text-white'
                  : 'bg-white border border-gray-300 text-gray-700'
              }`}
            >
              No
            </button>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center" >
            <button className="text-gray-600 flex items-center gap-2 hover:text-gray-800 transition-colors"
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            <span className="text-lg">←</span> Back
          </button>
          <button className="bg-red-600 text-white px-8 py-2 rounded-lg hover:bg-red-700 transition-colors"  onClick={() => setCurrentPage(prev => prev + 1)}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElegantProfileForm;
