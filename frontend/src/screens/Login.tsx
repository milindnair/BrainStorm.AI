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
// import { localStorageHandler } from "@/utils/localStorage/localStorageHandler";

export default function Login() {
  // const router = useRouter();

  const handleSignIn = async () => {
    try {
      await setPersistence(auth, browserSessionPersistence);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      // await createUser(user);
      // await localStorageHandler({email: user.email,name: user.displayName,photoURL: user.photoURL,uid: user.uid });
      // router.push("/leaderboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overflow-hidden">
      <div>
        <img
          src={logo}
          alt=""
          className="absolute top-10 ml-[-5%]  z-1 scale-75"
        />
      </div>
      <div>
        <img
          src={illustration}
          alt=""
          className="absolute top-[30vh] ml-[-5%]  z-1"
        />
      </div>

      <Card className=" mt-[70vh]">
        <CardHeader className="flex flex-col w-full flex justify-center align-center">
          <p className="text-[24px] font-semibold font-rubik">
            Login or Signup
          </p>
          <h2 className="text-[16px] text-[#858494] font-normal pl-2 w-full flex justify-center align-center text-center font-rubik">
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
