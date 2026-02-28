"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function CompleteProfilePage() {
  const { session, loading: authLoading, authUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authLoading) return;

    if (!session) {
      router.replace("/register");
      return;
    }

    // Wait for authUser to load
    if (!authUser) return;

    const hasProfile = authUser.username && authUser.role;
    if (hasProfile) {
      router.replace("/");
    } else {
      router.replace("/setupprofile");
    }
  }, [session, authLoading, authUser, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500" />
    </div>
  );
}
