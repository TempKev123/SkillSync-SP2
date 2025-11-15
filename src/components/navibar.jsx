import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-white text-2xl font-bold">SkillSync</span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link
              to="/home"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === "/home"
                  ? "bg-blue-900 text-white"
                  : "text-blue-100 hover:bg-blue-700 hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link
              to="/profile"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === "/profile"
                  ? "bg-blue-900 text-white"
                  : "text-blue-100 hover:bg-blue-700 hover:text-white"
              }`}
            >
              Profile
            </Link>

            {/* User Info & Logout */}
            <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-blue-400">
              {user && (
                <span className="text-blue-100 text-sm hidden md:block">
                  {user.email}
                </span>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
