import { Routes, Route } from "react-router";

import WelcomePage from "@/pages/welcome-page";
import AuthForm from "@/features/auth/auth-form";
import FeedsPage from "@/pages/feeds-page";

const AppRoutes = function () {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />}></Route>
      <Route path="/auth" element={<AuthForm />}></Route>
      <Route path="/feeds" element={<FeedsPage />}></Route>
    </Routes>
  );
};

export default AppRoutes;
