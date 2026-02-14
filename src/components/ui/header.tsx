import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import SearchBar from "@/components/ui/searchbar";
import { HeaderProps } from "@/types";

const Header = ({ onAboutUsClick }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

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

  const handleAboutUs = () => {
    onAboutUsClick?.();
  };

  return (
    <nav className="relative flex justify-between items-center px-6 py-4 bg-white shadow-sm">
      {/* Logo */}
      <Link
        href="/"
        className="text-xl font-bold text-red-500 cursor-pointer whitespace-nowrap"
      >
        Grad<span className="text-xl font-bold text-black">Work</span>
      </Link>

      {/* Center - Search Bar */}
      <div className="hidden sm:flex flex-1 justify-center mx-8 max-w-xl">
        <SearchBar />
      </div>

      {/* Right - Desktop Menu */}
      <div className="hidden sm:flex items-center">
        <ul className="flex items-center gap-6">
          <li className="flex items-center">
            <Link
              href="/explore"
              className="text-base hover:text-red-500 transition-colors duration-300 cursor-pointer"
            >
              Explore
            </Link>
          </li>
          <li className="flex items-center">
            <button
              onClick={handleAboutUs}
              className="text-base hover:text-red-500 transition-colors duration-300 cursor-pointer bg-transparent border-none"
            >
              About Us
            </button>
          </li>
          <li className="flex items-center">
            <Link
              href="/register"
              className="text-base hover:text-red-500 transition-colors duration-300 cursor-pointer"
            >
              Register
            </Link>
          </li>
          <li className="flex items-center">
            <Link href="/profile" className="flex items-center">
              <Image
                src="/assets/profile_icon.svg"
                alt="Profile Icon"
                width={40}
                height={40}
                className="w-10 h-10"
              />
            </Link>
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
                <ul className="flex flex-col gap-4">
                  <li
                    className="p-2 hover:text-red-500 cursor-pointer list-none"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href="/explore">Explore</Link>
                  </li>
                  <li
                    className="p-2 hover:text-red-500 cursor-pointer list-none"
                    onClick={() => {
                      setIsOpen(false);
                      handleAboutUs();
                    }}
                  >
                    About Us
                  </li>
                  <li
                    className="p-2 hover:text-red-500 cursor-pointer list-none"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href="/register">Register</Link>
                  </li>
                  <li className="p-2 hover:text-red-500 cursor-pointer list-none">
                    <Link href="/profile">Profile</Link>
                  </li>
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;
