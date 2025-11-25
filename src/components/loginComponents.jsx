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

  return (
    <div className="app-container">
      <div className='min-h-screen flex flex-col items-center justify-center'>
        <div className="w-full text-center mb-6 bg-purple/20 backdrop-blur-md p-6 rounded-2xl shadow-xl">
          <h1 className="text-7xl font-Inter text-black mb-4">SkillSync</h1>
          <p className="text-black text-[32px]">Enhance your Skills, Sync your success</p>
        <div className="h-1 bg-[#887cd0] w-full"></div>
        
        </div>


        {/* Login Card */}
        <div className='bg-[#887cd0] rounded-2xl shadow-2xl p-6 w-full max-w-md'>
          <h2 className='text-[20px] font-semibold text-white text-center mb-6 pb-4 border-b-2 border-white'>
            Sign In / Sign Up
          </h2>

          <button
            onClick={handleMicrosoftSignIn}
            disabled={loading}
            className='signin-btn'
          >
            <img
              src="https://purepng.com/public/uploads/large/purepng.com-microsoft-logo-iconlogobrand-logoiconslogos-251519939091wmudn.png"
              alt="Microsoft logo"
              className='w-5 h-5'
            />
            <span className='text-[16px] text-black'>
              {loading ? 'Signing in...' : 'Login with Microsoft'}
            </span>
          </button>
        </div>
      </div>

      <CyclingBackground />
    </div>
  );
}