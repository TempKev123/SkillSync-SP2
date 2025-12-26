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

  // Branding Colors
  const primaryColorClass = `[#887cb0]`;
  const lightAccentClass = `[#a395cc]`;

  return (
    <div className="app-container relative min-h-screen overflow-hidden font-sans">
      
      {/* 1. Background Layers */}
      <CyclingBackground />
      {/* Increased overlay darkness slightly for better text contrast on login */}
      <div className="absolute inset-0 bg-black/30 z-[5]"></div> 

      {/* 2. Main Layout Container */}
      <div className='min-h-[100dvh] flex flex-col lg:flex-row items-center justify-center p-6 sm:p-12 z-10 relative lg:gap-24'>
        
        {/* --- LEFT SIDE: Brand (Hidden on Mobile, shown on LG) --- */}
        <div className="hidden lg:block w-full max-w-xl text-white animate-in fade-in slide-in-from-left-8 duration-1000">
          <header className="mb-10">
            <h1 className="text-8xl font-black tracking-tighter mb-4 drop-shadow-2xl">
              SkillSync
            </h1>
            <p className="text-2xl font-light opacity-90 border-l-4 border-white/40 pl-6 py-2">
              The professional network <br />built for students.
            </p>
          </header>

          <main className="space-y-8">
            <h2 className="text-5xl font-black leading-tight drop-shadow-lg">
              Enhance your Skills,<br />
              <span className={`text-[#a395cc]`}>Sync your Success.</span>
            </h2>
            
            <p className="text-xl font-medium text-white/80 max-w-md leading-relaxed">
              Connect with university students for academic project collaborations and bridge the skill gap.
            </p>
          </main>
        </div>


        {/* --- RIGHT SIDE: Login Card (Mobile Friendly) --- */}
        <div className='w-full max-w-md animate-in fade-in zoom-in-95 duration-700'>
          
          {/* Mobile Header (Only visible on small/medium screens) */}
          <div className="text-center mb-12 lg:hidden">
            <h1 className="text-5xl font-black text-white tracking-tighter drop-shadow-xl mb-2">
              SkillSync
            </h1>
            <div className="w-16 h-1.5 bg-[#887cb0] mx-auto rounded-full mb-3"></div>
            <p className="text-white/90 text-lg font-medium">
              Network. Collaborate. Succeed.
            </p>
          </div>
          
          {/* Login Card Container - Enhanced Glassmorphism */}
          <div className={`bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] shadow-2xl p-8 sm:p-12 transition-all duration-500 hover:border-white/40`}>
            
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-white mb-3">
                Welcome Back
              </h2>
              <p className='text-white/70 font-medium leading-relaxed'>
                Join your university peers and start building together.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className='bg-red-500/20 backdrop-blur-md text-red-100 p-4 rounded-2xl mb-8 text-center text-sm font-bold border border-red-500/50 animate-bounce'>
                {error}
              </div>
            )}

            {/* Microsoft Button - Premium Styling */}
            <button
              onClick={handleMicrosoftSignIn}
              disabled={loading}
              className="w-full group flex items-center justify-center gap-4 py-5 px-6 bg-white hover:bg-gray-50 text-gray-900 font-black rounded-2xl transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_60px_rgba(136,124,176,0.4)] disabled:opacity-50 disabled:cursor-wait transform hover:-translate-y-1 active:scale-95 outline-none"
            >
              {!loading && (
                <img
                  src="https://purepng.com/public/uploads/large/purepng.com-microsoft-logo-iconlogobrand-logoiconslogos-251519939091wmudn.png"
                  alt="MS Logo"
                  className='w-6 h-6' 
                />
              )}
              <span className='text-lg'>
                {loading ? 'Authenticating...' : 'Microsoft Sign In'}
              </span>
            </button>
            
            <div className='mt-10 text-center'>
                <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest leading-relaxed">
                  By signing in, you agree to our <br />
                  <a href="#" className="text-white hover:text-[#a395cc] underline underline-offset-4 transition-colors">Terms of Service</a>
                </p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}