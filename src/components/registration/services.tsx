"use client";

import Image from "next/image";
import { RegistrationHandlesProps } from "@/types";

const ChooseService = ({ setCurrentPage }: RegistrationHandlesProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-2xl font-normal mb-8 p-4">
        <span className="text-4xl font-bold mb-8 font-MC m-2">W</span>hat are you looking for?
      </h1>

      <div className="flex space-x-8 m-20">
        {/* Sell Services Card */}
        <Image
          src="/assets/sellservice.svg"
          alt="Sell Services"
          width={240}
          height={180}
          className="w-60 h-45 mb-4 cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setCurrentPage((prev) => prev + 1)}
        />
        {/* Buy Services Card */}
        <Image
          src="/assets/buyservice.svg"
          alt="Buy Services"
          width={240}
          height={180}
          className="w-60 h-45 mb-5 cursor-pointer"
          onClick={() => setCurrentPage((prev) => prev + 1)}
        />
      </div>
      <p className="mt-8 text-gray-500 font-normal">Skip this →</p>
    </div>
  );
};

export default ChooseService;
