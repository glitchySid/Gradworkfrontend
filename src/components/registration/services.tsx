"use client";

import Image from "next/image";
import { useState } from "react";
import { RegistrationHandlesProps } from "@/types";

interface ChooseServiceProps extends RegistrationHandlesProps {
  setSelectedRole: (role: "client" | "freelancer") => void;
  onSkip?: () => void;
}

const ChooseService = (
  { setCurrentPage, setSelectedRole, onSkip }: ChooseServiceProps,
) => {
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = async (role: "client" | "freelancer") => {
    setLoading(true);
    setSelectedRole(role);
    setCurrentPage((prev) => prev + 1);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 px-4">
      <h1 className="text-2xl font-normal mb-8 p-4 text-center text-gray-900 dark:text-white">
        <span className="text-4xl font-bold mb-8 font-MC m-2">W</span>hat are
        you looking for?
      </h1>

      {loading
        ? (
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500">
            </div>
          </div>
        )
        : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 w-full max-w-lg sm:max-w-xl">
            <div
              className="cursor-pointer hover:scale-105 transition-transform flex flex-col items-center"
              onClick={() => handleRoleSelect("freelancer")}
            >
              <Image
                src="/assets/sellservice.svg"
                alt="Sell Services"
                width={240}
                height={180}
                className="w-48 sm:w-60 h-auto mb-4"
              />
              <p className="text-center font-medium text-gray-900 dark:text-white">
                I want to offer services
              </p>
            </div>
            <div
              className="cursor-pointer hover:scale-105 transition-transform flex flex-col items-center"
              onClick={() => handleRoleSelect("client")}
            >
              <Image
                src="/assets/buyservice.svg"
                alt="Buy Services"
                width={240}
                height={180}
                className="w-48 sm:w-60 h-auto mb-5"
              />
              <p className="text-center font-medium text-gray-900 dark:text-white">
                I want to hire freelancers
              </p>
            </div>
          </div>
        )}
      <button
        onClick={onSkip}
        className="mt-8 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 font-normal transition-colors cursor-pointer"
      >
        Skip this &rarr;
      </button>
    </div>
  );
};

export default ChooseService;
