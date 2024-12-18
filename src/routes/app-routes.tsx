import { Routes, Route } from "react-router";

import WelcomePage from "@/pages/welcome-page";

import FeedsPage from "@/pages/feeds-page";

import AuthPage from "@/pages/auth-page";

const AppRoutes = function () {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />}></Route>
      <Route path="/auth" element={<AuthPage />}></Route>
      <Route path="/feeds" element={<FeedsPage />}></Route>
    </Routes>
  );
};

export default AppRoutes;
