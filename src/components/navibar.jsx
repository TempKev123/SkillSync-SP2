import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profilePhotoURL, logout } = useAuth();

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
    <nav className="bg-gradient-to-r from-[#887cd0] to-[#a396e0] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/home" className="flex-shrink-0">
            <span className="text-xl font-bold text-white">SkillSync</span>
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
              to="/profile"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === "/profile" || location.pathname === "/profile/edit"
                  ? "bg-white/20 text-white"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              Profile
            </Link>

            {/* User Avatar & Logout */}
            <div className="flex items-center gap-3 ml-4">
              {user && (
                <div className="flex items-center gap-2">
                  {profilePhotoURL ? (
                    <img
                      src={profilePhotoURL}
                      alt={user.displayName || 'User'}
                      className="w-8 h-8 rounded-full object-cover border-2 border-white/30"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-semibold border-2 border-white/30">
                      {getInitials()}
                    </div>
                  )}
                  <span className="text-sm text-white hidden sm:block">
                    {user.displayName || user.email}
                  </span>
                </div>
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
