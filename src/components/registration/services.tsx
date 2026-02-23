"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { RegistrationHandlesProps } from "@/types";

const ChooseService = ({ setCurrentPage }: RegistrationHandlesProps) => {
  const router = useRouter();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = async (role: "client" | "freelancer") => {
    if (!token) {
      router.push("/register");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "http://127.0.0.1:8080/api/auth/complete-profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ role }),
        },
      );

      if (response.ok) {
        if (role === "freelancer") {
          setCurrentPage((prev) => prev + 1);
        } else {
          router.push("/");
        }
      }
    } catch (error) {
      console.error("Failed to set role:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-2xl font-normal mb-8 p-4">
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
          <div className="flex space-x-8 m-20">
            <div
              className="cursor-pointer hover:scale-105 transition-transform"
              onClick={() => handleRoleSelect("freelancer")}
            >
              <Image
                src="/assets/sellservice.svg"
                alt="Sell Services"
                width={240}
                height={180}
                className="w-60 h-45 mb-4"
              />
              <p className="text-center font-medium">
                I want to offer services
              </p>
            </div>
            <div
              className="cursor-pointer hover:scale-105 transition-transform"
              onClick={() => handleRoleSelect("client")}
            >
              <Image
                src="/assets/buyservice.svg"
                alt="Buy Services"
                width={240}
                height={180}
                className="w-60 h-45 mb-5"
              />
              <p className="text-center font-medium">
                I want to hire freelancers
              </p>
            </div>
          </div>
        )}
      <p className="mt-8 text-gray-500 font-normal">Skip this →</p>
    </div>
  );
};

export default ChooseService;
