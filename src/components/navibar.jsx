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

  const getInitials = () => {
    if (user?.displayName) {
      return user.displayName.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    return user?.email?.[0]?.toUpperCase() || 'U';
  };

  // Shared Link Logic to avoid repetition
  const navLinks = [
    { name: 'Home', path: '/home', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )},
    { name: 'Messages', path: '/message', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    )},
  ];

  return (
    <>
      {/* --- DESKTOP TOP NAVBAR --- */}
      <nav className="hidden sm:block sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/home" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-[#887cd0] rounded-xl flex items-center justify-center shadow-lg shadow-purple-200 group-hover:rotate-6 transition-transform">
                <span className="text-white font-black text-xl">S</span>
              </div>
              <span className="text-2xl font-black text-gray-900 tracking-tighter">SkillSync</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="flex items-center gap-6">
              <div className="flex items-center bg-gray-100 p-1.5 rounded-2xl">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-6 py-2 rounded-xl text-sm font-black transition-all ${
                      location.pathname === link.path
                        ? "bg-white text-[#887cd0] shadow-sm"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* User Section */}
              <div className="h-8 w-[1px] bg-gray-200 mx-2" />
              
              <div className="flex items-center gap-4">
                <Link to="/profile" className="flex items-center gap-3 group">
                  <span className="text-sm font-bold text-gray-700 group-hover:text-[#887cd0] transition-colors hidden lg:block">
                    {user?.displayName || 'My Profile'}
                  </span>
                  {photoLoading ? (
                    <div className="w-11 h-11 rounded-full bg-gray-100 animate-pulse border-2 border-white shadow-sm" />
                  ) : profilePhotoURL ? (
                    <img src={profilePhotoURL} className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-md" alt="Profile" />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-[#887cd0] flex items-center justify-center text-white font-black text-sm border-2 border-white shadow-md">
                      {getInitials()}
                    </div>
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  title="Logout"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* --- MOBILE BOTTOM NAVBAR --- */}
      {/* Visible only on small screens, fixed to the bottom */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-2xl border-t border-gray-100 px-6 pb-safe">
        <div className="flex justify-between items-center h-20">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex flex-col items-center gap-1 transition-all ${
                location.pathname === link.path ? "text-[#887cd0]" : "text-gray-400"
              }`}
            >
              <div className={`p-2 rounded-2xl transition-all ${location.pathname === link.path ? "bg-purple-50 shadow-inner" : ""}`}>
                {link.icon}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest">{link.name}</span>
            </Link>
          ))}
          
          <Link
            to="/profile"
            className={`flex flex-col items-center gap-1 transition-all ${
              location.pathname === "/profile" ? "text-[#887cd0]" : "text-gray-400"
            }`}
          >
            <div className={`w-10 h-10 rounded-xl overflow-hidden border-2 transition-all ${
              location.pathname === "/profile" ? "border-[#887cd0] scale-110 shadow-lg" : "border-transparent"
            }`}>
              {profilePhotoURL ? (
                <img src={profilePhotoURL} className="w-full h-full object-cover" alt="Profile" />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center font-black text-xs">
                  {getInitials()}
                </div>
              )}
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest">Profile</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex flex-col items-center gap-1 text-gray-400 active:text-red-500 transition-all"
          >
             <div className="p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
             </div>
            <span className="text-[10px] font-black uppercase tracking-widest">Exit</span>
          </button>
        </div>
      </nav>
    </>
  );
}