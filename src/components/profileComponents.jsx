// src/components/profileComponents.jsx
import React, { useState } from 'react';

const ProfileComponents = () => {
  // State for editable sections
  const [bio, setBio] = useState('Computer Science • 2025');
  const [isEditingBio, setIsEditingBio] = useState(false);
  
  const [about, setAbout] = useState('A passionate computer science student with strong interest in AI and machine learning. Currently working on research projects focused on natural language processing and collaborative learning systems.');
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  
  const [contactInfo, setContactInfo] = useState({
    email: 'alice.johnson@university.edu',
    phone: '+1 (555) 123-4567',
    linkedin: 'linkedin.com/in/alicejohnson',
    github: 'github.com/alicejohnson'
  });
  const [isEditingContact, setIsEditingContact] = useState(false);

  // Status badges state
  const [statusBadges, setStatusBadges] = useState([
    { id: 1, text: 'Available for Projects', emoji: '🚀', active: true },
    { id: 2, text: 'Open to Opportunities', emoji: '💼', active: true },
    { id: 3, text: 'Mentoring', emoji: '🤝', active: true }
  ]);
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState({ text: '', emoji: '🚀' });

  // Skills state with recommendations
  const [skills, setSkills] = useState([
    'React', 'JavaScript', 'Python', 'Machine Learning', 'UI/UX Design',
    'Node.js', 'Tailwind CSS', 'Data Analysis', 'Project Management'
  ]);
  const [newSkill, setNewSkill] = useState('');
  const [isEditingSkills, setIsEditingSkills] = useState(false);

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
  const handleBioSave = () => {
    setIsEditingBio(false);
  };

  const handleBioCancel = () => {
    setIsEditingBio(false);
  };

  const handleAboutSave = () => {
    setIsEditingAbout(false);
  };

  const handleContactSave = () => {
    setIsEditingContact(false);
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddSkill();
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
    <div className="min-h-screen bg-gradient-to-br from-[#887cd0] to-[#a396e0] py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
       

        {/* Header Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 transform hover:scale-[1.01] transition-all duration-300 border border-white/20">
          <div className="text-center">
            {/* Profile Avatar */}
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#887cd0] to-[#a396e0] flex items-center justify-center text-white text-4xl font-bold shadow-2xl border-4 border-white">
              AJ
            </div>
            
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Alice Johnson</h1>
            
            {/* Editable Bio */}
            <div className="flex justify-center items-center gap-3 mb-6">
              {isEditingBio ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="text-xl text-gray-600 border-2 border-[#887cd0] rounded-xl px-4 py-2 focus:outline-none focus:border-[#887cd0] focus:ring-2 focus:ring-[#887cd0]/20 transition-all"
                    placeholder="Enter your bio..."
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleBioSave}
                      className="bg-[#887cd0] hover:bg-[#7568b0] text-white px-4 py-2 rounded-xl text-sm transition-all transform hover:scale-105 shadow-lg"
                    >
                      ✓ Save
                    </button>
                    <button
                      onClick={handleBioCancel}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-xl text-sm transition-all transform hover:scale-105 shadow-lg"
                    >
                      ✕ Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <p className="text-xl text-gray-600 font-medium">{bio}</p>
                  <button
                    onClick={() => setIsEditingBio(true)}
                    className="text-[#887cd0] hover:text-[#7568b0] text-sm transition-all transform hover:scale-110 bg-[#887cd0]/10 hover:bg-[#887cd0]/20 p-2 rounded-full"
                    title="Edit Bio"
                  >
                    ✏️
                  </button>
                </div>
              )}
            </div>

            {/* Editable Status Badges */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Status</h3>
                <button
                  onClick={() => setIsEditingStatus(!isEditingStatus)}
                  className="text-[#887cd0] hover:text-[#7568b0] text-sm transition-all transform hover:scale-110 bg-[#887cd0]/10 hover:bg-[#887cd0]/20 p-2 rounded-full"
                  title={isEditingStatus ? "Finish Editing" : "Edit Status"}
                >
                  {isEditingStatus ? '✓ Done' : '✏️'}
                </button>
              </div>

              {/* Add New Status Form */}
              {isEditingStatus && (
                <div className="mb-4 p-4 bg-[#887cd0]/10 rounded-xl">
                  <div className="flex flex-col sm:flex-row gap-2 mb-3">
                    <div className="flex gap-2 flex-1">
                      <select
                        value={newStatus.emoji}
                        onChange={(e) => setNewStatus({...newStatus, emoji: e.target.value})}
                        className="border-2 border-[#887cd0] rounded-xl px-3 focus:outline-none focus:border-[#887cd0] bg-white"
                      >
                        {popularEmojis.map(emoji => (
                          <option key={emoji} value={emoji}>{emoji}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={newStatus.text}
                        onChange={(e) => setNewStatus({...newStatus, text: e.target.value})}
                        className="flex-1 p-2 border-2 border-[#887cd0] rounded-xl focus:outline-none focus:border-[#887cd0]"
                        placeholder="Enter status text..."
                      />
                    </div>
                    <button
                      onClick={addNewStatus}
                      disabled={!newStatus.text.trim()}
                      className="bg-[#887cd0] hover:bg-[#7568b0] disabled:bg-gray-400 text-white px-4 py-2 rounded-xl transition-all"
                    >
                      Add Status
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 text-center">Popular emojis: {popularEmojis.join(' ')}</p>
                </div>
              )}

              {/* Status Badges Display */}
              <div className="flex justify-center gap-3 flex-wrap">
                {statusBadges.map((badge) => (
                  <div key={badge.id} className="relative group">
                    {isEditingStatus ? (
                      <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30 shadow-lg">
                        {/* Toggle Active */}
                        <button
                          onClick={() => toggleStatusActive(badge.id)}
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                            badge.active ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                          }`}
                          title={badge.active ? "Active - Click to disable" : "Inactive - Click to enable"}
                        >
                          {badge.active ? '✓' : '✕'}
                        </button>
                        
                        {/* Emoji Select */}
                        <select
                          value={badge.emoji}
                          onChange={(e) => updateStatusEmoji(badge.id, e.target.value)}
                          className="bg-transparent border-none focus:outline-none"
                        >
                          {popularEmojis.map(emoji => (
                            <option key={emoji} value={emoji}>{emoji}</option>
                          ))}
                        </select>
                        
                        {/* Text Input */}
                        <input
                          type="text"
                          value={badge.text}
                          onChange={(e) => updateStatusText(badge.id, e.target.value)}
                          className="bg-transparent border-none focus:outline-none text-sm font-semibold text-[#887cd0] min-w-[120px]"
                        />
                        
                        {/* Remove Button */}
                        <button
                          onClick={() => removeStatus(badge.id)}
                          className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                          title="Remove status"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <span 
                        onClick={() => isEditingStatus && toggleStatusActive(badge.id)}
                        className={`px-6 py-3 rounded-full text-sm font-semibold shadow-lg transform transition-all cursor-pointer backdrop-blur-sm border ${
                          badge.active 
                            ? 'bg-white/80 text-[#887cd0] border-white/30 hover:scale-105' 
                            : 'bg-gray-300/50 text-gray-500 border-gray-300/50 line-through'
                        }`}
                        title={badge.active ? "Click to edit (enable editing first)" : "Inactive - Enable editing to modify"}
                      >
                        {badge.emoji} {badge.text}
                      </span>
                    )}
                  </div>
                ))}
                
                {statusBadges.length === 0 && (
                  <p className="text-gray-500 italic text-sm">No status badges added. Click edit to add some!</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Rest of the component remains the same */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - About and Contact sections */}
          <div className="space-y-8">
            {/* About Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 transform hover:scale-[1.01] transition-all duration-300 border border-white/20">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="bg-[#887cd0]/10 text-[#887cd0] p-2 rounded-lg">📖</span>
                  About Me
                </h2>
                <button
                  onClick={() => setIsEditingAbout(!isEditingAbout)}
                  className="text-[#887cd0] hover:text-[#7568b0] text-sm transition-all transform hover:scale-110 bg-[#887cd0]/10 hover:bg-[#887cd0]/20 p-2 rounded-full"
                  title={isEditingAbout ? "Cancel Editing" : "Edit About"}
                >
                  {isEditingAbout ? '✕' : '✏️'}
                </button>
              </div>
              
              {isEditingAbout ? (
                <div className="space-y-4">
                  <textarea
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    rows="5"
                    className="w-full p-4 border-2 border-[#887cd0] rounded-xl focus:outline-none focus:border-[#887cd0] focus:ring-2 focus:ring-[#887cd0]/20 resize-vertical transition-all"
                    placeholder="Tell your story..."
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleAboutSave}
                      className="bg-[#887cd0] hover:bg-[#7568b0] text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg flex-1"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditingAbout(false)}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600 leading-7 text-lg">{about}</p>
              )}
            </div>

            {/* Contact Information */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 transform hover:scale-[1.01] transition-all duration-300 border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="bg-[#887cd0]/10 text-[#887cd0] p-2 rounded-lg">📞</span>
                  Contact Information
                </h2>
                <button
                  onClick={() => setIsEditingContact(!isEditingContact)}
                  className="text-[#887cd0] hover:text-[#7568b0] text-sm transition-all transform hover:scale-110 bg-[#887cd0]/10 hover:bg-[#887cd0]/20 p-2 rounded-full"
                  title={isEditingContact ? "Cancel Editing" : "Edit Contact"}
                >
                  {isEditingContact ? '✕' : '✏️'}
                </button>
              </div>
              
              {isEditingContact ? (
                <div className="space-y-4">
                  {Object.entries(contactInfo).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-gray-700 mb-2 font-semibold capitalize">
                        {key}
                      </label>
                      <input
                        type={key === 'email' ? 'email' : 'text'}
                        value={value}
                        onChange={(e) => setContactInfo(prev => ({
                          ...prev,
                          [key]: e.target.value
                        }))}
                        className="w-full p-3 border-2 border-[#887cd0] rounded-xl focus:outline-none focus:border-[#887cd0] focus:ring-2 focus:ring-[#887cd0]/20 transition-all"
                        placeholder={`Enter your ${key}`}
                      />
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <button
                      onClick={handleContactSave}
                      className="bg-[#887cd0] hover:bg-[#7568b0] text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg flex-1"
                    >
                      Save Contact Info
                    </button>
                    <button
                      onClick={() => setIsEditingContact(false)}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.entries(contactInfo).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-4 p-3 hover:bg-[#887cd0]/5 rounded-xl transition-all">
                      <span className="text-2xl text-[#887cd0]">
                        {key === 'email' ? '📧' : key === 'phone' ? '📱' : key === 'linkedin' ? '💼' : '🐙'}
                      </span>
                      <div className="flex-1">
                        <span className="text-gray-700 font-semibold capitalize">{key}:</span>
                        <span className="text-gray-600 ml-2 break-all">{value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Skills and Portfolio sections */}
          <div className="space-y-8">
            {/* Skills Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 transform hover:scale-[1.01] transition-all duration-300 border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="bg-[#887cd0]/10 text-[#887cd0] p-2 rounded-lg">⚡</span>
                  Skills & Technologies
                </h2>
                <button
                  onClick={() => setIsEditingSkills(!isEditingSkills)}
                  className="text-[#887cd0] hover:text-[#7568b0] text-sm transition-all transform hover:scale-110 bg-[#887cd0]/10 hover:bg-[#887cd0]/20 p-2 rounded-full"
                  title={isEditingSkills ? "Finish Editing" : "Edit Skills"}
                >
                  {isEditingSkills ? '✓ Done' : '✏️'}
                </button>
              </div>

              {isEditingSkills && (
                <div className="space-y-4 mb-4 p-4 bg-[#887cd0]/5 rounded-xl">
                  {/* Add Skill Input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 p-3 border-2 border-[#887cd0] rounded-xl focus:outline-none focus:border-[#887cd0] focus:ring-2 focus:ring-[#887cd0]/20 transition-all"
                      placeholder="Add a new skill..."
                    />
                    <button
                      onClick={handleAddSkill}
                      disabled={!newSkill.trim()}
                      className="bg-[#887cd0] hover:bg-[#7568b0] disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
                    >
                      Add
                    </button>
                  </div>

                  {/* Skill Recommendations */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Recommended Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {skillRecommendations.map((skill) => (
                        <button
                          key={skill}
                          onClick={() => handleAddRecommendedSkill(skill)}
                          disabled={skills.includes(skill)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 ${
                            skills.includes(skill)
                              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              : 'bg-[#887cd0] text-white shadow-md hover:bg-[#7568b0] hover:shadow-lg'
                          }`}
                        >
                          + {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Skills Display */}
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <div
                    key={skill}
                    className="group relative"
                  >
                    <span className="bg-[#887cd0] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg transition-all transform group-hover:scale-105 group-hover:bg-[#7568b0]">
                      {skill}
                    </span>
                    {isEditingSkills && (
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center shadow-lg transform hover:scale-110 transition-all"
                        title={`Remove ${skill}`}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                {skills.length === 0 && (
                  <p className="text-gray-500 italic">No skills added yet. Click edit to add some!</p>
                )}
              </div>
            </div>

            {/* Portfolio Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 transform hover:scale-[1.01] transition-all duration-300 border border-white/20">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="bg-[#887cd0]/10 text-[#887cd0] p-2 rounded-lg">💼</span>
                Featured Projects
              </h2>
              
              <div className="space-y-4">
                {portfolio.map((project) => (
                  <div
                    key={project.id}
                    className="border-2 border-white/30 rounded-xl p-4 hover:border-[#887cd0] hover:shadow-lg transition-all duration-300 group cursor-pointer bg-white/50 backdrop-blur-sm"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#887cd0] transition-colors">
                        {project.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        project.status === 'Completed' ? 'bg-green-100 text-green-600' :
                        project.status === 'In Progress' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-[#887cd0]/10 text-[#887cd0]'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-[#887cd0]/10 text-[#887cd0] px-2 py-1 rounded text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
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