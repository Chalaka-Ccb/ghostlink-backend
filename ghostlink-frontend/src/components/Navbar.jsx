import { Link, useNavigate } from 'react-router-dom';
import { Ghost, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [isOpen, setIsOpen] = useState(false); // Mobile Menu State

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Ghost className="text-purple-500 group-hover:rotate-12 transition-transform" />
            <span className="font-bold text-xl tracking-tight">GhostLink</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-300 hover:text-white transition">Home</Link>
            <Link to="/app" className="text-gray-300 hover:text-white transition">Create Link</Link>
            
            {token ? (
              <>
                <Link to="/dashboard" className="text-blue-400 hover:text-blue-300 font-medium">Dashboard</Link>
                <button onClick={handleLogout} className="bg-gray-800 hover:bg-red-600 px-4 py-2 rounded-lg transition text-sm font-bold">
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-3">
                <Link to="/login" className="px-4 py-2 text-gray-300 hover:text-white">Log In</Link>
                <Link to="/register" className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg font-bold transition">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 p-4 space-y-4">
          <Link to="/" className="block text-gray-300">Home</Link>
          <Link to="/app" className="block text-gray-300">Create Link</Link>
          {token ? (
            <>
              <Link to="/dashboard" className="block text-blue-400 font-bold">Dashboard</Link>
              <button onClick={handleLogout} className="block w-full text-left text-red-400">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="block text-gray-300">Log In</Link>
              <Link to="/register" className="block text-blue-400 font-bold">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;