import { Routes, Route, Navigate } from "react-router";

import WelcomePage from "@/pages/welcome-page";

import FeedsPage from "@/pages/feeds-page";

import AuthPage from "@/pages/auth-page";
import { useContext } from "react";
import { AuthContext } from "@/firebase/auth/auth-context";
import Spinner from "@/components/ui/spinner";
import CreateNewPost from "@/features/posts/create-new-post";

import ProfilePage from "@/pages/profile-page";

const AppRoutes = function () {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={!user ? <WelcomePage /> : <Navigate to="/feeds" />}
      ></Route>
      <Route
        path="/auth"
        element={!user ? <AuthPage /> : <Navigate to="/feeds" />}
      ></Route>
      <Route
        path="/feeds"
        element={user ? <FeedsPage /> : <Navigate to="/" />}
      ></Route>
      <Route
        path="/createPost"
        element={user ? <CreateNewPost /> : <Navigate to="/" />}
      ></Route>
      <Route
        path="/profile"
        element={user ? <ProfilePage /> : <Navigate to="/" />}
      ></Route>
    </Routes>
  );
};

export default AppRoutes;
