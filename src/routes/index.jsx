import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/homepage";
import LoginPage from "../pages/loginPage";
import ProfilePage from "../pages/profilePage";
import ProfileEditPage from "../pages/profileEditPage";
import NavBar from "../components/navibar";
import ErrorPage from "../pages/errorpage";
import ProtectedRoute from "../components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />
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
    path: "/profile/edit",
    element: (
      <ProtectedRoute>
        <>
          <NavBar />
          <ProfileEditPage />
        </>
      </ProtectedRoute>
    )
  },
  {
    path: "*",
    element: <ErrorPage />
  }
]);