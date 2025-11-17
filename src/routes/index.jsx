import { createBrowserRouter, Navigate } from "react-router";
import HomePage from "../pages/homepage";
import LoginPage from "../pages/loginPage";
import ProfilePage from "../pages/profilePage";
import NavBar from "../components/navibar";
import ErrorPage from "../pages/errorpage";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../context/AuthContext";

// Wrapper component to redirect authenticated users from login page
function LoginRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return <LoginPage />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginRoute />
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <>
          <NavBar />
          <HomePage />
        </>
      </ProtectedRoute>
    )
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <>
          <NavBar />
          <ProfilePage />
        </>
      </ProtectedRoute>
    )
  },
  {
    path: "*",
    element: <ErrorPage />
  }
]);