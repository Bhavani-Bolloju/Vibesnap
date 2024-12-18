import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import logo from "@assets/vibespan.svg";
import { useEffect, useState } from "react";

import { register } from "@/firebase/auth/auth-service";
import { addUser } from "@/firebase/database/db-services";

import { FirebaseError } from "firebase/app";

import { Alert, AlertDescription } from "@/components/ui/alert";
import Spinner from "@/components/ui/spinner";

import { useNavigate } from "react-router";

const AuthForm = function () {
  const [signup, setSignup] = useState(false);

  // const [emailAddress, setEmailAddress] = useState("");
  // const [password, setPassword] = useState("");
  // const [name, setName] = useState("");

  const [inputValues, setInputValues] = useState({
    emailAddress: "",
    password: "",
    name: ""
  });

  const [onError, setOnError] = useState<null | string>(null);
  const [onLoad, setOnLoad] = useState(false);
  const [onSuccess, setOnSuccess] = useState<null | string>(null);

  const navigate = useNavigate();

  const inputHandler = function (e: React.ChangeEvent<HTMLInputElement>) {
    setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (onError) {
      setTimeout(() => {
        setOnError(null);
      }, 2000);
    }
  }, [onError]);

  const formSubmitHandler = async function (
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (signup) {
      //register logic
      setOnLoad(true);
      try {
        //register with email id and password
        const user = await register(
          inputValues.emailAddress,
          inputValues.password
        );

        //add user to the firestore
        if (user && user?.uid && user?.email) {
          addUser(user?.uid, inputValues.name, user?.email);

          //show a popup on success
          setOnSuccess("🥳🥳 You're all set! Thanks for joining us");

          //redirect user to feed screen
          setTimeout(() => {
            navigate("/feeds");
          }, 3000);
        }
      } catch (error) {
        if (error instanceof FirebaseError) {
          setOnError(error.message);
        }
        // console.log('other error', error)
      } finally {
        setOnLoad(false);
      }
    } else {
      //login logic
    }
  };

  return (
    <div className="w-full h-full mt-12 flex flex-col items-center justify-center py-16 relative">
      <h1 className="flex self-center items-center gap-2">
        <img src={logo} alt="" className="w-18 h-auto" />
        <span className="font-karla text-3xl font-semibold">Vibespan</span>
      </h1>
      <p className="text-base self-center mb-10 ">
        Moments That Matter, Shared Forever.
      </p>
      <div className="min-w-[500px] px-20 py-10 leading-4 border">
        <h2 className="font-bold text-xl mb-1">
          {" "}
          {signup ? "Sign Up" : "Login"}
        </h2>
        <p>
          {signup
            ? "Already have an account? "
            : "Doesn't have an account yet? "}
          <button
            className="border-b border-transparent hover:border-b
           hover:border-link hover:text-link font-semibold"
            onClick={() => setSignup((prev) => !prev)}
          >
            {signup ? "Login" : "Sign up"}
          </button>
        </p>
        <form className="flex flex-col gap-3 mt-8" onSubmit={formSubmitHandler}>
          {signup && (
            <div className="flex flex-col gap-3 mb-3">
              <Label htmlFor="name">Full Name</Label>
              <Input
                type="text"
                placeholder="joe doe"
                id="name"
                name="name"
                required
                onChange={inputHandler}
                value={inputValues.name}
              />
            </div>
          )}
          <div className="flex flex-col gap-3 mb-3">
            <Label htmlFor="email">Email Address</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              id="email"
              name="emailAddress"
              required
              onChange={inputHandler}
              value={inputValues.emailAddress}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="password">Password</Label>
            <Input
              type="text"
              placeholder="Enter your password"
              id="password"
              name="password"
              required
              onChange={inputHandler}
              value={inputValues.password}
            />
          </div>
          {!signup && (
            <button className="self-end hover:text-link border-b border-transparent hover:border-link">
              Forgot your password?
            </button>
          )}
          <br />
          <Button variant="default" className="uppercase">
            {signup ? "Sign Up" : "Login"}
          </Button>
        </form>
      </div>
      {onLoad && (
        <div className="absolute rounded-md w-[100px] h-[100px] bg-black/5  top-[40%] left-1/2 translate-x-[-50%] ">
          <Spinner></Spinner>
        </div>
      )}
      {onSuccess && (
        <Alert variant="default" className="absolute top-0 right-10 w-[400px]">
          <AlertDescription>{onSuccess}</AlertDescription>
        </Alert>
      )}
      {onError && (
        <Alert
          variant="destructive"
          className="absolute top-0 right-10 w-[400px]"
        >
          <AlertDescription>{onError}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default AuthForm;
