import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CiMenuBurger } from "react-icons/ci";
import { X } from "lucide-react"; // Import X icon for close button
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "./ui/searchbar";

const Header = ({onAboutUsClick}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const navigate = useNavigate();
  const location = useLocation();
  const isRegistrationPage = location.pathname === "/register";
  const handleSignInClick = () => {
    navigate("/register");
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
      },
    },
  };

  const menuItemVariants = {
    closed: {
      opacity: 0,
      x: 20,
    },
    open: {
      opacity: 1,
      x: 0,
    },
  };

  const handleHomePage = () => {
    navigate("/");
  };

  return (
    <nav className="relative flex justify-between items-center p-4">
      <div className="text-xl font-bold text-red-500" onClick={handleHomePage}>
        Grad<span className="text-xl font-bold text-black">Work</span>
      </div>
      {isRegistrationPage && <SearchBar />}

      <div className="hidden sm:block">
        <ul className="flex gap-4 justify-end">
          <li className="p-2 rounded-lg text-lg hover:text-red-500 transition-colors duration-300" onClick={onAboutUsClick}>
            About Us
          </li>
          <li className="p-2 rounded-lg text-lg hover:text-red-500 transition-colors duration-300">
            Explore
          </li>
          <li
            className="p-2 rounded-lg text-lg hover:text-black text-white bg-red-500 transition-colors duration-300"
            onClick={handleSignInClick}
          >
            Sign In
          </li>
        </ul>
      </div>

      {/* Mobile Navigation */}
      <div className="block sm:hidden">
        <motion.div
          onClick={toggleMenu}
          className="cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: isMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <CiMenuBurger size={25} className="m-1 hover:text-red-500" />
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-40"
                onClick={toggleMenu}
              />

              {/* Menu */}
              <motion.div
                className="fixed top-0 right-0 h-screen w-[70%] bg-white shadow-lg z-50"
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
              >
                <div className="p-4">
                  {/* Close button */}
                  <button
                    onClick={toggleMenu}
                    className="absolute top-4 right-4 p-2 hover:bg-red-100 rounded-full"
                  >
                    <X size={24} />
                  </button>

                  <motion.ul className="space-y-4 mt-12">
                    <motion.li
                      variants={menuItemVariants}
                      className="p-2 rounded-lg text-lg hover:bg-red-100 transition-colors duration-300"
                    >
                      About Us
                    </motion.li>
                    <motion.li
                      variants={menuItemVariants}
                      className="p-2 rounded-lg text-lg hover:bg-red-100 transition-colors duration-300"
                    >
                      Become a Seller
                    </motion.li>
                    <motion.li
                      variants={menuItemVariants}
                      className="p-2 rounded-lg text-lg hover:bg-red-100 transition-colors duration-300"
                      onClick={handleSignInClick}
                    >
                      Sign In
                    </motion.li>
                  </motion.ul>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Header;
