
const Header = () => (
  <nav className="flex justify-between items-center p-4">
    <div className="text-xl font-bold text-red-500">Grad<span className="text-xl font-bold text-black">Work</span></div>
    <div className="flex gap-4">
      <a href="#" className="text-gray-600 m-2">About Us</a>
      <a href="#" className="text-gray-600 m-2">Explore</a>
      <button className="bg-red-500 text-white px-4 py-2 rounded-md">Sign In</button>
      <button className="text-gray-700">
        <svg className="w-6 h-6 m-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </button>
    </div>
  </nav>
);

export default Header;
