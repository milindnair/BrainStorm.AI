"use client";

import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import "tailwindcss/tailwind.css";
import illustration from "../assets/Illustration.svg";
import logo from "../assets/Logo.png";
import google from "../assets/google.png";
import { auth, googleProvider } from "../utils/Firebaseconfig";
// import {useRouter} from "next/navigation";
// import { createUser } from "@/utils/Firebase/userController";
import {
  browserSessionPersistence,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";
import { createUser } from "../utils/userController";
import { localStorageHandler } from "../utils/localStorageHandler";
import { useNavigate } from "react-router-dom";
// import { localStorageHandler } from "@/utils/localStorage/localStorageHandler";

export default function Login() {
  // const router = useRouter();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await setPersistence(auth, browserSessionPersistence);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await createUser(user);
      await localStorageHandler({email: user.email,name: user.displayName,photoURL: user.photoURL,uid: user.uid });
      navigate('/dashboard ');

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[100vh] overflow-hidden flex flex-col">
      <div className="w-full ">
        <img
          src={logo}
          alt=""
          className="ml-[1rem]  z-1 scale-75"
        />
      </div>
      <div>
        <img
          src={illustration}
          alt=""
          className=" ml-[0.5rem]  z-1 scale-80"
        />
      </div>

      <Card className=" mt-5 w-[90vw] ml-[5vw]">
        <CardHeader className="flex flex-col w-full flex justify-center align-center">
          <p className="text-[24px] font-semibold font-rubik">
            Login or Signup
          </p>
          <h2 className="text-[14px] text-[#858494] font-normal pl-2 w-full flex justify-center align-center text-center font-rubik">
            Login or create an account to take quiz, take part in challenge, and
            more.
          </h2>
        </CardHeader>
        <CardBody>
          <Button className="flex" onClick={handleSignIn}>
            <img src={google} className="h-[30px] w-[30px]" />
            <span className="ml-2 font-rubik font-medium text-[18px]">Login with Google</span>
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
