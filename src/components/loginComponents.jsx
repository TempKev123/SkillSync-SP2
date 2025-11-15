import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
    <div className='min-h-screen flex flex-col items-center justify-center bg-indigo-500'>
      {/* Logo/Title Section */}
      <div className='text-center mb-8'>
        <h1 className='text-4xl font-Inter text-white mb-4'>SkillSync</h1>
        <p className='text-blue-200 text-[16px]'>Enhance your skills, sync your success</p>
      </div>

      {/* Login Card */}
      <div className='bg-white rounded-2xl shadow-2xl py-6 px-6 w-full max-w-md'>
        <h2 className='text-[16px] font-semibold text-indigo-500 text-center mb-6 pb-4 border-b-2 border-indigo-500'>
          Sign In / Sign Up
        </h2>

        <button
          onClick={handleMicrosoftSignIn}
          disabled={loading}
          className='w-full bg-white border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 disabled:opacity-50 flex items-center justify-center gap-3 transition-all'
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
  );
}