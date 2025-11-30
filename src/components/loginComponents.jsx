import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CyclingBackground from './cyclingbackground'; 

export default function LoginComponent() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signInWithMicrosoft } = useAuth();
  const navigate = useNavigate();

  const handleMicrosoftSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      await signInWithMicrosoft();
      navigate('/home');
    } catch (err) {
      setError('Failed to sign in with Microsoft. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Custom colors for branding:
  const primaryColor = '#887cb0'; // Muted Purple/Mauve (Main Brand Color)
  const lightAccent = '#a395cc'; // Lighter shade (Used for links/accents)
  
  // Tailwind color classes for custom hex codes:
  const primaryColorClass = `[#887cb0]`;
  const lightAccentClass = `[#a395cc]`;

  return (
    <div className="app-container relative min-h-screen overflow-hidden">
      
      {/* 1. The CyclingBackground component (Bottom Layer) */}
      <CyclingBackground />

      {/* 2. Background Dimming Layer (Opacity 20 for better visibility) */}
      <div className="absolute inset-0 bg-black opacity-20 z-[5]"></div> 

      {/* 3. Main Content Container (Top Layer) */}
      <div className='min-h-screen flex flex-col lg:flex-row items-center justify-center p-8 z-10 relative space-y-16 lg:space-y-0 lg:space-x-24'>
        
        {/* --- LEFT SIDE: Brand and Value Proposition --- */}
        <div className="hidden lg:block w-full max-w-lg text-white">
          <header className="mb-8">
            <h1 className="text-7xl font-bold tracking-tight mb-2 drop-shadow-md text-white">
              SkillSync
            </h1>
            <p className="text-xl font-light opacity-80 border-t border-white/30 pt-2">
              The professional network built for students.
            </p>
          </header>

          <main className="space-y-6">
            <h2 className="text-4xl font-extrabold leading-snug drop-shadow-md text-white">
              Enhance your Skills,
              <br />
              Sync your Success
            </h2>
            
            {/* Clean marketing text block with subtle color accent */}
            <div className={`border-l-4 border-${primaryColorClass} pl-4 pt-1 max-w-md`}>
                <p className="text-lg font-normal text-white/90">
                  A web-based networking platform that connects university students with complementary skills for academic project collaborations                </p>
            </div>
          </main>
        </div>


        {/* --- RIGHT SIDE: Login Card (High-Contrast & Branded) --- */}
        <div className='w-full max-w-sm'>
          
          {/* Mobile Header (Hidden on large screens) */}
          <div className="text-center mb-10 lg:hidden">
            <h1 className="text-4xl font-extrabold text-white tracking-normal drop-shadow-md">
              SkillSync
            </h1>
            <p className="text-white/80 text-lg font-light mt-1">
              The professional network built for students.
            </p>
          </div>
          
          
          {/* Login Card Container */}
          <div className={`bg-white/5 backdrop-blur-3xl border-2 border-white/20 rounded-xl shadow-2xl p-10 transform transition-transform duration-500 hover:shadow-3xl hover:border-${lightAccentClass}`}>
            
            <h2 className={`text-3xl font-bold text-white text-center mb-1`}>
              Ready to Connect?
            </h2>
            <p className='text-white/70 text-center mb-8'>
              Sign in with your university Microsoft account.
            </p>

            {/* Error Message */}
            {error && (
              <div className='bg-red-700/80 text-white p-3 rounded-xl mb-6 text-center text-sm font-medium border border-red-400'>
                {error}
              </div>
            )}

            {/* Login Button - WHITE BACKGROUND: The only way to show the original color Microsoft logo */}
            <button
              onClick={handleMicrosoftSignIn}
              disabled={loading}
              // Button is white, uses brand color for shadow/focus
              className={`w-full flex items-center justify-center space-x-3 py-4 px-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold rounded-lg transition duration-300 shadow-xl disabled:opacity-50 disabled:cursor-wait transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-${primaryColorClass}/80`}
            >
              <img
                src="https://purepng.com/public/uploads/large/purepng.com-microsoft-logo-iconlogobrand-logoiconslogos-251519939091wmudn.png"
                alt="Microsoft logo"
                className='w-6 h-6' 
                // CRITICAL: REMOVED "filter brightness-0 invert" to restore original colors
              />
              <span className='text-lg'>
                {loading ? 'Authenticating...' : 'Sign In with Microsoft'}
              </span>
            </button>
            
            <div className='mt-8 text-center text-white/60 text-xs'>
                <p>By proceeding, you agree to the <a href="#" className={`text-${lightAccentClass} hover:text-white transition font-medium underline-offset-4 hover:underline`}>SkillSync Terms of Service</a>.</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}