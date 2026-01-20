// src/components/profileComponents.jsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfileComponents = () => {
  const navigate = useNavigate();
  const { user, profilePhotoURL, photoLoading, profileData: firestoreProfile, profileLoading } = useAuth();

  // Use Firestore data if available, otherwise use defaults
  const profileData = {
    name: firestoreProfile?.name || user?.displayName || 'User',
    initials: (firestoreProfile?.name || user?.displayName || 'U').split(' ').map(n => n[0]).join(''),
    photoURL: profilePhotoURL || null,
    bio: firestoreProfile?.bio || '',
    about: firestoreProfile?.about || '',
    contactInfo: {
      email: firestoreProfile?.contactInfo?.email || user?.email || '',
      phone: firestoreProfile?.contactInfo?.phone || '',
      linkedin: firestoreProfile?.contactInfo?.linkedin || '',
      github: firestoreProfile?.contactInfo?.github || ''
    },
    skills: firestoreProfile?.skills || [],
    portfolio: firestoreProfile?.portfolio || []
  };

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#887cd0] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8"
    style={{
        background: "linear-gradient(180deg,rgb(255, 255, 255) 50%, #887cd0 100%)"
      }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Profile</h1>
          <button
            onClick={handleEditProfile}
            className="bg-[#887cd0] hover:bg-[#a396e0] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium transition-colors text-sm sm:text-base w-full sm:w-auto"
          >
            Edit Profile
          </button>
        </div>

        {/* Main Profile Card - Hero Section */}
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
              ) : profileData.photoURL ? (
                <img
                  src={profileData.photoURL}
                  alt={profileData.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-[#887cd0]/20"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-linear-to-br from-[#887cd0] to-[#a396e0] flex items-center justify-center text-white text-4xl font-bold border-4 border-[#887cd0]/20">
                  {profileData.initials}
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-5xl font-bold text-gray-900 mb-8">{profileData.name}</h2>
              <p className="text-lg text-gray-600 mb-4">{profileData.bio}</p>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* About & Skills Combined */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-linear-to-b from-[#887cd0] to-[#a396e0] rounded-full"></span>
                About Me
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">{profileData.about}</p>

              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 mt-6">
                <span className="w-1 h-6 bg-linear-to-b from-[#887cd0] to-[#a396e0] rounded-full"></span>
                Skills & Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-linear-to-r from-gray-100 to-gray-50 text-gray-800 rounded-lg text-sm font-medium hover:from-[#887cd0]/10 hover:to-[#a396e0]/10 transition-all border border-gray-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Featured Projects */}
            <div className="w-304 bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-linear-to-b from-[#887cd0] to-[#a396e0] rounded-full"></span>
                Featured Projects
              </h3>
              <div className="space-y-4">
                {profileData.portfolio.map((project) => (
                  <div
                    key={project.id}
                    className="border-l-4 border-[#887cd0] bg-linear-to-r from-gray-50 to-white rounded-r-lg p-4 hover:shadow-md transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                      <h4 className="font-bold text-gray-900 text-base">{project.title}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap self-start ${
                        project.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        project.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 italic">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-white text-gray-700 rounded-md text-xs font-medium border border-gray-200"
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

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-linear-to-b from-[#887cd0] to-[#a396e0] rounded-full"></span>
                Contact
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-linear-to-br from-[#887cd0] to-[#a396e0] rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Email</p>
                    <p className="text-sm text-gray-900 break-all">{profileData.contactInfo.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-linear-to-br from-[#887cd0] to-[#a396e0] rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Phone</p>
                    <p className="text-sm text-gray-900">{profileData.contactInfo.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-linear-to-br from-[#887cd0] to-[#a396e0] rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">LinkedIn</p>
                    <p className="text-sm text-[#3b5998] break-all hover:underline cursor-pointer">{profileData.contactInfo.linkedin}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-linear-to-br from-[#887cd0] to-[#a396e0] rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">GitHub</p>
                    <p className="text-sm text-[#3b5998] break-all hover:underline cursor-pointer">{profileData.contactInfo.github}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponents;
