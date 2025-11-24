// src/components/ProfileEditComponents.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfileEditComponents = () => {
  const navigate = useNavigate();
  const { user, profilePhotoURL } = useAuth();

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

  // Load user data from Microsoft account when component mounts
  useEffect(() => {
    if (user) {
      // Set name from Microsoft account
      if (user.displayName) {
        setName(user.displayName);
      }

      // Set email from Microsoft account
      if (user.email) {
        setContactInfo(prev => ({
          ...prev,
          email: user.email
        }));
      }
    }
  }, [user]);

  // Status badges state
  const [statusBadges, setStatusBadges] = useState([
    { id: 1, text: 'Available for Projects', emoji: '🚀', active: true },
    { id: 2, text: 'Open to Opportunities', emoji: '💼', active: true },
    { id: 3, text: 'Mentoring', emoji: '🤝', active: true }
  ]);
  const [newStatus, setNewStatus] = useState({ text: '', emoji: '🚀' });

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
  const [portfolio] = useState([
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
  const handleSaveProfile = () => {
    console.log('Profile saved:', { name, bio, about, contactInfo, statusBadges, skills, portfolio });
    alert('Profile updated successfully!');
    navigate('/profile');
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

  // Status badge handlers
  const toggleStatusActive = (id) => {
    setStatusBadges(statusBadges.map(badge =>
      badge.id === id ? { ...badge, active: !badge.active } : badge
    ));
  };

  const updateStatusText = (id, newText) => {
    setStatusBadges(statusBadges.map(badge =>
      badge.id === id ? { ...badge, text: newText } : badge
    ));
  };

  const updateStatusEmoji = (id, newEmoji) => {
    setStatusBadges(statusBadges.map(badge =>
      badge.id === id ? { ...badge, emoji: newEmoji } : badge
    ));
  };

  const removeStatus = (id) => {
    setStatusBadges(statusBadges.filter(badge => badge.id !== id));
  };

  const addNewStatus = () => {
    if (newStatus.text.trim()) {
      const newId = Math.max(...statusBadges.map(b => b.id), 0) + 1;
      setStatusBadges([...statusBadges, { ...newStatus, id: newId, active: true }]);
      setNewStatus({ text: '', emoji: '🚀' });
    }
  };

  const popularEmojis = ['🚀', '💼', '🤝', '💡', '🌟', '🔥', '🎯', '📈', '👨‍💻', '👩‍💻', '🔍', '📚', '🎓', '🏆', '⭐'];

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">

        {/* Header with Save/Cancel Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Edit My Profile</h1>
          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={handleCancel}
              className="flex-1 sm:flex-none border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium transition-colors text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProfile}
              className="flex-1 sm:flex-none bg-[#3b5998] hover:bg-[#2d4373] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium transition-colors text-sm sm:text-base"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Main Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Left Column */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Profile Image */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Profile Image</label>
              <div className="flex flex-col items-center">
                {profilePhotoURL ? (
                  <img
                    src={profilePhotoURL}
                    alt={name}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover mb-3"
                  />
                ) : (
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-r from-[#887cd0] to-[#a396e0] flex items-center justify-center text-white text-3xl sm:text-4xl font-bold mb-3">
                    {name.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
                <p className="text-xs text-gray-500 text-center">
                  Profile photo from Microsoft account
                </p>
              </div>
            </div>

            {/* Full Name */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                placeholder="Enter your full name"
              />
            </div>

            {/* Bio */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
              <input
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                placeholder="e.g., Computer Science • 2025"
              />
            </div>

            {/* About */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">About Me</label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                rows="4"
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm sm:text-base"
                placeholder="Tell your story..."
              />
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                {Object.entries(contactInfo).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                      {key}
                    </label>
                    <input
                      type={key === 'email' ? 'email' : 'text'}
                      value={value}
                      onChange={(e) => setContactInfo(prev => ({
                        ...prev,
                        [key]: e.target.value
                      }))}
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      placeholder={`Enter your ${key}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Status Badges */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Status Badges</h3>

              {/* Add New Status */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex gap-2 mb-2">
                  <select
                    value={newStatus.emoji}
                    onChange={(e) => setNewStatus({...newStatus, emoji: e.target.value})}
                    className="border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    {popularEmojis.map(emoji => (
                      <option key={emoji} value={emoji}>{emoji}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={newStatus.text}
                    onChange={(e) => setNewStatus({...newStatus, text: e.target.value})}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Enter status text..."
                  />
                </div>
                <button
                  onClick={addNewStatus}
                  disabled={!newStatus.text.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  Add Status
                </button>
              </div>

              {/* Status Badges List */}
              <div className="space-y-2">
                {statusBadges.map((badge) => (
                  <div key={badge.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <button
                      onClick={() => toggleStatusActive(badge.id)}
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${
                        badge.active ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                      }`}
                    >
                      {badge.active ? '✓' : '✕'}
                    </button>

                    <select
                      value={badge.emoji}
                      onChange={(e) => updateStatusEmoji(badge.id, e.target.value)}
                      className="border-none bg-transparent focus:outline-none text-sm shrink-0"
                    >
                      {popularEmojis.map(emoji => (
                        <option key={emoji} value={emoji}>{emoji}</option>
                      ))}
                    </select>

                    <input
                      type="text"
                      value={badge.text}
                      onChange={(e) => updateStatusText(badge.id, e.target.value)}
                      className="flex-1 bg-transparent border-none focus:outline-none text-sm"
                    />

                    <button
                      onClick={() => removeStatus(badge.id)}
                      className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 shrink-0"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {statusBadges.length === 0 && (
                  <p className="text-gray-500 italic text-sm text-center py-4">No status badges added.</p>
                )}
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Skills & Technologies</h3>

              {/* Add Skill */}
              <div className="mb-4">
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Add a new skill..."
                  />
                  <button
                    onClick={handleAddSkill}
                    disabled={!newSkill.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
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
                        className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                          skills.includes(skill)
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
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
                    <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md text-sm font-medium">
                      {skill}
                    </span>
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center hover:bg-red-600"
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

            {/* Portfolio Section */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Featured Projects</h3>
              <div className="space-y-3">
                {portfolio.map((project) => (
                  <div
                    key={project.id}
                    className="border border-gray-200 rounded-lg p-3"
                  >
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900 text-sm">{project.title}</h4>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
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
                          className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 italic mt-3">Project editing coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditComponents;
