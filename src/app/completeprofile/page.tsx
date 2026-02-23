"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/header";
import { useAuth } from "@/context/AuthContext";

interface UserProfile {
  id: string;
  email: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  role: string | null;
  created_at: string;
  updated_at: string | null;
}

export default function CompleteProfilePage() {
  const { user, session, loading: authLoading, authUser } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !session) {
      router.push("/register");
      return;
    }

    if (session && authUser) {
      setProfile(authUser);
      setLoading(false);
    } else if (session) {
      fetchProfile();
    }
  }, [session, authLoading, authUser, router]);

  const fetchProfile = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8080/api/auth/me",
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSetupProfile = () => {
    router.push("/setupprofile");
  };

  const handleSkip = () => {
    router.push("/");
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  const hasProfile = profile?.username && profile?.role;

  if (hasProfile) {
    router.push("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome{profile?.display_name ? `, ${profile.display_name}` : ""}!
          </h2>
          <p className="text-gray-600 mb-8">
            Complete your profile to get the most out of GradWork. This helps
            others find you and your services.
          </p>

          <div className="space-y-4">
            <button
              onClick={handleSetupProfile}
              className="w-full px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
            >
              Complete Your Profile
            </button>

            <button
              onClick={handleSkip}
              className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Skip for now
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
