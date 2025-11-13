import { createBrowserRouter } from "react-router";
import LoginPage from "../pages/loginPage";
import ProfilePage from "../pages/profilePage";
export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/profile",
    element: <ProfilePage/>,
  },
]);