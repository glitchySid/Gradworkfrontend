"use client";

import Image from "next/image";
import Header from "@/components/ui/header";
import { RegistrationHandlesProps } from "@/types";

const ProfileDetailF3 = ({ setCurrentPage }: RegistrationHandlesProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8 mt-16 sm:mt-20">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Left side - Profile Info */}
            <div className="p-8 md:w-1/2">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  SM
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Siddhesh Mhatre
                  </h2>
                  <p className="text-gray-600 font-medium">@freakiestsid</p>
                </div>
              </div>

              <div className="mt-8 space-y-6">
                <div className="flex items-center space-x-3 text-gray-600">
                  <svg
                    className="w-6 h-6 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-lg">Mumbai, India</span>
                </div>

                <div className="flex items-center space-x-3 text-gray-600">
                  <svg
                    className="w-6 h-6 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-lg">Joined on Sept 2024</span>
                </div>
              </div>
            </div>

            {/* Right side - Setup Icon and CTA */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 md:w-1/2 flex flex-col items-center justify-center">
              <div className="w-32 h-32 mb-6 relative">
                <Image
                  src="/assets/profilepage_inc.svg"
                  alt="Profile Setup Icon"
                  fill
                  className="object-contain"
                />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
                Complete Your Account Setup!
              </h1>
              <button 
                className="w-full max-w-xs bg-red-500 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-red-600 transform hover:scale-105 transition-all duration-200 shadow-md"
                onClick={() => window.location.href = "/profile"}
              >
                Setup Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailF3;
