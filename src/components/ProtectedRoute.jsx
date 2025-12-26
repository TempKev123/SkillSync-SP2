import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white relative overflow-hidden">
        
        {/* --- PREMIUM BACKGROUND DECORATION --- */}
        {/* Soft brand glow in the background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#887cd0]/10 rounded-full blur-[120px] -z-10" />
        
        <div className="text-center">
          {/* --- CUSTOM BRAND LOADER --- */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            {/* Outer Rotating Ring */}
            <div className="absolute inset-0 border-4 border-[#887cd0]/20 rounded-[2rem] animate-[spin_3s_linear_infinite]" />
            
            {/* Inner Fast Ring */}
            <div className="absolute inset-0 border-t-4 border-[#a396e0] rounded-[2rem] animate-spin shadow-[0_0_15px_rgba(163,150,224,0.4)]" />
            
            {/* Center Logo Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-[#887cd0] rounded-xl flex items-center justify-center animate-pulse shadow-lg">
                <span className="text-white font-black text-xl">S</span>
              </div>
            </div>
          </div>

          {/* --- LOADING TEXT --- */}
          <h2 className="text-2xl font-black text-gray-900 tracking-tighter mb-2">
            SkillSync
          </h2>
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] animate-pulse">
              Syncing experience
            </span>
            <span className="flex gap-1">
              <span className="w-1 h-1 bg-[#887cd0] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1 h-1 bg-[#887cd0] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1 h-1 bg-[#887cd0] rounded-full animate-bounce"></span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}