import { Routes, Route, Navigate } from "react-router";
import { lazy, Suspense } from "react";

import { useContext } from "react";
import { AuthContext } from "@/firebase/auth/auth-context";
import Spinner from "@/components/ui/spinner";

const LazyWelcomePage = lazy(() => import("@/pages/welcome-page"));
const LazyFeedsPage = lazy(() => import("@/pages/feeds-page"));
const LazyAuthPage = lazy(() => import("@/pages/auth-page"));
const LazyCreateNewPost = lazy(
  () => import("@/features/posts/create-new-post")
);
const LazyProfilePage = lazy(() => import("@/pages/profile-page"));
const LazyEditProfilePage = lazy(() => import("@/pages/edit-profile-page"));

const PageNotFound = lazy(() => import("@/pages/not-found"));

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
        element={
          <Suspense fallback={<div>loading...</div>}>
            {!user ? <LazyWelcomePage /> : <Navigate to="/feeds" />}
          </Suspense>
        }
      />
      <Route
        path="/auth"
        element={
          <Suspense fallback={<div>loading...</div>}>
            {!user ? <LazyAuthPage /> : <Navigate to="/feeds" />}
          </Suspense>
        }
      />
      <Route
        path="/feeds"
        element={
          <Suspense fallback={<div>loading...</div>}>
            {user ? <LazyFeedsPage /> : <Navigate to="/" />}
          </Suspense>
        }
      />
      <Route
        path="/createPost"
        element={
          <Suspense fallback={<div>loading...</div>}>
            {user ? <LazyCreateNewPost /> : <Navigate to="/" />}
          </Suspense>
        }
      />
      <Route
        path="/profile"
        element={
          <Suspense fallback={<div>loading...</div>}>
            {user ? <LazyProfilePage /> : <Navigate to="/" />}
          </Suspense>
        }
      />
      <Route
        path="/editProfile"
        element={
          <Suspense fallback={<div>loading...</div>}>
            {user ? <LazyEditProfilePage /> : <Navigate to="/" />}
          </Suspense>
        }
      />
      <Route
        path="/*"
        element={
          <Suspense fallback={<div>loading...</div>}>
            {!user ? <Navigate to="/" /> : <PageNotFound />}
          </Suspense>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
