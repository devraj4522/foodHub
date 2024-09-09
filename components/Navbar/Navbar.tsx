
import { useState, useEffect } from 'react';
// import { FaUserCircle, FaBars } from 'react-icons/fa';  

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [address, setAddress] = useState('Fetching address...');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Detect if the screen size is mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setAddress(`Lat: ${position.coords.latitude}, Lon: ${position.coords.longitude}`);
        },
        () => {
          setAddress('Unable to detect location');
        }
      );
    }
  }, []);

  return (
    <nav className="bg-transparent shadow-md px-4 py-3 flex items-center justify-between">
      {!isMobile && (
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-10" />
        </div>
      )}

      {!isMobile && (
        <div className="flex-1 text-center">
          <p className="text-gray-500">{address}</p>
        </div>
      )}

      {!isMobile && (
        <div className="flex items-center space-x-6">
          <p className="text-gray-700">Call us: 911111111</p>
          <button className="text-gray-700">Cart</button>
          <button className="text-gray-700 flex items-center space-x-2">
            {/* <FaUserCircle className="text-xl" /> */}
            <span>Sign In</span>
          </button>
        </div>
      )}

      {/* Mobile view: Sign In, Hamburger menu */}
      {isMobile && (
        <div className="flex items-center space-x-4">
          <button className="text-gray-700 flex items-center space-x-2">
            {/* <FaUserCircle className="text-xl" /> */}
            <span>Sign In</span>
          </button>
          <button
            className="text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {/* <FaBars className="text-2xl" /> */}
          </button>
        </div>
      )}

      {/* Mobile Menu Dropdown (visible only when hamburger menu is clicked) */}
      {isMobile && isMenuOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg w-48 py-2">
          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Home</a>
          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">About Us</a>
          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Contact</a>
          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Services</a>
        </div>
      )}
    </nav>
  );
}
