// src/components/profileComponents.jsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfileComponents = () => {
  const navigate = useNavigate();
  const { user, profilePhotoURL } = useAuth();

  // Mock data - in a real app, this would come from props or a context/store
  const profileData = {
    name: user?.displayName || 'User',
    initials: user?.displayName?.split(' ').map(n => n[0]).join('') || 'U',
    photoURL: profilePhotoURL || null,
    bio: 'Computer Science • 2025',
    about: 'A passionate computer science student with strong interest in AI and machine learning. Currently working on research projects focused on natural language processing and collaborative learning systems.',
    contactInfo: {
      email: user?.email || '',
      phone: '+1 (555) 123-4567',
      linkedin: 'linkedin.com/in/alicejohnson',
      github: 'github.com/alicejohnson'
    },
    statusBadges: [
      { id: 1, text: 'Available for Projects', emoji: '🚀', active: true },
      { id: 2, text: 'Open to Opportunities', emoji: '💼', active: true },
      { id: 3, text: 'Mentoring', emoji: '🤝', active: true }
    ],
    skills: [
      'React', 'JavaScript', 'Python', 'Machine Learning', 'UI/UX Design',
      'Node.js', 'Tailwind CSS', 'Data Analysis', 'Project Management'
    ],
    portfolio: [
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
    ]
  };

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Profile</h1>
          <button
            onClick={handleEditProfile}
            className="bg-[#3b5998] hover:bg-[#2d4373] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium transition-colors text-sm sm:text-base w-full sm:w-auto"
          >
            Edit Profile
          </button>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Left: Avatar and Basic Info */}
            <div className="flex flex-col sm:flex-row md:flex-col items-center sm:items-start md:items-center gap-4">
              {profileData.photoURL ? (
                <img
                  src={profileData.photoURL}
                  alt={profileData.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-linear-to-r from-[#887cd0] to-[#a396e0] flex items-center justify-center text-white text-3xl sm:text-4xl font-bold flex-shrink-0">
                  {profileData.initials}
                </div>
              )}
              <div className="text-center sm:text-left md:text-center">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{profileData.name}</h2>
                <p className="text-sm sm:text-base text-gray-600">{profileData.bio}</p>
              </div>
            </div>

            {/* Middle: Status Badges */}
            <div className="md:col-span-2 flex flex-wrap gap-2 sm:gap-3 items-start content-start">
              {profileData.statusBadges
                .filter(badge => badge.active)
                .map((badge) => (
                  <span
                    key={badge.id}
                    className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm font-medium"
                  >
                    <span>{badge.emoji}</span>
                    <span>{badge.text}</span>
                  </span>
                ))}
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* About Section */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">About Me</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{profileData.about}</p>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Contact Information</h3>
            <div className="space-y-3">
              {Object.entries(profileData.contactInfo).map(([key, value]) => (
                <div key={key} className="flex items-start gap-2 sm:gap-3">
                  <span className="text-gray-700 font-medium capitalize text-sm sm:text-base min-w-[80px] sm:min-w-[100px]">{key}:</span>
                  <span className="text-gray-600 text-sm sm:text-base break-all">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Section */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Skills & Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {profileData.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-xs sm:text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Portfolio Section */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Featured Projects</h3>
            <div className="space-y-3">
              {profileData.portfolio.map((project) => (
                <div
                  key={project.id}
                  className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:border-gray-300 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{project.title}</h4>
                    <span className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-xs font-medium whitespace-nowrap self-start ${
                      project.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      project.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2">{project.description}</p>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponents;
