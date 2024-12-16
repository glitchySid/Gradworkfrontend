import { FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
const Footer = () => (
  <footer className="bg-red-900 text-white p-8">
    <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
      <div>
        <h4 className="font-semibold mb-4">Categories</h4>
        <ul className="space-y-2 text-sm">
          <li>Digital Marketing</li>
          <li>Content Writing</li>
          <li>Video & Animation</li>
          <li>Programming</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-4">For Clients</h4>
        <ul className="space-y-2 text-sm">
          <li>Find Freelancers</li>
          <li>Post Project</li>
          <li>Payment Protection</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-4">For Freelancers</h4>
        <ul className="space-y-2 text-sm">
          <li>Find Work</li>
          <li>Create Profile</li>
          <li>Earn Money</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-4">Business Solutions</h4>
        <ul className="space-y-2 text-sm">
          <li>Enterprise Suite</li>
          <li>Success Stories</li>
          <li>Partners</li>
        </ul>
      </div>
    </div>
    <div className="mt-8 pt-8 border-t border-red-800 flex justify-center gap-4">
      <a href="#" className="text-white">
        <FaInstagram size={30} />
      </a>
      <a href="#" className="text-white">
        <FaWhatsapp size={30} />
      </a>
      <a href="#" className="text-white">
        <FaTwitter size={30} />
      </a>
    </div>
  </footer>
);

export default Footer;
