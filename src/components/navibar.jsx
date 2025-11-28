import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profilePhotoURL, photoLoading, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  // Get user initials for avatar fallback
  const getInitials = () => {
    if (user?.displayName) {
      return user.displayName.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    return user?.email?.[0]?.toUpperCase() || 'U';
  };

  return (
    <nav className="bg-linear-to-r from-[#887cd0] to-[#a396e0] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/home" className="shrink-0">
            <span className="text-2xl font-bold text-white">SkillSync</span>
          </Link>

          {/* Navigation Links & User Section */}
          <div className="flex items-center gap-1">
            <Link
              to="/home"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === "/home"
                  ? "bg-white/20 text-white"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              Home
            </Link>
            <Link
              to="/message"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                location.pathname === "/message"
                  ? "bg-white/20 text-white"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              Messages
            </Link>

            {/* User Avatar & Logout */}
            <div className="flex items-center gap-3 ml-4">
              {user && (
                <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  {photoLoading ? (
                    <div className="w-9 h-9 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center animate-pulse">
                      <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  ) : profilePhotoURL ? (
                    <img
                      src={profilePhotoURL}
                      alt={user.displayName || 'User'}
                      className="w-9 h-9 rounded-full object-cover border-2 border-white/30 cursor-pointer"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-semibold border-2 border-white/30 cursor-pointer">
                      {getInitials()}
                    </div>
                  )}
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="text-white/80 hover:text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
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
