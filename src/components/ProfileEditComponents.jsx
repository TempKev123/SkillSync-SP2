import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfileEditComponents = () => {
  const navigate = useNavigate();
  const { user, profilePhotoURL, photoLoading } = useAuth();

  const [name, setName] = useState('');
  const [bio, setBio] = useState('Computer Science • 2025');
  const [about, setAbout] = useState('A passionate computer science student with strong interest in AI...');
  const [contactInfo, setContactInfo] = useState({
    email: '', phone: '+1 (555) 123-4567', linkedin: 'linkedin.com/in/alice', github: 'github.com/alice'
  });

  const [skills, setSkills] = useState(['React', 'JavaScript', 'Python', 'UI/UX Design']);
  const [newSkill, setNewSkill] = useState('');

  const skillRecommendations = ['TypeScript', 'Next.js', 'Figma', 'Tailwind'];

  useEffect(() => {
    if (user) {
      if (user.displayName) setName(user.displayName);
      if (user.email) setContactInfo(prev => ({ ...prev, email: user.email }));
    }
  }, [user]);

  const handleSaveProfile = () => {
    alert('Profile updated successfully!');
    navigate('/profile');
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="min-h-screen pb-32 lg:pb-12"
      style={{ background: "linear-gradient(180deg, #ffffff 60%, #887cd0 100%)" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        
        {/* --- HEADER: Floating on Mobile --- */}
        <div className="flex items-center justify-between mb-10 bg-white/80 backdrop-blur-lg p-4 rounded-3xl lg:bg-transparent lg:p-0 sticky top-4 z-30 shadow-xl lg:shadow-none lg:relative">
          <h1 className="text-2xl font-black text-gray-900 tracking-tighter">Edit Profile</h1>
          <div className="flex gap-2">
            <button onClick={() => navigate('/profile')} className="px-5 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all text-sm">
              Cancel
            </button>
            <button onClick={handleSaveProfile} className="px-6 py-2.5 bg-[#887cd0] text-white rounded-xl font-bold shadow-lg shadow-purple-200 hover:scale-105 transition-all active:scale-95 text-sm">
              Save
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- LEFT COLUMN: Main Info --- */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Avatar & Basic Info */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50">
               <div className="flex flex-col sm:flex-row items-center gap-8 mb-8">
                  <div className="relative group">
                    {photoLoading ? (
                      <div className="w-32 h-32 rounded-3xl bg-gray-100 animate-pulse" />
                    ) : profilePhotoURL ? (
                      <img src={profilePhotoURL} className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-xl" alt="Edit" />
                    ) : (
                      <div className="w-32 h-32 rounded-3xl bg-[#887cd0] flex items-center justify-center text-white text-4xl font-black">{name[0]}</div>
                    )}
                    <div className="absolute inset-0 bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                      <span className="text-white text-xs font-bold uppercase tracking-widest">Change</span>
                    </div>
                  </div>

                  <div className="flex-1 w-full space-y-4">
                    <div>
                      <label className="text-[10px] font-black text-[#887cd0] uppercase tracking-widest mb-1 block ml-1">Full Name</label>
                      <input 
                        value={name} onChange={(e) => setName(e.target.value)}
                        className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3 focus:ring-4 focus:ring-[#887cd0]/10 font-bold transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-[#887cd0] uppercase tracking-widest mb-1 block ml-1">Headline</label>
                      <input 
                        value={bio} onChange={(e) => setBio(e.target.value)}
                        className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3 focus:ring-4 focus:ring-[#887cd0]/10 font-medium transition-all"
                      />
                    </div>
                  </div>
               </div>

               <div>
                 <label className="text-[10px] font-black text-[#887cd0] uppercase tracking-widest mb-2 block ml-1">About Me</label>
                 <textarea 
                    value={about} onChange={(e) => setAbout(e.target.value)} rows="5"
                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 focus:ring-4 focus:ring-[#887cd0]/10 font-medium transition-all resize-none"
                 />
               </div>
            </div>

            {/* Skills & Recommendations */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50">
              <h3 className="text-xs font-black text-gray-400 mb-6 tracking-[0.2em] uppercase">Skills & Tech</h3>
              
              <div className="flex gap-2 mb-8">
                <input 
                  value={newSkill} onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add skill..."
                  className="flex-1 bg-gray-50 border-none rounded-2xl px-5 py-3 focus:ring-4 focus:ring-[#887cd0]/10"
                />
                <button onClick={handleAddSkill} className="bg-gray-900 text-white px-6 rounded-2xl font-black text-sm active:scale-95 transition-all">
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {skills.map(skill => (
                  <div key={skill} className="group flex items-center gap-2 px-4 py-2 bg-purple-50 text-[#887cd0] rounded-xl font-bold text-sm">
                    {skill}
                    <button onClick={() => handleRemoveSkill(skill)} className="hover:text-red-500">×</button>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-gray-50 rounded-3xl">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Trending Skills</p>
                 <div className="flex flex-wrap gap-2">
                    {skillRecommendations.map(rec => (
                      <button key={rec} onClick={() => setSkills([...skills, rec])} className="text-xs font-bold text-[#887cd0] hover:bg-white px-3 py-1.5 rounded-lg transition-all">
                        + {rec}
                      </button>
                    ))}
                 </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Contact --- */}
          <div className="space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50">
              <h3 className="text-xs font-black text-gray-400 mb-8 tracking-[0.2em] uppercase">Connect Channels</h3>
              <div className="space-y-6">
                {['email', 'linkedin', 'github'].map(key => (
                  <div key={key}>
                    <label className="text-[10px] font-black text-[#887cd0] uppercase tracking-widest mb-2 block ml-1">{key}</label>
                    <input 
                      value={contactInfo[key]} 
                      onChange={(e) => setContactInfo({...contactInfo, [key]: e.target.value})}
                      className="w-full bg-gray-50 border-none rounded-xl px-4 py-2 text-sm focus:ring-4 focus:ring-[#887cd0]/10 font-bold"
                    />
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

export default ProfileEditComponents;