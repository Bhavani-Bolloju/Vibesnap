import { Routes, Route } from "react-router";

import WelcomePage from "@/pages/welcome-page";

const AppRoutes = function () {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />}></Route>
    </Routes>
  );
};

export default AppRoutes;

