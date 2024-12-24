import { Routes, Route, Navigate } from "react-router";
// import { lazy, Suspense } from "react";

import WelcomePage from "@/pages/welcome-page";
import FeedsPage from "@/pages/feeds-page";
import AuthPage from "@/pages/auth-page";
import CreateNewPost from "@/features/posts/create-new-post";
import ProfilePage from "@/pages/profile-page";
import EditProfilePage from "@/pages/edit-profile-page";

import { useContext } from "react";
import { AuthContext } from "@/firebase/auth/auth-context";
import Spinner from "@/components/ui/spinner";

// const LazyWelcomePage = lazy(() => import("@/pages/welcome-page"));
// const LazyFeedsPage = lazy(() => import("@/pages/feeds-page"));
// const LazyAuthPage = lazy(() => import("@/pages/auth-page"));
// const LazyCreateNewPost = lazy(
//   () => import("@/features/posts/create-new-post")
// );
// const LazyProfilePage = lazy(() => import("@/pages/profile-page"));
// const LazyEditProfilePage = lazy(() => import("@/pages/edit-profile-page"));

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
      />
      <Route
        path="/auth"
        element={!user ? <AuthPage /> : <Navigate to="/feeds" />}
      />
      <Route
        path="/feeds"
        element={user ? <FeedsPage /> : <Navigate to="/" />}
      />
      <Route
        path="/createPost"
        element={user ? <CreateNewPost /> : <Navigate to="/" />}
      />
      <Route
        path="/profile"
        element={user ? <ProfilePage /> : <Navigate to="/" />}
      />
      <Route
        path="/editProfile"
        element={user ? <EditProfilePage /> : <Navigate to="/" />}
      />
    </Routes>
   
  );
};

export default AppRoutes;


 // <Routes>
    //   <Route
    //     path="/"
    //     element={!user ? <LazyWelcomePage /> : <Navigate to="/feeds" />}
    //   />
    //   <Route
    //     path="/auth"
    //     element={!user ? <LazyAuthPage /> : <Navigate to="/feeds" />}
    //   />
    //   <Route
    //     path="/feeds"
    //     element={user ? <LazyFeedsPage /> : <Navigate to="/" />}
    //   />
    //   {/* <Route
    //     path="/createPost"
    //     element={user ? <LazyCreateNewPost /> : <Navigate to="/" />}
    //   /> */}
    //   {/* <Route
    //     path="/profile"
    //     element={user ? <LazyProfilePage /> : <Navigate to="/" />}
    //   /> */}
    //   {/* <Route
    //     path="/editProfile"
    //     element={user ? <LazyEditProfilePage /> : <Navigate to="/" />}
    //   /> */}
    // </Routes>