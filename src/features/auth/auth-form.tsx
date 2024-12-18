import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useState } from "react";

import {
  register,
  loginWithEmailAndPassword
} from "@/firebase/auth/auth-service";
import { addUser } from "@/firebase/database/db-services";

import { FirebaseError } from "firebase/app";

import { Alert, AlertDescription } from "@/components/ui/alert";
import Spinner from "@/components/ui/spinner";

import { useNavigate } from "react-router";

const AuthForm = function ({ signup }: { signup: boolean }) {
  const formInputValues = {
    emailAddress: "",
    password: "",
    name: ""
  };

  const [inputValues, setInputValues] = useState(formInputValues);

  const [onError, setOnError] = useState<null | string>(null);
  const [onLoad, setOnLoad] = useState(false);
  const [onSuccess, setOnSuccess] = useState<null | string>(null);

  const navigate = useNavigate();

  const inputHandler = function (e: React.ChangeEvent<HTMLInputElement>) {
    if (onError) {
      setOnError(null);
    }
    setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const formSubmitHandler = async function (
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    //register logic
    setOnLoad(true);
    try {
      if (signup) {
        //register with email id and password
        const user = await register(
          inputValues.emailAddress,
          inputValues.password
        );

        //add user to the firestore
        if (user && user?.uid && user?.email) {
          addUser(user?.uid, inputValues.name, user?.email, "local");

          //show a popup on success
          setOnSuccess("🥳🥳 You're all set! Thanks for joining us");

          //redirect user to feed screen
          setTimeout(() => {
            navigate("/feeds");
          }, 3000);
        }
      } else {
        await loginWithEmailAndPassword(
          inputValues.emailAddress,
          inputValues.password
        );

        //show a popup on success
        setOnSuccess("You're logged in!");

        //redirect user to feed screen
        setTimeout(() => {
          navigate("/feeds");
        }, 3000);
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        setOnError(error.message);
      }
    } finally {
      setOnLoad(false);
      setInputValues(formInputValues);
    }
  };

  return (
    <>
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

      {onLoad && (
        <div className="absolute rounded-md w-[100px] h-[100px] bg-black/5  top-[40%] left-1/2 translate-x-[-50%] ">
          <Spinner />
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
    </>
  );
};

export default AuthForm;
