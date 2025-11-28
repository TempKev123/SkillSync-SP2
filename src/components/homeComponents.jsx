import { useState } from 'react';

export default function HomeComponents() {
  const [activeTab, setActiveTab] = useState('projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPostModal, setShowPostModal] = useState(false);

  // Mock project data
  const projects = [
    {
      id: 1,
      title: 'AI-Powered Learning Platform',
      description: 'Building an intelligent tutoring system using machine learning to provide personalized education.',
      author: 'Sarah Chen',
      skills: ['Python', 'TensorFlow', 'React'],
      lookingFor: ['Backend Developer', 'UI/UX Designer'],
      posted: '2 days ago'
    },
    {
      id: 2,
      title: 'Mobile Health Tracker',
      description: 'Cross-platform mobile app for tracking fitness goals and nutrition with community features.',
      author: 'Michael Rodriguez',
      skills: ['React Native', 'Node.js', 'MongoDB'],
      lookingFor: ['Mobile Developer', 'Data Scientist'],
      posted: '5 days ago'
    },
    {
      id: 3,
      title: 'Blockchain Voting System',
      description: 'Secure, transparent voting platform using blockchain technology for student organizations.',
      author: 'Emily Watson',
      skills: ['Solidity', 'Web3.js', 'Next.js'],
      lookingFor: ['Blockchain Developer', 'Security Expert'],
      posted: '1 week ago'
    }
  ];

  // Mock collaboration matches
  const collaborators = [
    {
      id: 1,
      name: 'Alex Johnson',
      initials: 'AJ',
      skills: ['JavaScript', 'Python', 'UI/UX'],
      matchScore: 95,
      interests: ['AI', 'Web Development']
    },
    {
      id: 2,
      name: 'Jordan Lee',
      initials: 'JL',
      skills: ['Java', 'Spring Boot', 'Docker'],
      matchScore: 88,
      interests: ['Cloud Computing', 'DevOps']
    },
    {
      id: 3,
      name: 'Sam Taylor',
      initials: 'ST',
      skills: ['React', 'Node.js', 'GraphQL'],
      matchScore: 82,
      interests: ['Full Stack', 'Startups']
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-r from-white to-purple-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Bar and Create Button */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, skills, or collaborators..."
              className="w-full px-5 py-3 pr-12 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#887cd0] focus:border-transparent shadow-sm"
            />
          </div>
          <button
            onClick={() => setShowPostModal(true)}
            className="bg-[#887cd0] hover:bg-[#a396e0] text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm whitespace-nowrap"
          >
            Post
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('projects')}
              className={`pb-3 px-1 font-medium transition-colors relative ${
                activeTab === 'projects'
                  ? 'text-[#887cd0]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Projects
              {activeTab === 'projects' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#887cd0]"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('collaborators')}
              className={`pb-3 px-1 font-medium transition-colors relative ${
                activeTab === 'collaborators'
                  ? 'text-[#887cd0]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Find Collaborators
              {activeTab === 'collaborators' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#887cd0]"></div>
              )}
            </button>
          </div>
        </div>

        
        {/* Content Area */}
          {activeTab === 'projects' ? (
            <div className="grid grid-cols-1 gap-6 drop-shadow-lg">
              {projects.map((project) => (
                <div
            key={project.id}
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
              <span className="text-sm text-gray-500">{project.posted}</span>
            </div>
            <p className="text-gray-600 mb-4 italic">{project.description}</p>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Tech Stack:</p>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill, idx) => (
                  <span
              key={idx}
              className="px-3 py-1 bg-purple-50 text-[#887cd0] rounded-md text-sm font-medium"
                  >
              {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Looking for:</p>
              <div className="flex flex-wrap gap-2">
                {project.lookingFor.map((role, idx) => (
                  <span
              key={idx}
              className="px-3 py-1 bg-green-50 text-green-700 rounded-md text-sm font-medium"
                  >
              {role}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-sm text-gray-600 ">
                Posted by <span className="font-bold">{project.author}</span>
                </span>
              <button className="bg-[#887cd0] hover:bg-[#a396e0] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Apply to Join
              </button>
            </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 drop-shadow-lg">
              {collaborators.map((collaborator) => (
                <div
            key={collaborator.id}
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-linear-to-r from-[#887cd0] to-[#a396e0] flex items-center justify-center text-white text-2xl font-bold mb-4">
                {collaborator.initials}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{collaborator.name}</h3>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-medium text-[#887cd0]">{collaborator.matchScore}% Match</span>
              </div>

              <div className="w-full mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {collaborator.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
              >
                {skill}
              </span>
                  ))}
                </div>
              </div>

              <div className="w-full mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Interests:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {collaborator.interests.map((interest, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-purple-50 text-[#887cd0] rounded text-xs"
              >
                {interest}
              </span>
                  ))}
                </div>
              </div>

              <button className="w-full bg-[#887cd0] hover:bg-[#a396e0] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Connect
              </button>
            </div>
                </div>
              ))}
            </div>
          )}
              </div>

              {/* Post Project Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Post a New Project</h2>
                <button
                  onClick={() => setShowPostModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  placeholder="Enter your project title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#887cd0]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows="4"
                  placeholder="Describe your project and what you're looking to build..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#887cd0] resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g., React, Node.js, MongoDB"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#887cd0]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Looking For (roles needed)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Frontend Developer, UI Designer"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#887cd0]"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowPostModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle post submission
                    setShowPostModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-[#887cd0] hover:bg-[#a396e0] text-white rounded-lg transition-colors"
                >
                  Post Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}