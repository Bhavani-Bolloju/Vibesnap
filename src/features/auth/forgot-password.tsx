import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import React, { useState } from "react";

import { passwordReset } from "@/firebase/auth/auth-service";
import Spinner from "@/components/ui/spinner";

import { FirebaseError } from "firebase/app";

import { toastSuccess, toastError } from "@/components/ui/toast";

const ForgotPassword = function () {
  const [email, setEmail] = useState("");

  const [status, setStatus] = useState<{
    loading: boolean;
    success: null | string;
    error: null | string;
  }>({ loading: false, success: null, error: null });

  const emailHandler = function (e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  };

  const submitHandler = async function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setStatus((prev) => ({ ...prev, loading: true }));

      await passwordReset(email);

      toastSuccess("A password reset email has been sent successfully");
    } catch (error) {
      if (error instanceof FirebaseError) {
        toastError(error.message);
      }
    } finally {
      setStatus((prev) => ({ ...prev, loading: false }));
      setEmail("");
    }
  };

  return (
    <Dialog>
      <DialogTrigger className=" hover:text-link border-b border-transparent hover:border-link text-center mt-5 self-center block">
        Forgot your password?
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col items-center">
          <DialogTitle className="font-karla text-2xl">
            Forgot Password
          </DialogTitle>
          <DialogDescription className="text-base text-gray-00">
            We'll send you an Email to reset your password.{" "}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-5 items-center w-full px-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 50 50"
            className="h-auto w-20"
          >
            <path d="M 25 3 C 18.363281 3 13 8.363281 13 15 L 13 20 L 9 20 C 7.355469 20 6 21.355469 6 23 L 6 47 C 6 48.644531 7.355469 50 9 50 L 41 50 C 42.644531 50 44 48.644531 44 47 L 44 23 C 44 21.355469 42.644531 20 41 20 L 37 20 L 37 15 C 37 8.363281 31.636719 3 25 3 Z M 25 5 C 30.566406 5 35 9.433594 35 15 L 35 20 L 15 20 L 15 15 C 15 9.433594 19.433594 5 25 5 Z M 9 22 L 41 22 C 41.554688 22 42 22.445313 42 23 L 42 47 C 42 47.554688 41.554688 48 41 48 L 9 48 C 8.445313 48 8 47.554688 8 47 L 8 23 C 8 22.445313 8.445313 22 9 22 Z M 25 30 C 23.300781 30 22 31.300781 22 33 C 22 33.898438 22.398438 34.6875 23 35.1875 L 23 38 C 23 39.101563 23.898438 40 25 40 C 26.101563 40 27 39.101563 27 38 L 27 35.1875 C 27.601563 34.6875 28 33.898438 28 33 C 28 31.300781 26.699219 30 25 30 Z"></path>
          </svg>
          <form
            onSubmit={submitHandler}
            className="flex flex-col self-stretch gap-5
          "
          >
            <Input
              onChange={emailHandler}
              type="email"
              placeholder="Enter your email"
              name="email"
              value={email}
              className="h-10 border-neutral-600"
              required
            />
            <Button variant="default">submit</Button>
          </form>
          {status.loading && (
            <div className="absolute rounded-md w-[100px] h-[100px] bg-black/5  top-[40%] left-1/2 translate-x-[-50%] ">
              <Spinner />
            </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose>Back to login</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPassword;

