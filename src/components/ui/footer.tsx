import Link from "next/link";
import { FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-red-900 dark:bg-gray-950 text-white p-4 sm:p-8">
    <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
      <div>
        <h4 className="font-semibold mb-4">Categories</h4>
        <ul className="space-y-2 text-sm">
          <li><Link href="/explore?category=content_writing" className="hover:underline">Content Writing</Link></li>
          <li><Link href="/explore?category=video_editing" className="hover:underline">Video Editing</Link></li>
          <li><Link href="/explore?category=web_development" className="hover:underline">Web Development</Link></li>
          <li><Link href="/explore?category=design" className="hover:underline">Design</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-4">For Clients</h4>
        <ul className="space-y-2 text-sm">
          <li><Link href="/explore" className="hover:underline">Find Freelancers</Link></li>
          <li><Link href="/contracts" className="hover:underline">My Contracts</Link></li>
          <li><Link href="/messages" className="hover:underline">Messages</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-4">For Freelancers</h4>
        <ul className="space-y-2 text-sm">
          <li><Link href="/explore" className="hover:underline">Browse Gigs</Link></li>
          <li><Link href="/profile" className="hover:underline">Your Profile</Link></li>
          <li><Link href="/contracts" className="hover:underline">Contracts</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-4">More</h4>
        <ul className="space-y-2 text-sm">
          <li><Link href="/explore?category=mobile_development" className="hover:underline">Mobile Development</Link></li>
          <li><Link href="/explore?category=data_science" className="hover:underline">Data Science</Link></li>
          <li><Link href="/explore?category=other" className="hover:underline">Other Services</Link></li>
        </ul>
      </div>
    </div>
    <div className="mt-8 pt-8 border-t border-red-800 dark:border-gray-800 flex flex-col items-center gap-4">
      <div className="flex gap-4">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-300 transition-colors">
          <FaInstagram size={30} />
        </a>
        <a href="https://wa.me" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-300 transition-colors">
          <FaWhatsapp size={30} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-300 transition-colors">
          <FaTwitter size={30} />
        </a>
      </div>
      <p className="text-red-300 text-xs">&copy; {new Date().getFullYear()} GradWork. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
