import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, LogOut, User, MessageCircle } from "lucide-react";
import SearchBar from "@/components/ui/searchbar";
import { HeaderProps } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { useChatContext } from "@/context/ChatContext";

const Header = ({ onAboutUsClick }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, authUser, loading, signOut } = useAuth();
  const { conversations } = useChatContext();

  const containerVariants = {
    initial: { x: "100%" },
    animate: {
      x: 0,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
    exit: {
      x: "100%",
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
  };

  const handleAboutUs = () => onAboutUsClick?.();
  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  const isLoggedIn = !!user && !loading;
  const totalUnread = conversations.reduce((sum, c) => sum + c.unread_count, 0);

  return (
    <nav className="relative flex justify-between items-center px-6 py-4 bg-white shadow-sm">
      <Link href="/" className="text-xl font-bold text-red-500 cursor-pointer whitespace-nowrap">
        Grad<span className="text-xl font-bold text-black">Work</span>
      </Link>

      <div className="hidden sm:flex flex-1 justify-center mx-8 max-w-xl">
        <SearchBar />
      </div>

      <div className="hidden sm:flex items-center">
        <ul className="flex items-center gap-6">
          <li className="flex items-center">
            <Link href="/explore" className="text-base hover:text-red-500 transition-colors duration-300 cursor-pointer">
              Explore
            </Link>
          </li>
          <li className="flex items-center">
            <button onClick={handleAboutUs} className="text-base hover:text-red-500 transition-colors duration-300 cursor-pointer bg-transparent border-none">
              About Us
            </button>
          </li>
          
          {isLoggedIn && (
            <li className="flex items-center">
              <Link href="/messages" className="relative text-base hover:text-red-500 transition-colors duration-300 cursor-pointer">
                <MessageCircle size={22} />
                {totalUnread > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                    {totalUnread > 9 ? '9+' : totalUnread}
                  </span>
                )}
              </Link>
            </li>
          )}
          
          {isLoggedIn ? (
            <>
              <li className="flex items-center">
                <Link href="/profile" className="flex items-center">
                  {authUser?.avatar_url ? (
                    <img src={authUser.avatar_url} alt={authUser.display_name || "Profile"} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white">
                      {authUser?.display_name?.charAt(0) || authUser?.email?.charAt(0) || "U"}
                    </div>
                  )}
                </Link>
              </li>
              <li className="flex items-center">
                <button onClick={handleSignOut} className="text-base hover:text-red-500 transition-colors duration-300 cursor-pointer bg-transparent border-none flex items-center gap-1">
                  <LogOut size={18} />
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <li className="flex items-center">
              <Link href="/register" className="text-base hover:text-red-500 transition-colors duration-300 cursor-pointer">
                Register
              </Link>
            </li>
          )}
        </ul>
      </div>

      <div className="sm:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 z-[60] relative" aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsOpen(false)} 
              className="fixed inset-0 bg-black bg-opacity-50 z-40" 
            />
            <motion.div 
              variants={containerVariants} 
              initial="initial" 
              animate="animate" 
              exit="exit" 
              className="fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 p-4"
            >
              <div className="pt-16">
                <ul className="flex flex-col gap-4">
                  <li className="p-2 hover:text-red-500 cursor-pointer list-none" onClick={() => setIsOpen(false)}>
                    <Link href="/explore">Explore</Link>
                  </li>
                  <li className="p-2 hover:text-red-500 cursor-pointer list-none" onClick={() => { setIsOpen(false); handleAboutUs(); }}>
                    About Us
                  </li>
                  
                  {isLoggedIn && (
                    <li className="p-2 hover:text-red-500 cursor-pointer list-none" onClick={() => setIsOpen(false)}>
                      <Link href="/messages" className="flex items-center gap-2">
                        <MessageCircle size={18} />
                        Messages
                        {totalUnread > 0 && (
                          <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">{totalUnread}</span>
                        )}
                      </Link>
                    </li>
                  )}
                  
                  {isLoggedIn ? (
                    <>
                      <li className="p-2 hover:text-red-500 cursor-pointer list-none" onClick={() => setIsOpen(false)}>
                        <Link href="/profile" className="flex items-center gap-2">
                          <User size={18} />
                          Profile
                        </Link>
                      </li>
                      <li className="p-2 hover:text-red-500 cursor-pointer list-none" onClick={() => { setIsOpen(false); handleSignOut(); }}>
                        <div className="flex items-center gap-2">
                          <LogOut size={18} />
                          Sign Out
                        </div>
                      </li>
                    </>
                  ) : (
                    <li className="p-2 hover:text-red-500 cursor-pointer list-none" onClick={() => setIsOpen(false)}>
                      <Link href="/register">Register</Link>
                    </li>
                  )}
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
