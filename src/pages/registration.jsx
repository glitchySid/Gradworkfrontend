import { Mail } from "lucide-react";
import registrationMan from "../assets/backgroundman_registration_page.png";
import Header from "../components/ui/header.jsx";
// import TeamMemberCard from "../components/teammembercards.jsx";
// import Footer from "../components/footer.jsx";
// import Hero from "../components/hero.jsx";
// import FreelancerCard from "../components/freelancercard.jsx";
// import ServiceCard from "../components/servicecard.jsx";
// import { teamMembers } from "../data/info.js"; 
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

const RegistrationPage = () => {
  const aboutUsRef = useRef(null);
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    return password.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(password);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login attempt with:", loginData);
  };

  const scrollToAboutUs = () => {
    navigate("/");
    aboutUsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getEmailBorderClass = () => {
    if (!loginData.username) return "border-gray-300";
    return isValidEmail(loginData.username)
      ? "border-green-500"
      : "border-red-500";
  };

  const getPasswordBorderClass = () => {
    if (!loginData.password) return "border-gray-300";
    return isValidPassword(loginData.password)
      ? "border-green-500"
      : "border-red-500";
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onAboutUsClick={scrollToAboutUs} />
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
                    <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Mail className="h-5 w-5 text-gray-600" />
                      <span className="text-gray-700">
                        Email Or Phone Number
                      </span>
                    </button>

                    <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                        />
                      </svg>
                      <span className="text-gray-700">
                        Continue with Google
                      </span>
                    </button>
                  </div>

                  <div className="flex items-center justify-center">
                    <span className="px-4 text-gray-500">OR</span>
                  </div>

                  <button
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
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${getPasswordBorderClass()} transition-colors`}
                      />
                      {loginData.password &&
                        !isValidPassword(loginData.password) && (
                        <p className="text-red-500 text-sm">
                          Password must be at least 8 characters long and
                          contain at least one symbol
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className={`w-full px-4 py-3 bg-red-500 text-white rounded-lg transition-colors ${
                        !isValidEmail(loginData.username) ||
                          !isValidPassword(loginData.password)
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-red-600"
                      }`}
                      disabled={!isValidEmail(loginData.username) ||
                        !isValidPassword(loginData.password)}
                    >
                      Login
                    </button>
                  </form>

                  <div className="flex items-center justify-center">
                    <span className="px-4 text-gray-500">OR</span>
                  </div>

                  <button
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
                <img
                  src={registrationMan}
                  alt="Professional"
                  className="w-full h-full object-cover object-center transform scale-[0.99]"
                  style={{
                    objectPosition: "130% 40%",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegistrationPage;
