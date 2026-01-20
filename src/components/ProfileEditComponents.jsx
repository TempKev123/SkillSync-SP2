// src/components/ProfileEditComponents.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfileEditComponents = () => {
  const navigate = useNavigate();
  const { user, profilePhotoURL, photoLoading, profileData, updateProfileData, getDefaultProfileData } = useAuth();
  const [saving, setSaving] = useState(false);

  // State for editable sections
  const [name, setName] = useState('');
  const [bio, setBio] = useState('Computer Science • 2025');
  const [about, setAbout] = useState('A passionate computer science student with strong interest in AI and machine learning. Currently working on research projects focused on natural language processing and collaborative learning systems.');

  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: '+1 (555) 123-4567',
    linkedin: 'linkedin.com/in/alicejohnson',
    github: 'github.com/alicejohnson'
  });

  // Load user data from Firestore or Microsoft account when component mounts
  useEffect(() => {
    if (profileData) {
      // Load from Firestore if profile exists
      setName(profileData.name || user?.displayName || '');
      setBio(profileData.bio || '');
      setAbout(profileData.about || '');
      setContactInfo({
        email: profileData.contactInfo?.email || user?.email || '',
        phone: profileData.contactInfo?.phone || '',
        linkedin: profileData.contactInfo?.linkedin || '',
        github: profileData.contactInfo?.github || '',
      });
      setSkills(profileData.skills || []);
      if (profileData.portfolio && profileData.portfolio.length > 0) {
        setPortfolio(profileData.portfolio);
      }
    } else if (user) {
      // Fallback to Microsoft account data for new users
      const defaultProfile = getDefaultProfileData();
      setName(defaultProfile.name);
      setContactInfo(prev => ({
        ...prev,
        email: defaultProfile.contactInfo.email
      }));
    }
  }, [user, profileData, getDefaultProfileData]);

  // Skills state
  const [skills, setSkills] = useState([
    'React', 'JavaScript', 'Python', 'Machine Learning', 'UI/UX Design',
    'Node.js', 'Tailwind CSS', 'Data Analysis', 'Project Management'
  ]);
  const [newSkill, setNewSkill] = useState('');

  const skillRecommendations = [
    'TypeScript', 'Next.js', 'MongoDB', 'AWS', 'Docker',
    'Figma', 'Agile Methodology', 'TensorFlow', 'GraphQL', 'Firebase'
  ];

  // Portfolio state
  const [portfolio, setPortfolio] = useState([
    {
      id: 1,
      title: 'AI Academic Assistant',
      description: 'Intelligent tutoring system using NLP to provide personalized learning support',
      tags: ['AI', 'NLP', 'Education'],
      status: 'Completed'
    },
    {
      id: 2,
      title: 'Collaborative Research Platform',
      description: 'Web platform for researchers to collaborate and share findings in real-time',
      tags: ['React', 'Node.js', 'Real-time'],
      status: 'In Progress'
    },
    {
      id: 3,
      title: 'Student Portfolio Showcase',
      description: 'Platform for students to showcase projects and connect with employers',
      tags: ['UI/UX', 'Career', 'Networking'],
      status: 'Planning'
    }
  ]);

  // Handler functions
  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      await updateProfileData({
        name,
        bio,
        about,
        contactInfo,
        skills,
        portfolio,
      });
      navigate('/profile');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
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

  const handleAddRecommendedSkill = (recommendedSkill) => {
    if (!skills.includes(recommendedSkill)) {
      setSkills([...skills, recommendedSkill]);
    }
  };

  const initials = name.split(' ').map(n => n[0]).join('') || 'U';

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">

        {/* Header with Save/Cancel Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Edit My Profile</h1>
          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={handleCancel}
              className="flex-1 sm:flex-none border-2 border-gray-300 hover:bg-gray-50 text-gray-700 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium transition-colors text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="flex-1 sm:flex-none bg-[#887cd0] hover:bg-[#a396e0] disabled:bg-gray-400 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium transition-colors text-sm sm:text-base shadow-md"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Profile Hero Section */}
        <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            {/* Avatar */}
            <div className="shrink-0">
              {photoLoading ? (
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center animate-pulse">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              ) : profilePhotoURL ? (
                <img
                  src={profilePhotoURL}
                  alt={name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-[#887cd0]/20"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-linear-to-br from-[#887cd0] to-[#a396e0] flex items-center justify-center text-white text-4xl font-bold border-4 border-[#887cd0]/20">
                  {initials}
                </div>
              )}
              <p className="text-xs text-gray-500 text-center mt-2">
                From Microsoft account
              </p>
            </div>

            {/* Basic Info Editing */}
            <div className="flex-1 w-full">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#887cd0] focus:border-transparent text-lg font-semibold"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                <input
                  type="text"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#887cd0] focus:border-transparent"
                  placeholder="e.g., Computer Science • 2025"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-linear-to-b from-[#887cd0] to-[#a396e0] rounded-full"></span>
                About Me
              </h3>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                rows="6"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#887cd0] focus:border-transparent resize-none"
                placeholder="Tell your story..."
              />
            </div>

            {/* Skills Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-linear-to-b from-[#887cd0] to-[#a396e0] rounded-full"></span>
                Skills & Technologies
              </h3>

              {/* Add Skill */}
              <div className="mb-4">
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                    className="flex-1 px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#887cd0] focus:border-transparent"
                    placeholder="Add a new skill..."
                  />
                  <button
                    onClick={handleAddSkill}
                    disabled={!newSkill.trim()}
                    className="bg-[#3b5998] hover:bg-[#2d4373] disabled:bg-gray-400 text-white px-6 py-2.5 rounded-lg transition-colors font-medium shadow-sm"
                  >
                    Add
                  </button>
                </div>

                {/* Recommended Skills */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Recommended:</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillRecommendations.map((skill) => (
                      <button
                        key={skill}
                        onClick={() => handleAddRecommendedSkill(skill)}
                        disabled={skills.includes(skill)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                          skills.includes(skill)
                            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                            : 'bg-linear-to-r from-[#887cd0]/10 to-[#a396e0]/10 text-[#3b5998] border-[#887cd0]/20 hover:from-[#887cd0]/20 hover:to-[#a396e0]/20'
                        }`}
                      >
                        + {skill}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Skills Display */}
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="group relative"
                  >
                    <span className="inline-block px-4 py-2 bg-linear-to-r from-gray-100 to-gray-50 text-gray-800 rounded-lg text-sm font-medium border border-gray-200">
                      {skill}
                    </span>
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-red-600 shadow-md"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {skills.length === 0 && (
                  <p className="text-gray-500 italic text-sm">No skills added yet.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-linear-to-b from-[#887cd0] to-[#a396e0] rounded-full"></span>
                Contact
              </h3>
              <div className="space-y-4">
                {Object.entries(contactInfo).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-linear-to-br from-[#887cd0] to-[#a396e0] rounded-lg flex items-center justify-center shrink-0">
                        {key === 'email' && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        )}
                        {key === 'phone' && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        )}
                        {key === 'linkedin' && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        )}
                        {key === 'github' && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        )}
                      </div>
                      <label className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                        {key}
                      </label>
                    </div>
                    <input
                      type={key === 'email' ? 'email' : 'text'}
                      value={value}
                      onChange={(e) => setContactInfo(prev => ({
                        ...prev,
                        [key]: e.target.value
                      }))}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#887cd0] focus:border-transparent text-sm"
                      placeholder={`Enter your ${key}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Projects Preview */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-linear-to-b from-[#887cd0] to-[#a396e0] rounded-full"></span>
                Projects
              </h3>
              <div className="space-y-3">
                {portfolio.map((project) => (
                  <div
                    key={project.id}
                    className="border-l-4 border-[#887cd0] bg-linear-to-r from-gray-50 to-white rounded-r-lg p-3"
                  >
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900 text-sm">{project.title}</h4>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${
                        project.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        project.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-0.5 bg-white text-gray-600 rounded text-xs border border-gray-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 italic mt-3 text-center">Project editing coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditComponents;
