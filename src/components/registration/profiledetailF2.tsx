"use client";

import { useState } from "react";
import { RegistrationHandlesProps } from "@/types";

const ProfileDetailF2 = ({ setCurrentPage }: RegistrationHandlesProps) => {
  const [formData] = useState({
    occupation: "",
    skilledIn: "",
    university: "",
    certifications: "",
    experience: "",
    course: "",
    location: "",
  });

  const handleSubmit = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">Professional Info.</h1>
        <p className="text-gray-500 mb-8">Tell us about your professional background</p>
        <hr className="w-full h-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 m-10">
          <div className="grid grid-rows-2 gap-6 mb-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Occupation
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent outline-none transition-all"
                placeholder="Ex. Manager"
                value={formData.occupation}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Skilled In
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent outline-none transition-all"
                placeholder="Programming, Designing, etc."
                value={formData.skilledIn}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                University
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent outline-none transition-all"
                placeholder="Ex. Bharati Vidyapeeth"
                value={formData.university}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Certifications
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent outline-none transition-all"
                placeholder="Backend Developer from Udemy"
                value={formData.certifications}
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-rows-2 gap-6 mb-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Experience
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent outline-none transition-all"
                placeholder="2 years"
                value={formData.experience}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Course
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent outline-none transition-all"
                placeholder="B.Tech"
                value={formData.course}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent outline-none transition-all"
                placeholder="Ex. Mumbai"
                value={formData.location}
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <button
            className="text-gray-600 flex items-center gap-2 hover:text-gray-800 transition-colors"
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            <span className="text-lg">←</span> Back
          </button>
          <button
            className="bg-red-600 text-white px-8 py-2 rounded-lg hover:bg-red-700 transition-colors"
            onClick={handleSubmit}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailF2;
