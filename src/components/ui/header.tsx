import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, LogOut, Menu, MessageCircle, Moon, Search, Sun, User, UserPlus, X } from "lucide-react";
import SearchBar from "@/components/ui/searchbar";
import { HeaderProps } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { useChatContext } from "@/context/ChatContext";
import { useContracts } from "@/hooks/useApi";
import { useTheme } from "@/context/ThemeContext";

const Header = ({ onAboutUsClick }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPcMenuOpen, setIsPcMenuOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState("");
  const router = useRouter();
  const { user, authUser, loading, signOut, token } = useAuth();
  const { conversations } = useChatContext();
  const { data: contracts = [] } = useContracts(token ?? undefined);
  const pendingContracts = contracts.filter((c) => c.status === "Pending").length;
  const { theme, toggleTheme } = useTheme();

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
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileSearch.trim()) {
      router.push(`/explore?search=${encodeURIComponent(mobileSearch.trim())}`);
      setMobileSearch("");
      setIsOpen(false);
    }
  };

  const isLoggedIn = !!user && !loading;
  const totalUnread = conversations.reduce((sum, c) => sum + c.unread_count, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-800/50 transition-colors duration-200">
      <Link
        href="/"
        className="text-xl font-bold text-red-500 cursor-pointer whitespace-nowrap"
      >
        Grad<span className="text-xl font-bold text-black dark:text-white">Work</span>
      </Link>

      <div className="hidden sm:flex flex-1 justify-center mx-8 max-w-xl">
        <SearchBar />
      </div>

      <div className="hidden sm:flex items-center">
        <ul className="flex items-center gap-6">
          {/* 1. Register (if not logged in) */}
          {!isLoggedIn && (
            <li className="flex items-center">
              <Link
                href="/register"
                className="text-base text-gray-700 dark:text-gray-300 hover:text-red-500 transition-colors duration-300 cursor-pointer"
              >
                Register
              </Link>
            </li>
          )}

          {/* 2. Profile Icon */}
          {isLoggedIn && (
            <li className="flex items-center">
              <Link href="/profile" className="flex items-center">
                {authUser?.avatar_url ? (
                  <img
                    src={authUser.avatar_url}
                    alt={authUser.display_name || "Profile"}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white">
                    {authUser?.display_name?.charAt(0) || authUser?.email?.charAt(0) || "U"}
                  </div>
                )}
              </Link>
            </li>
          )}

          {/* 3. Navigation Menu Dropdown */}
          <li className="relative flex items-center">
            <button
              onClick={() => setIsPcMenuOpen(!isPcMenuOpen)}
              onBlur={() => setTimeout(() => setIsPcMenuOpen(false), 200)}
              className="text-gray-700 dark:text-gray-300 hover:text-red-500 transition-colors duration-300 p-2 cursor-pointer bg-transparent border-none outline-none"
            >
              <Menu size={24} />
            </button>
            <AnimatePresence>
              {isPcMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-12 right-0 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden z-50 py-2 flex flex-col"
                >
                  <Link href="/explore" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-colors" title="Explore" onClick={() => setIsPcMenuOpen(false)}>
                    <Search size={18} /> Explore
                  </Link>

                  {isLoggedIn && (
                    <>
                      <Link href="/messages" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-colors" title="Messages" onClick={() => setIsPcMenuOpen(false)}>
                        <MessageCircle size={18} /> Messages
                        {totalUnread > 0 && <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full text-center">{totalUnread > 9 ? "9+" : totalUnread}</span>}
                      </Link>
                      <Link href="/contracts" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-colors" title="Contracts" onClick={() => setIsPcMenuOpen(false)}>
                        <FileText size={18} /> Contracts
                        {pendingContracts > 0 && <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full text-center">{pendingContracts > 9 ? "9+" : pendingContracts}</span>}
                      </Link>
                    </>
                  )}

                  <hr className="my-1 border-gray-100 dark:border-gray-700" />

                  {/* Theme Switcher in Dropdown */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTheme();
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-colors w-full text-left"
                  >
                    {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </button>

                  {/* Sign Out in Dropdown */}
                  {isLoggedIn && (
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-colors w-full text-left"
                    >
                      <LogOut size={18} /> Sign Out
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        </ul>
      </div>

      <div className="sm:hidden flex items-center gap-1">
        <Link
          href="/explore"
          className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Search"
        >
          <Search size={18} />
        </Link>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 z-[60] relative text-gray-700 dark:text-gray-300"
          aria-label="Toggle menu"
        >
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
              className="fixed inset-0 bg-black/50 z-40"
            />
            <motion.div
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed top-0 right-0 h-full w-3/4 max-w-[280px] bg-white dark:bg-gray-900 shadow-xl z-50 p-4"
            >
              <div className="pt-14">
                <form onSubmit={handleMobileSearch} className="mb-4 pr-3 pl-1">
                  <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden w-full max-w-full">
                    <input
                      type="text"
                      placeholder="Search gigs..."
                      value={mobileSearch}
                      onChange={(e) => setMobileSearch(e.target.value)}
                      className="flex-1 w-full min-w-0 px-3 py-2.5 text-sm outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-red-500 text-white flex items-center justify-center align-middle"
                    >
                      <Search size={16} />
                    </button>
                  </div>
                </form>

                <ul className="flex flex-col gap-1">
                  <li
                    className="p-3 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 rounded-lg cursor-pointer list-none transition-colors text-gray-700 dark:text-gray-300"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href="/explore" className="flex items-center gap-2 w-full">
                      <Search size={18} />
                      Explore
                    </Link>
                  </li>
                  {/* <li
                    className="p-3 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 rounded-lg cursor-pointer list-none transition-colors text-gray-700 dark:text-gray-300"
                    onClick={() => {
                      setIsOpen(false);
                      handleAboutUs();
                    }}
                  >
                    About Us
                  </li> */}

                  {isLoggedIn && (
                    <li
                      className="p-3 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 rounded-lg cursor-pointer list-none transition-colors text-gray-700 dark:text-gray-300"
                      onClick={() => setIsOpen(false)}
                    >
                      <Link
                        href="/messages"
                        className="flex items-center gap-2 w-full"
                      >
                        <MessageCircle size={18} />
                        Messages
                        {totalUnread > 0 && (
                          <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                            {totalUnread}
                          </span>
                        )}
                      </Link>
                    </li>
                  )}

                  {isLoggedIn && (
                    <li
                      className="p-3 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 rounded-lg cursor-pointer list-none transition-colors text-gray-700 dark:text-gray-300"
                      onClick={() => setIsOpen(false)}
                    >
                      <Link
                        href="/contracts"
                        className="flex items-center gap-2 w-full"
                      >
                        <FileText size={18} />
                        Contracts
                        {pendingContracts > 0 && (
                          <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                            {pendingContracts}
                          </span>
                        )}
                      </Link>
                    </li>
                  )}

                  {isLoggedIn
                    ? (
                      <>
                        <li
                          className="p-3 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 rounded-lg cursor-pointer list-none transition-colors text-gray-700 dark:text-gray-300"
                          onClick={() => setIsOpen(false)}
                        >
                          <Link
                            href="/profile"
                            className="flex items-center gap-2 w-full"
                          >
                            <User size={18} />
                            Profile
                          </Link>
                        </li>
                        <li
                          className="p-3 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 rounded-lg cursor-pointer list-none transition-colors text-red-600"
                          onClick={() => {
                            setIsOpen(false);
                            handleSignOut();
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <LogOut size={18} />
                            Sign Out
                          </div>
                        </li>
                      </>
                    )
                    : (
                      <li
                        className="p-3 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 rounded-lg cursor-pointer list-none transition-colors text-gray-700 dark:text-gray-300 w-full pr-4"
                        onClick={() => setIsOpen(false)}
                      >
                        <Link href="/register" className="flex items-center gap-2 w-full">
                          <UserPlus size={18} />
                          Register
                        </Link>
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
