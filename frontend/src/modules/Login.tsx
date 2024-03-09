'use client'

import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import 'tailwindcss/tailwind.css';

import { auth,googleProvider } from "../utils/Firebaseconfig";
// import {useRouter} from "next/navigation";
// import { createUser } from "@/utils/Firebase/userController";
import { browserSessionPersistence, setPersistence, signInWithPopup } from "firebase/auth";
// import { localStorageHandler } from "@/utils/localStorage/localStorageHandler";





export default function Login() {
  // const router = useRouter();



  const handleSignIn = async() => {   
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
    <Card className="w-[95%] absolute h-[30%] bottom-0 ml-[2.5%] ">
      <CardHeader className="flex flex-col w-full flex justify-center align-center">
        <p className="text-[24px] font-semibold">Login or Signup</p>
        <h2 className="text-[16px] text-[#858494] font-normal pl-2 w-full flex justify-center align-center text-center">Login or create an account to take quiz, take part in challenge, and more.</h2>

      </CardHeader>
      <CardBody>
        <Button className="flex" onClick={handleSignIn}>
          {/* <Image src="/assets/google.png" width="20" height="20" /> */}
          <span className="ml-2">Login with Google</span>
        </Button>
      </CardBody>
    </Card>
  );
}
