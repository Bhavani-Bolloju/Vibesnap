import { Button } from "@/components/ui/button";

import { signInWithGoogle } from "@/firebase/auth/auth-service";
import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "@/firebase/config";

import { addUser } from "@/firebase/database/db-services";
import { FirebaseError } from "firebase/app";
import { useState } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";

import { useNavigate } from "react-router";

import Spinner from "@/components/ui/spinner";

const GoogleLogin = function () {
  const [status, setStatus] = useState<{
    loading: boolean;
    success: null | string;
    error: null | string;
  }>({ loading: false, success: null, error: null });

  const navigate = useNavigate();

  const googleLoginHandler = async function () {
    try {
      setStatus((prev) => ({ ...prev, loading: true }));
      const user = await signInWithGoogle();
      if (!user) {
        throw new Error("user not found");
      }
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);

      if (
        docs.docs.length === 0 &&
        user?.uid &&
        user?.displayName &&
        user?.email
      ) {
        await addUser(user.uid, user.displayName, user?.email, "google");
      }

      //success alert
      setStatus((prev) => ({
        ...prev,
        success: "you have logged in successfully"
      }));

      //redirect user
      setTimeout(() => {
        navigate("/feeds");
      }, 5000);
    } catch (error) {
      if (error instanceof FirebaseError) {
        // setOnError(error.message);
        setStatus((prev) => ({ ...prev, error: error.message }));
      }
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <>
      <Button
        variant="default"
        className="flex items-center gap-3"
        onClick={googleLoginHandler}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0 0 48 48"
          className="w-5 h-5"
        >
          <path
            fill="#FFC107"
            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
          ></path>
          <path
            fill="#FF3D00"
            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
          ></path>
          <path
            fill="#4CAF50"
            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
          ></path>
          <path
            fill="#1976D2"
            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
          ></path>
        </svg>
        <span>Continue with Google</span>
      </Button>
      {status.loading && (
        <div className="absolute rounded-md w-[300px] h-[100px] bg-white/30 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] border-2">
          <Spinner />
        </div>
      )}

      {status.error && (
        <Alert
          variant="destructive"
          className=" bg-red-500 text-white fixed top-2 right-1/2 translate-x-1/2 w-[400px]"
        >
          <AlertDescription>{status.error}</AlertDescription>
        </Alert>
      )}
      {status.success && (
        <Alert className=" bg-primary text-white fixed top-2 right-1/2 translate-x-1/2 w-[400px]">
          <AlertDescription>{"you have logged in "}</AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default GoogleLogin;
