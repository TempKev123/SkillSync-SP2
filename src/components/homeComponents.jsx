import { useState } from 'react';

export default function HomeComponents() {
  const [activeTab, setActiveTab] = useState('projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPostModal, setShowPostModal] = useState(false);

  // Mock data (Keeping your original data)
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
    <div
      className="min-h-screen pb-20 transition-all duration-500"
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #ffffff 60%, #887cd0 100%)"
      }}
    >
      {/* Search & Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <div className="w-full flex-1 group relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, skills, or people..."
              className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-md focus:outline-none focus:ring-4 focus:ring-[#887cd0]/20 focus:border-[#887cd0] shadow-xl shadow-gray-200/50 transition-all text-gray-700"
            />
          </div>
          <button
            onClick={() => setShowPostModal(true)}
            className="w-full sm:w-auto bg-gradient-to-br from-[#887cd0] to-[#6b5eb3] hover:from-[#a396e0] hover:to-[#887cd0] text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-lg hover:shadow-purple-300 active:scale-95"
          >
            + Post Project
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex flex-col lg:flex-row gap-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Content */}
        <div className="flex-1 w-full order-2 lg:order-1">
          
          {/* Navigation Tabs */}
          <div className="mb-8 border-b border-gray-100 overflow-x-auto scrollbar-hide">
            <div className="flex gap-8 whitespace-nowrap">
              {['projects', 'collaborators'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-2 font-bold text-sm uppercase tracking-widest transition-all relative ${
                    activeTab === tab ? 'text-[#887cd0]' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {tab === 'projects' ? 'Active Projects' : 'Potential Matches'}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#887cd0] rounded-t-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Content Area */}
          <div className="transition-all duration-300">
            {activeTab === 'projects' ? (
              <div className="grid grid-cols-1 gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="group bg-white rounded-3xl p-6 sm:p-8 border border-gray-50 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
                      <h3 className="text-xl sm:text-2xl font-black text-gray-900 group-hover:text-[#887cd0] transition-colors">
                        {project.title}
                      </h3>
                      <span className="px-3 py-1 bg-gray-50 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {project.posted}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-6 italic text-sm sm:text-lg leading-relaxed">
                      "{project.description}"
                    </p>

                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map((skill, idx) => (
                          <span key={idx} className="px-3 py-1.5 bg-purple-50 text-[#887cd0] rounded-xl text-xs font-bold border border-purple-100/50">
                            #{skill}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.lookingFor.map((role, idx) => (
                          <span key={idx} className="px-3 py-1.5 bg-green-50 text-green-700 rounded-xl text-xs font-bold border border-green-100/50">
                            Searching: {role}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between mt-8 pt-6 border-t border-gray-50 gap-4">
                      <div className="flex items-center gap-3 self-start">
                        <div className="w-8 h-8 rounded-full bg-gray-200" />
                        <span className="text-sm font-medium text-gray-500">
                          Curated by <span className="font-bold text-gray-900">{project.author}</span>
                        </span>
                      </div>
                      <button className="w-full sm:w-auto bg-gray-900 hover:bg-[#887cd0] text-white px-8 py-3 rounded-xl text-sm font-black transition-all active:scale-95">
                        Apply to Join
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {collaborators.map((collaborator) => (
                  <div
                    key={collaborator.id}
                    className="bg-white rounded-3xl p-8 border border-gray-50 shadow-sm hover:shadow-xl transition-all text-center"
                  >
                    <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-[#887cd0] to-[#ffb199] flex items-center justify-center text-white text-3xl font-black mb-4 shadow-lg rotate-3 hover:rotate-0 transition-transform">
                      {collaborator.initials}
                    </div>
                    <h3 className="text-xl font-black text-gray-900">{collaborator.name}</h3>
                    <div className="mt-2 text-[#887cd0] font-black text-sm tracking-tighter">
                      {collaborator.matchScore}% COMPATIBILITY
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2 justify-center">
                      {collaborator.skills.map((skill, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-50 text-gray-500 rounded-lg text-[10px] font-bold uppercase border border-gray-100">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <button className="w-full mt-8 bg-[#887cd0] hover:bg-gray-900 text-white py-4 rounded-2xl font-black transition-all shadow-md active:scale-95">
                      Send Invite
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 order-1 lg:order-2">
          <div className="bg-white/90 backdrop-blur-xl border border-white rounded-[2rem] p-8 shadow-2xl lg:sticky lg:top-8">
            <h3 className="text-xs font-black text-[#887cd0] mb-6 tracking-[0.3em] uppercase">Community News</h3>
            <ul className="space-y-6">
              {[
                { icon: '🚀', text: 'V2.0 Core update is live' },
                { icon: '🔒', text: 'New privacy settings active' },
                { icon: '🏆', text: 'Hackathon winners listed' }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 group cursor-pointer">
                  <span className="text-2xl group-hover:scale-125 transition-transform">{item.icon}</span>
                  <p className="text-sm font-bold text-gray-600 group-hover:text-gray-900 transition-colors leading-tight">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Modal with Animation */}
      {showPostModal && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">Post Project</h2>
              <button onClick={() => setShowPostModal(false)} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors">
                ✕
              </button>
            </div>

            <div className="p-8 space-y-6 overflow-y-auto">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Title</label>
                <input type="text" className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-4 focus:ring-[#887cd0]/10 transition-all font-medium" />
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Description</label>
                <textarea rows="4" className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-4 focus:ring-[#887cd0]/10 transition-all font-medium resize-none" />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => setShowPostModal(false)} className="flex-1 py-4 font-black text-gray-400 hover:text-gray-600 transition-colors">
                  Discard
                </button>
                <button onClick={() => setShowPostModal(false)} className="flex-1 bg-[#887cd0] text-white py-4 rounded-2xl font-black shadow-xl shadow-purple-200 active:scale-95 transition-all">
                  Launch Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}