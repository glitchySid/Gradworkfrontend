import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let browserSupabaseClient: SupabaseClient | null = null;
let hasLoggedMissingSupabaseEnv = false;

function readClientEnv(key: string): string | undefined {
  const value = process.env[key];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

export function getSupabaseClient(): SupabaseClient | null {
  if (browserSupabaseClient) {
    return browserSupabaseClient;
  }

  const supabaseUrl =
    readClientEnv("NEXT_PUBLIC_SUPABASE_URL") ??
    readClientEnv("NEXT_PUBLIC_SUPABASE_PROJECT_URL");
  const supabaseAnonKey =
    readClientEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY") ??
    readClientEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");

  if (!supabaseUrl || !supabaseAnonKey) {
    if (!hasLoggedMissingSupabaseEnv) {
      hasLoggedMissingSupabaseEnv = true;
      console.error(
        [
          "Supabase env missing on client.",
          "Expected one of:",
          "- NEXT_PUBLIC_SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_PROJECT_URL)",
          "- NEXT_PUBLIC_SUPABASE_ANON_KEY (or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)",
        ].join("\n"),
      );
    }
    return null;
  }

  browserSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  return browserSupabaseClient;
}
