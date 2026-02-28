"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
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

type ViewState = "register-options" | "register-email" | "login";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [view, setView] = useState<ViewState>("register-options");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle, signInWithPassword, signUp } = useAuth();

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      setError(errorParam);
    }
  }, [searchParams]);

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
    if (!isValidEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!formData.password) {
      setError("Please enter your password");
      return;
    }

    setLoading(true);
    setError("");

    const { error: authError } = await signInWithPassword(
      formData.email,
      formData.password,
    );

    setLoading(false);

    if (authError) {
      const msg = authError.message;
      if (msg === "Failed to fetch" || msg.includes("NetworkError") || msg.includes("fetch")) {
        setError("Unable to reach the authentication server. Please check your internet connection or try switching your DNS to 1.1.1.1 (Cloudflare) or 8.8.8.8 (Google).");
      } else {
        setError(msg);
      }
    } else {
      router.push("/");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    const { error: authError } = await signUp(
      formData.email,
      formData.password,
    );

    setLoading(false);

    if (authError) {
      const msg = authError.message;
      if (msg === "Failed to fetch" || msg.includes("NetworkError") || msg.includes("fetch")) {
        setError("Unable to reach the authentication server. Please check your internet connection or try switching your DNS to 1.1.1.1 (Cloudflare) or 8.8.8.8 (Google).");
      } else {
        setError(msg);
      }
    } else {
      router.push("/");
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError("");
  };

  const getEmailBorderClass = () => {
    if (!formData.email) return "border-gray-300";
    return isValidEmail(formData.email)
      ? "border-green-500"
      : "border-red-500";
  };

  const handleBack = () => {
    setError("");
    setFormData({ email: "", password: "", confirmPassword: "" });
    if (view === "register-options") {
      router.push("/");
    } else {
      setView("register-options");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900" suppressHydrationWarning>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-16 mt-14 sm:mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="space-y-6">
            {/* Back Button */}
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>{view === "register-options" ? "Back to Home" : "Back"}</span>
            </button>

            {view === "register-options" && (
              // Registration Options
              <>
                <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                  Register Your Account
                </h2>

                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={() => {
                      setError("");
                      setView("register-email");
                    }}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Mail className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Email Or Phone Number
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <GoogleIcon />
                    <span className="text-gray-700 dark:text-gray-300">
                      Continue with Google
                    </span>
                  </button>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="flex items-center justify-center">
                  <span className="px-4 text-gray-500 dark:text-gray-400">OR</span>
                </div>

                <button
                  type="button"
                  className="w-full px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  onClick={() => {
                    setError("");
                    setFormData({ email: "", password: "", confirmPassword: "" });
                    setView("login");
                  }}
                >
                  Login Account
                </button>
              </>
            )}

            {view === "register-email" && (
              // Email/Phone Registration Form
              <>
                <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                  Create Your Account
                </h2>

                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-1">
                    <input
                      type="text"
                      name="email"
                      placeholder="Email or Phone Number"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${getEmailBorderClass()} transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
                      autoComplete="email"
                    />
                    {formData.email && !isValidEmail(formData.email) && (
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
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-red-500 transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      autoComplete="new-password"
                    />
                  </div>

                  <div className="space-y-1">
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-red-500 transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      autoComplete="new-password"
                    />
                  </div>

                  <button
                    type="submit"
                    className={`w-full px-4 py-3 bg-red-500 text-white rounded-lg transition-colors ${
                      !isValidEmail(formData.email) || loading
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-red-600"
                    }`}
                    disabled={!isValidEmail(formData.email) || loading}
                  >
                    {loading ? "Creating Account..." : "Register"}
                  </button>
                </form>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="flex items-center justify-center">
                  <span className="px-4 text-gray-500 dark:text-gray-400">OR</span>
                </div>

                <button
                  type="button"
                  className="w-full px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  onClick={() => {
                    setError("");
                    setFormData({ email: "", password: "", confirmPassword: "" });
                    setView("login");
                  }}
                >
                  Login Account
                </button>
              </>
            )}

            {view === "login" && (
              // Login Form
              <>
                <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                  Login to Your Account
                </h2>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-1">
                    <input
                      type="text"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${getEmailBorderClass()} transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
                      autoComplete="email"
                    />
                    {formData.email && !isValidEmail(formData.email) && (
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
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-red-500 transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      autoComplete="current-password"
                    />
                  </div>

                  <button
                    type="submit"
                    className={`w-full px-4 py-3 bg-red-500 text-white rounded-lg transition-colors ${
                      !isValidEmail(formData.email) || loading
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-red-600"
                    }`}
                    disabled={!isValidEmail(formData.email) || loading}
                  >
                    {loading ? "Loading..." : "Login"}
                  </button>
                </form>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="flex items-center justify-center">
                  <span className="px-4 text-gray-500 dark:text-gray-400">OR</span>
                </div>

                <button
                  type="button"
                  className="w-full px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  onClick={() => {
                    setError("");
                    setFormData({ email: "", password: "", confirmPassword: "" });
                    setView("register-options");
                  }}
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
