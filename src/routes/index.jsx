import { createBrowserRouter } from "react-router";
import HomePage from "../pages/homepage";
import LoginPage from "../pages/loginPage";
import ProfilePage from "../pages/profilePage";
import NavBar from "../components/navibar";
import ErrorPage from "../pages/errorpage"; 
export const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <>
    <NavBar/>,
    <HomePage/>,
    </>
  },
  {
    path: "/login",
    element: <>
    <NavBar/>,
    <LoginPage/>,
    </>
  },
  {
    path: "/profile",
    element: <>
    <NavBar/>,
    <ProfilePage/>,
    </>
  },
  {
    path: "*",           // ✅ Catch-all route for unmatched paths
    element: <ErrorPage />,
  },
]);