export default function HomeComponents() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#887cd0] to-[#a396e0] py-8 relative">
      {/* Top Left Box */}
      <div className="absolute top-8 left-8 z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-4 border border-white/20 flex justify-start items-center">
          {/* Profile Avatar */}
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#887cd0] to-[#a396e0] flex items-center justify-center text-white text-4xl font-bold shadow-2xl border-4 border-white">
            AJ
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-10">  Alice Johnson</h3>
        </div>
      </div>
      {/* Search Bar - Centered at the top */}
      <div className="flex justify-center mt-8 mb-12">
        <input
          type="text"
          placeholder="Search profiles, skills, or topics..."
          className="w-full max-w-md px-5 py-3 rounded-xl shadow-lg border border-white/30 bg-white/80 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#887cd0] transition"
        />
      </div>
      {/* News Card - Top Right */}
      <div className="absolute top-8 right-8 z-10 w-100">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">News</h2>
          <ul className="space-y-3">
            <li className="text-gray-700">
              <span className="font-semibold">SkillSync</span> launches new AI-powered matching!
            </li>
            <li className="text-gray-700">
              <span className="font-semibold">Update:</span> Profile badges now available.
            </li>
            <li className="text-gray-700">
              <span className="font-semibold">Event:</span> Webinar on June 20th.
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 transform hover:scale-[1.01] transition-all duration-300 border border-white/20">
          <div className="text-center">
            {/* Profile Avatar */}
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#FF0000] to-[#f75e5e] flex items-center justify-center text-white text-4xl font-bold shadow-2xl border-4 border-white">
              GW
            </div>

            <h1 className="text-4xl font-bold text-gray-800 mb-2">George Washington</h1>
          </div>
          <div className="flex justify-center">
            <button
              className="mt-4 px-6 py-2 bg-[#887cd0] hover:bg-[#a396e0] text-white font-semibold rounded-lg shadow transition-colors duration-200"
              type="button"
            >
              Connect
            </button>
          </div>
        </div>
      </div>
       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 transform hover:scale-[1.01] transition-all duration-300 border border-white/20">
          <div className="text-center">
            {/* Profile Avatar */}
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#0eb03c] to-[#51b56e] flex items-center justify-center text-white text-4xl font-bold shadow-2xl border-4 border-white">
              TH
            </div>

            <h1 className="text-4xl font-bold text-gray-800 mb-2">Tageshi Hongo</h1>
          </div>
          <div className="flex justify-center">
            <button
              className="mt-4 px-6 py-2 bg-[#887cd0] hover:bg-[#a396e0] text-white font-semibold rounded-lg shadow transition-colors duration-200"
              type="button"
            >
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}