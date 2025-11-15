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
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div>
        <h1>SkillSync</h1>
        <h2 className='text-sm font-bold text-center mb-6'>Welcome to SkillSync</h2>
        
        <button 
          onClick={handleMicrosoftSignIn}
          className='w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50'
        >
          {loading ? 'Signing in...' : 'Sign in with Microsoft'}
        </button>
        
        {error && <p className='text-red-500 text-sm mt-4 text-center'>{error}</p>}
      </div>
    </div>
  );
}