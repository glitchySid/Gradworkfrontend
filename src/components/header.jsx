
const Header = () => (
  <nav className="flex justify-between items-center p-4">
    <div className="text-xl font-bold text-red-500">GradWork.</div>
    <div className="flex gap-4">
      <a href="#" className="text-gray-600">About Us</a>
      <a href="#" className="text-gray-600">Explore</a>
      <button className="bg-red-500 text-white px-4 py-2 rounded-md">Sign In</button>
    </div>
  </nav>
);

export default Header;
