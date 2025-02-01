import PropTypes from "prop-types";
import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {Menu, X} from "lucide-react";
import {useLocation, useNavigate} from "react-router-dom";
import SearchBar from "./searchbar.jsx";
import profileIcon from "../../assets/profile_icon.svg";

const Header = ({ onAboutUsClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isRegistrationPage = location.pathname === "/register";

  const containerVariants = {
    initial: {
      x: "100%",
    },
    animate: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
    exit: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  const menuItemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3,
      },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        delay: 0.1,
      },
    },
  };

  const handleHomePage = () => {
    navigate("/");
  };
  const handleProfile = () => {
    navigate("/profile");
  }
  const handleAboutUs = () => {
    navigate("/");
    onAboutUsClick();
  }

  return (
    <nav className="relative flex justify-between items-center p-4 bg-white shadow-sm">
      <div
        className="text-xl font-bold text-red-500 cursor-pointer"
        onClick={handleHomePage}
      >
        Grad<span className="text-xl font-bold text-black">Work</span>
      </div>

      {isRegistrationPage && <SearchBar />}

      {/* Desktop Menu */}
      <div className="hidden sm:block">
        <ul className="flex gap-4 justify-end">
          <li
            className="p-2 rounded-lg text-lg hover:text-red-500 transition-colors duration-300 cursor-pointer"
            onClick={() => navigate("/explore")}
          >
            Explore
          </li>
          <li
            className="p-2 rounded-lg text-lg hover:text-red-500 transition-colors duration-300 cursor-pointer"
            onClick={handleAboutUs}
          >
            About Us
          </li>
          <li
            className="p-2 rounded-lg text-lg hover:text-red-500 transition-colors duration-300 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </li>
          <li >
            <img src={profileIcon} alt="Profile Icon" className="w-12 h-12" onClick={handleProfile} />
          </li>
        </ul>
      </div>

      {/* Mobile Menu Button */}
      <div className="sm:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 z-[60] relative"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
            />

            {/* Menu */}
            <motion.div
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 p-4"
            >
              <div className="pt-16">
                <motion.ul
                  variants={menuItemVariants}
                  className="flex flex-col gap-4"
                >
                  <motion.li
                    className="p-2 hover:text-red-500 cursor-pointer"
                    onClick={() => {
                      setIsOpen(false);
                      navigate("/explore");
                    }}
                  >
                    Explore
                  </motion.li>
                  {
                    /* <motion.li
                    className="p-2 hover:text-red-500 cursor-pointer"
                    onClick={() => { setIsOpen(false); navigate('/services'); }}
                  >
                    Services
                  </motion.li> */
                  }
                  <motion.li
                    className="p-2 hover:text-red-500 cursor-pointer"
                    onClick={() => {
                      setIsOpen(false);
                      handleHomePage();
                      onAboutUsClick();
                    }}
                  >
                    About Us
                  </motion.li>
                  <motion.li
                    className="p-2 hover:text-red-500 cursor-pointer"
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    Register
                  </motion.li>
                  <motion.li
                      className={"p-2 hover:text-red-500 cursor-pointer"}
                      onClick={handleProfile}>
                    Profile
                  </motion.li>
                </motion.ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

Header.propTypes = {
  onAboutUsClick: PropTypes.func,
};

export default Header;
