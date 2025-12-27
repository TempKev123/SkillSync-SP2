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
      <main className="max-w-5xl mx-auto grid gap-8 md:grid-cols-3">

        {/* Project Image */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="h-64 bg-gray-300 flex items-center justify-center">
            <span className="text-gray-500">Project Image</span>
          </div>
        </div>

        {/* Project Info Card */}
        <aside className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Project Name</h2>

          <ul className="space-y-2 text-gray-700">
            <li><strong>Role:</strong> Developer</li>
            <li><strong>Tech:</strong> React, Tailwind</li>
            <li><strong>Year:</strong> 2025</li>
          </ul>

          <div className="mt-6 flex gap-3">
            <button className="flex-1 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-100">
              GitHub
            </button>
          </div>
        </aside>
      </main>

      {/* Description Section */}
      <section className="max-w-5xl mx-auto mt-12 bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">About This Project</h2>
          <span className="text-sm text-gray-600">
            Posted by <span className="font-bold">{"Alice Smith"}</span>
          </span>
          <p className="text-gray-700 leading-relaxed">
            I am looking for teammates to help me complete my website. If you're interested in collaborating or have relevant skills, please reach out!
          </p>
      </section>


    </div>
  );
};

export default ProjectComponents;
