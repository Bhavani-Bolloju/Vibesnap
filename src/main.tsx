import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ToastContainer, Slide } from "react-toastify";

import { BrowserRouter } from "react-router";
import AuthProvider from "./firebase/auth/auth-provider";
// import AppRoutes from "./routes/app-routes";
import AppPage from "./App";
import "@/styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppPage />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          limit={2}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          theme="light"
          transition={Slide}
        />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
