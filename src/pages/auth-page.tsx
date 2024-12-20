import { useState } from "react";
import logo from "../../public/vibespan.svg";
import ForgotPassword from "@/features/auth/forgot-password";

import AuthForm from "@/features/auth/auth-form";
const AuthPage = function () {
  const [signup, setSignup] = useState(false);
  return (
    <div className="w-full h-full mt-5 flex flex-col items-center justify-center py-16 relative">
      <h1 className="flex self-center items-center gap-2">
        <img src={logo} alt="" className="w-18 h-auto" />
        <span className="font-karla text-3xl font-semibold">Vibespan</span>
      </h1>
      <p className="text-base self-center mb-10 ">
        Moments That Matter, Shared Forever.
      </p>
      <div className="w-[550px] rounded-lg px-20 py-10 leading-4 border-2 flex flex-col">
        <h2 className="font-bold text-xl mb-1">
          {signup ? "Sign Up" : "Login"}
        </h2>

        <div>
          {signup
            ? "Already have an account? "
            : "Doesn't have an account yet? "}
          <button
            className="border-b border-transparent hover:border-b
           hover:border-link hover:text-link font-semibold"
            onClick={() => {
              setSignup((prev) => !prev);
            }}
          >
            {signup ? "Login" : "Sign up"}
          </button>
        </div>
        <AuthForm key={signup ? "signup" : "login"} signup={signup} />

        {!signup && <ForgotPassword />}
      </div>
    </div>
  );
};

export default AuthPage;
