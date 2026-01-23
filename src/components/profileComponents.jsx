import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:8000/profile/';



const ProfileComponents = () => {

  const [apiProfile, setApiProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user, profilePhotoURL, photoLoading, uid } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL + 2);
        //const response = await fetch(API_URL + user?.uid); replace with uid later after testing
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        setApiProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const profileData = {
    name: apiProfile?.username || user?.displayName || 'User',
    initials: user?.displayName?.split(' ').map(n => n[0]).join('') || 'U',
    photoURL: profilePhotoURL || null,
    bio: user?.displayName|| 'No Name Found',
    about:apiProfile?.aboutme || '',
    skills: apiProfile?.tags || [],
    portfolio: [
      { id: 1, title: 'AI Academic Assistant', description: 'Intelligent tutoring system using NLP to provide personalized learning support.', tags: ['AI', 'NLP'], status: 'Completed' },
      { id: 2, title: 'Collaborative Research', description: 'Web platform for researchers to share findings in real-time.', tags: ['React', 'Node.js'], status: 'In Progress' }
    ]
  };

  return (
    <div className="min-h-screen pb-24 lg:pb-12"
      style={{ background: "linear-gradient(180deg, #ffffff 60%, #887cd0 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">

        {/* --- HERO SECTION --- */}
        <div className="relative bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border border-white shadow-2xl p-8 mb-8 overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#887cd0]/5 rounded-full -mr-20 -mt-20 blur-3xl" />

          <div className="relative flex flex-col md:flex-row items-center md:items-end gap-8">
            {/* Avatar */}
            <div className="relative shrink-0 -mt-4">
              {photoLoading ? (
                <div className="w-40 h-40 rounded-[2rem] bg-gray-100 animate-pulse border-4 border-white shadow-xl" />
              ) : profileData.photoURL ? (
                <img src={profileData.photoURL} className="w-40 h-40 rounded-[2rem] object-cover border-4 border-white shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500" alt="Profile" />
              ) : (
                <div className="w-40 h-40 rounded-[2rem] bg-gradient-to-br from-[#887cd0] to-[#a396e0] flex items-center justify-center text-white text-5xl font-black border-4 border-white shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500">
                  {profileData.initials}
                </div>
              )}
            </div>

            {/* User Details */}
            <div className="flex-1 text-center md:text-left pb-2">
              <h1 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tighter mb-2">
                {profileData.name}
              </h1>
              <p className="text-[#887cd0] font-bold text-lg tracking-wide uppercase text-sm mb-6 sm:mb-0">
                {profileData.bio}
              </p>
            </div>

            <button
              onClick={() => navigate('/profile/edit')}
              className="w-full md:w-auto bg-gray-900 hover:bg-[#887cd0] text-white px-8 py-4 rounded-2xl font-black transition-all active:scale-95 shadow-lg"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* --- CONTENT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT: About & Skills */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-50">
              <h3 className="text-xs font-black text-[#887cd0] mb-4 tracking-[0.3em] uppercase">Biography</h3>
              <p className="text-xl text-gray-600 leading-relaxed font-medium italic">
                "{profileData.about}"
              </p>

              <div className="h-[1px] bg-gray-100 my-8" />

              <h3 className="text-xs font-black text-[#887cd0] mb-6 tracking-[0.3em] uppercase">Core Expertise</h3>
              <div className="flex flex-wrap gap-3">
                {profileData.skills.map((skill) => (
                  <span key={skill} className="px-5 py-2.5 bg-gray-50 text-gray-700 rounded-xl text-sm font-bold border border-gray-100 hover:border-[#887cd0] hover:text-[#887cd0] transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Projects Feed */}
            <div className="space-y-6">
              <h3 className="text-xs font-black text-gray-400 px-4 tracking-[0.3em] uppercase">Featured Work</h3>
              {profileData.portfolio.map((project) => (
                <div key={project.id} className="group bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all border border-gray-50 flex flex-col sm:flex-row gap-6 items-start">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                    <span className="text-2xl">📁</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-2xl font-black text-gray-900 group-hover:text-[#887cd0] transition-colors">{project.title}</h4>
                      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${project.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                        }`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-gray-500 font-medium mb-4">{project.description}</p>
                    <div className="flex gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-xs font-bold text-gray-400">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Contact & Sidebar */}
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-sm border border-white sticky top-24">
              <h3 className="text-xs font-black text-[#887cd0] mb-8 tracking-[0.3em] uppercase text-center">Contact Info</h3>
              <div className="space-y-6">
                {[
                  { label: 'Email', value: apiProfile?.email || user.email, icon: '✉️' },
                  { label: 'Phone', value: apiProfile?.phone, icon: '📞' },
                  { label: 'LinkedIn', value: apiProfile?.linkedin, icon: '🔗' },
                  { label: 'GitHub', value: apiProfile?.github, icon: '💻' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.label}</p>
                      <p className="text-sm font-bold text-gray-900 truncate">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileComponents;