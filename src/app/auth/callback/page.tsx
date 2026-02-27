"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabase";

function getSafeNextPath(nextParam: string | null): string {
  if (!nextParam) return "/completeprofile";
  if (!nextParam.startsWith("/")) return "/completeprofile";
  if (nextParam.startsWith("//")) return "/completeprofile";
  return nextParam;
}

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    let isMounted = true;

    async function handleAuthCallback() {
      const supabase = getSupabaseClient();
      const nextPath = getSafeNextPath(searchParams.get("next"));
      const error = searchParams.get("error");
      const errorDescription = searchParams.get("error_description");

      if (error) {
        const message = errorDescription || "Google sign-in failed.";
        router.replace(`/register?error=${encodeURIComponent(message)}`);
        return;
      }

      if (!supabase) {
        router.replace(
          "/register?error=Supabase%20environment%20variables%20are%20not%20configured.",
        );
        return;
      }

      const code = searchParams.get("code");
      if (code) {
        const { error: exchangeError } =
          await supabase.auth.exchangeCodeForSession(code);
        if (exchangeError) {
          router.replace(`/register?error=${encodeURIComponent(exchangeError.message)}`);
          return;
        }
      }

      if (isMounted) {
        router.replace(nextPath);
      }
    }

    void handleAuthCallback();

    return () => {
      isMounted = false;
    };
  }, [router, searchParams]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <p className="text-gray-700">Signing you in...</p>
    </main>
  );
}
