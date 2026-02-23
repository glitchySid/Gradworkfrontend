"use client";

import Image from "next/image";
import Header from "@/components/ui/header";
import { useAuth } from "@/context/AuthContext";
import { RegistrationHandlesProps } from "@/types";

const ProfileDetailF3 = ({ setCurrentPage }: RegistrationHandlesProps) => {
  const { authUser } = useAuth();

  const handleFinish = () => {
    window.location.href = "/";
  };

  const handleBack = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8 mt-16 sm:mt-20">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="p-8 md:w-1/2">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {authUser?.avatar_url ? (
                    <img 
                      src={authUser.avatar_url} 
                      alt={authUser.display_name || "Profile"}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    authUser?.display_name?.charAt(0) || authUser?.email?.charAt(0) || "U"
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {authUser?.display_name || "User"}
                  </h2>
                  <p className="text-gray-600 font-medium">@{authUser?.username || "username"}</p>
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="text-lg capitalize">{authUser?.role || "Role not set"}</span>
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-lg">{authUser?.email}</span>
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
                  <span className="text-lg">
                    Joined {authUser?.created_at ? new Date(authUser.created_at).toLocaleDateString() : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 md:w-1/2 flex flex-col items-center justify-center">
              <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
                Your Profile is Ready!
              </h1>
              <p className="text-gray-600 text-center mb-6">
                You can now start offering your services or hire freelancers.
              </p>
              <button 
                className="w-full max-w-xs bg-red-500 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-red-600 transform hover:scale-105 transition-all duration-200 shadow-md"
                onClick={handleFinish}
              >
                Go to Home
              </button>
              <button 
                className="mt-4 text-gray-600 hover:text-gray-800"
                onClick={handleBack}
              >
                ← Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailF3;
