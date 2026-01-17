import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

const ProfileComponents = () => {
  const navigate = useNavigate();
  const { user, profilePhotoURL, photoLoading } = useAuth();
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching data for 'kev1' as requested
    fetch('http://localhost:8080/profile/kev1')
      .then(res => res.json())
      .then(data => {
        setApiData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  const profileData = {
    name: apiData?.name || user?.displayName || 'User',
    initials: (apiData?.name || user?.displayName || 'U').split(' ').map(n => n[0]).join(''),
    photoURL: profilePhotoURL || null,
    bio: apiData?.major || null, 
    about: apiData?.aboutme || 'No bio provided yet.',
    contactInfo: {
      email: apiData?.email || user?.email || 'N/A',
      phone: apiData?.phone || 'No phone added',
      linkedin: apiData?.linkin || 'Not connected',
      github: apiData?.github || 'Not connected'
    },
    skills: ['React', 'JavaScript', 'Node.js', 'Tailwind CSS'], 
    portfolio: [] 
  };

  const handleEditProfile = () => navigate('/profile/edit');

  // Show a simple spinner or skeleton while loading
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading Profile...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8"
      style={{ background: "linear-gradient(180deg,rgb(255, 255, 255) 50%, #887cd0 100%)" }}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Profile</h1>
          <button onClick={handleEditProfile} className="bg-[#887cd0] hover:bg-[#a396e0] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium transition-colors w-full sm:w-auto">
            Edit Profile
          </button>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="shrink-0">
              {photoLoading ? (
                <div className="w-32 h-32 rounded-full bg-gray-200 animate-pulse" />
              ) : profileData.photoURL ? (
                <img src={profileData.photoURL} alt="" className="w-32 h-32 rounded-full object-cover border-4 border-[#887cd0]/20" />
              ) : (
                <div className="w-32 h-32 rounded-full bg-linear-to-br from-[#887cd0] to-[#a396e0] flex items-center justify-center text-white text-4xl font-bold border-4 border-[#887cd0]/20">
                  {profileData.initials}
                </div>
              )}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-5xl font-bold text-gray-900 mb-2">{profileData.name}</h2>
              <p className="text-lg text-gray-600">{profileData.bio}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-[#887cd0] rounded-full"></span>
                About Me
              </h3>
              <p className="text-gray-700 leading-relaxed">{profileData.about}</p>
            </div>
          </div>

          {/* Contact Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-[#887cd0] rounded-full"></span>
                Contact
              </h3>
              <div className="space-y-4">
                {/* Email */}
                <ContactItem icon="email" label="Email" value={profileData.contactInfo.email} />
                {/* Phone */}
                <ContactItem icon="phone" label="Phone" value={profileData.contactInfo.phone} />
                {/* LinkedIn */}
                <ContactItem icon="linkedin" label="LinkedIn" value={profileData.contactInfo.linkedin} isLink />
                {/* GitHub */}
                <ContactItem icon="github" label="GitHub" value={profileData.contactInfo.github} isLink />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component to keep the contact list clean
const ContactItem = ({ label, value, isLink }) => (
  <div className="flex items-start gap-3">
    <div className="w-8 h-8 bg-[#887cd0] rounded-lg flex items-center justify-center shrink-0">
       {/* You can re-insert your SVG paths here based on the icon prop */}
       <div className="w-4 h-4 bg-white/20 rounded-full" /> 
    </div>
    <div className="flex-1">
      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</p>
      <p className={`text-sm ${isLink ? 'text-blue-600 hover:underline cursor-pointer' : 'text-gray-900'} break-all`}>
        {value}
      </p>
    </div>
  </div>
);

export default ProfileComponents;