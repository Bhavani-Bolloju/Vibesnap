import { Routes, Route, Navigate } from "react-router";
import { lazy, Suspense } from "react";

import { useContext } from "react";
import { AuthContext } from "@/firebase/auth/auth-context";

const LazyWelcomePage = lazy(() => import("@/pages/welcome-page"));
const LazyFeedsPage = lazy(() => import("@/pages/feeds-page"));
const LazyAuthPage = lazy(() => import("@/pages/auth-page"));
const LazyCreateNewPost = lazy(
  () => import("@/features/posts/create-new-post")
);
const LazyProfilePage = lazy(() => import("@/pages/profile-page"));
const LazyEditProfilePage = lazy(() => import("@/pages/edit-profile-page"));

const PageNotFound = lazy(() => import("@/pages/not-found"));

import Loading from "@/components/ui/Loading";

const AppRoutes = function () {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Loading />}>
            {!user ? <LazyWelcomePage /> : <Navigate to="/feeds" />}
          </Suspense>
        }
      />
      <Route
        path="/auth"
        element={
          <Suspense fallback={<Loading />}>
            {!user ? <LazyAuthPage /> : <Navigate to="/feeds" />}
          </Suspense>
        }
      />
      <Route
        path="/feeds"
        element={
          <Suspense fallback={<Loading />}>
            {user ? <LazyFeedsPage /> : <Navigate to="/" />}
          </Suspense>
        }
      />
      <Route
        path="/createPost"
        element={
          <Suspense fallback={<Loading />}>
            {user ? <LazyCreateNewPost /> : <Navigate to="/" />}
          </Suspense>
        }
      />
      <Route
        path="/profile"
        element={
          <Suspense fallback={<Loading />}>
            {user ? <LazyProfilePage /> : <Navigate to="/" />}
          </Suspense>
        }
      />
      <Route
        path="/editProfile"
        element={
          <Suspense fallback={<Loading />}>
            {user ? <LazyEditProfilePage /> : <Navigate to="/" />}
          </Suspense>
        }
      />
      <Route
        path="/*"
        element={
          <Suspense fallback={<Loading />}>
            {!user ? <Navigate to="/" /> : <PageNotFound />}
          </Suspense>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
