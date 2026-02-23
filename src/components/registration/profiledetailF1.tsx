"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera } from "lucide-react";
import { RegistrationHandlesProps } from "@/types";
import { useAuth } from "@/context/AuthContext";

const ProfileDetailF1 = ({ setCurrentPage }: RegistrationHandlesProps) => {
  const { token, authUser, refetchAuthUser } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!formData.username.trim()) {
      setError("Username is required");
      return;
    }

    if (!token || !authUser) {
      router.push("/register");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const displayName = [formData.firstName, formData.lastName].filter(Boolean).join(" ") || null;
      
      const response = await fetch(
        "http://127.0.0.1:8080/api/auth/complete-profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username: formData.username,
            display_name: displayName,
          }),
        }
      );

      if (response.ok) {
        await refetchAuthUser();
        setCurrentPage((prev) => prev + 1);
      } else {
        const data = await response.json();
        setError(data.error || "Failed to update profile");
      }
    } catch (err) {
      setError("Failed to update profile");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">Personal Info.</h1>
        <p className="text-gray-500 mb-8">This personal information will be displayed to other users</p>

        <div className="flex justify-center mb-12">
          <div className="relative">
            <div className="w-32 h-32 bg-red-800 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer">
              <Camera className="w-12 h-12 text-white" />
            </div>
            <p className="text-center mt-3 text-gray-600 font-medium">Profile Pic</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent outline-none transition-all"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent outline-none transition-all"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
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
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        <div className="flex justify-between items-center">
          <button
            className="text-gray-600 flex items-center gap-2 hover:text-gray-800 transition-colors"
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            <span className="text-lg">←</span> Back
          </button>
          <button
            className="bg-red-600 text-white px-8 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailF1;
