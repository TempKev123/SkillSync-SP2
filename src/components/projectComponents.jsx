// src/components/profileComponents.jsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProjectComponents = () => {
  const navigate = useNavigate();
  const { user, profilePhotoURL, photoLoading } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8"
    style={{
        background: "linear-gradient(180deg,rgb(255, 255, 255) 50%, #887cd0 100%)"
      }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <h1>Project Page</h1>
      </div>
    </div>
  );
};

export default ProjectComponents;
