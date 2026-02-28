"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Session, User } from "@supabase/supabase-js";
import { getSupabaseClient } from "@/lib/supabase";
import { buildApiUrl } from "@/lib/api-url";

interface AuthUser {
  id: string;
  email: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  role: string | null;
  created_at: string;
  updated_at: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  authUser: AuthUser | null;
  loading: boolean;
  token: string | null;
  signInWithGoogle: () => Promise<void>;
  signInWithPassword: (
    email: string,
    password: string,
  ) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refetchAuthUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAuthUser = async (accessToken: string) => {
    try {
      const response = await fetch(
        buildApiUrl("/auth/me"),
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        setAuthUser({
          ...data,
          role: typeof data.role === "string" ? data.role.toLowerCase() : data.role,
        });
      }
    } catch (error) {
      console.error("Failed to fetch auth user:", error);
    }
  };

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.access_token) {
        fetchAuthUser(session.access_token);
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.access_token) {
        fetchAuthUser(session.access_token);
      } else {
        setAuthUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      throw new Error("Supabase environment variables are not configured.");
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/`,
      },
    });
    if (error) throw error;
  };

  const signInWithPassword = async (email: string, password: string) => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return {
        error: new Error("Supabase environment variables are not configured."),
      };
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error: error as Error | null };
    } catch (err) {
      return { error: err instanceof Error ? err : new Error(String(err)) };
    }
  };

  const signUp = async (email: string, password: string) => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return {
        error: new Error("Supabase environment variables are not configured."),
      };
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      return { error: error as Error | null };
    } catch (err) {
      return { error: err instanceof Error ? err : new Error(String(err)) };
    }
  };

  const signOut = async () => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      setAuthUser(null);
      return;
    }

    await supabase.auth.signOut();
    setAuthUser(null);
  };

  const refetchAuthUser = async () => {
    if (session?.access_token) {
      await fetchAuthUser(session.access_token);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        authUser,
        loading,
        token: session?.access_token ?? null,
        signInWithGoogle,
        signInWithPassword,
        signUp,
        signOut,
        refetchAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
