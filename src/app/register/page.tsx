"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import Image from "next/image";
import Header from "@/components/ui/header";
import { useAuth } from "@/context/AuthContext";

const GoogleIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="currentColor"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="currentColor"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="currentColor"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

export default function RegisterPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle, signInWithPassword, signUp } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      setError("");
      await signInWithGoogle();
    } catch (err) {
      setError("Failed to sign in with Google");
      console.error(err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !isValidEmail(loginData.username) || !isValidPassword(loginData.password)
    ) {
      return;
    }

    setLoading(true);
    setError("");

    const { error: authError } = await signInWithPassword(
      loginData.username,
      loginData.password,
    );

    setLoading(false);

    if (authError) {
      setError(authError.message);
    } else {
      if (typeof window !== "undefined") {
        window.location.href = "/completeprofile";
      }
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(loginData.username)) {
      return;
    }

    setLoading(true);
    setError("");

    const { error: authError } = await signUp(
      loginData.username,
      loginData.password,
    );

    setLoading(false);

    if (authError) {
      setError(authError.message);
    } else {
      if (typeof window !== "undefined") {
        window.location.href = "/completeprofile";
      }
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (_password: string) => {
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getEmailBorderClass = () => {
    if (!loginData.username) return "border-gray-300";
    return isValidEmail(loginData.username)
      ? "border-green-500"
      : "border-red-500";
  };

  return (
    <div className="min-h-screen bg-white" suppressHydrationWarning>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            {!showLogin
              ? (
                // Registration Form
                <>
                  <h2 className="text-4xl font-bold text-gray-900">
                    Register Your Account
                  </h2>

                  <div className="space-y-4">
                    <button
                      type="button"
                      onClick={handleRegister}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Mail className="h-5 w-5 text-gray-600" />
                      <span className="text-gray-700">
                        Email Or Phone Number
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={handleGoogleLogin}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <GoogleIcon />
                      <span className="text-gray-700">
                        Continue with Google
                      </span>
                    </button>
                  </div>

                  <div className="flex items-center justify-center">
                    <span className="px-4 text-gray-500">OR</span>
                  </div>

                  <button
                    type="button"
                    className="w-full px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    onClick={() => setShowLogin(true)}
                  >
                    Login Account
                  </button>
                </>
              )
              : (
                // Login Form
                <>
                  <h2 className="text-4xl font-bold text-gray-900">
                    Login to Your Account
                  </h2>

                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-1">
                      <input
                        type="text"
                        name="username"
                        placeholder="Username or Email"
                        value={loginData.username}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${getEmailBorderClass()} transition-colors`}
                        autoComplete="email"
                      />
                      {loginData.username &&
                        !isValidEmail(loginData.username) && (
                        <p className="text-red-500 text-sm">
                          Please enter a valid email address
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={loginData.password}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
                        autoComplete="current-password"
                      />
                    </div>

                    <button
                      type="submit"
                      className={`w-full px-4 py-3 bg-red-500 text-white rounded-lg transition-colors ${
                        !isValidEmail(loginData.username) || loading
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-red-600"
                      }`}
                      disabled={!isValidEmail(loginData.username) || loading}
                    >
                      {loading ? "Loading..." : "Login"}
                    </button>
                  </form>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <div className="flex items-center justify-center">
                    <span className="px-4 text-gray-500">OR</span>
                  </div>

                  <button
                    type="button"
                    className="w-full px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    onClick={() => setShowLogin(false)}
                  >
                    Back to Register
                  </button>
                </>
              )}
          </div>

          {/* Image Section */}
          <div className="hidden md:block">
            <div className="relative w-full aspect-square">
              <div className="absolute inset-0 rounded-full bg-red-500" />
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <Image
                  src="/assets/backgroundman_registration_page.png"
                  alt="Professional"
                  fill
                  className="object-cover object-center transform scale-[0.99]"
                  style={{
                    objectPosition: "130% 40%",
                  }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
