"use client";
import { useState } from "react";

import { FcGoogle } from "react-icons/fc";
import { AiOutlineArrowRight } from "react-icons/ai";

import Front from "../components/Front";
import Link from "next/link";
import { useAuthContext } from "../context/AuthContext"

import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";


const Signin = () => {
  const {setUser } = useAuthContext()
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [signInError, setSignInError] = useState("");

  onAuthStateChanged(auth, (currentUser)=>{
    setUser(currentUser);
  })

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
      setSignInError("You have successfully registered")
    } catch (error) {
      console.log(error.message);
      setSignInError("Your credential is incorrect")
    }
  };

  return (
    <div className="flex bg-white">
      <div className="p-10 lg:flex-1">
        <div>
          <h1 className="font-bold lg:text-[24px] text-2xl mb-[80px] lg:mb-[50px]">
            Signin
          </h1>
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="font-medium text-xl lg:text-[16px]">
            Register your account
          </h1>
          <div className="flex flex-col my-5">
            <form className="flex flex-col gap-y-4">
              <div className="flex flex-col">
                <label className="font-medium lg:text-[15px]">Email</label>
                <input
                  className="border border-slate-300 rounded-lg focus:outline-slate-400 shadow-lg p-3 w-[18rem] lg:placeholder:text-[14px] lg:p-2 lg:w-[30rem]"
                  type="text"
                  placeholder="Enter your email"
                  onChange={(event) => {
                    setRegisterEmail(event.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium lg:text-[15px]">Password</label>
                <input
                  className="border border-slate-300 rounded-lg focus:outline-slate-400 shadow-lg p-3 lg:placeholder:text-[14px] lg:p-2 lg:w-[30rem]"
                  type="password"
                  placeholder="Enter your password"
                  onChange={(event) => {
                    setRegisterPassword(event.target.value);
                  }}
                />
              </div>
            </form>
            <div className="text-center w-[30rem] mt-2 font-medium text-red-500 text-sm">{signInError}</div>
          </div>

          <div className="flex flex-col gap-5 justify-center text-gray-400 font-medium lg:text-[15px] lg:w-[30rem]">
            <button
              onClick={register}
              className="mt-[20px] bg-slate-200 p-2 rounded-lg flex items-center justify-center"
            >
              Signin
            </button>
            <div className="bg-slate-100 h-1 rounded-full"></div>
            
          </div>
          <Link href="/login" className="flex flex-row items-center gap-1 text-sm mt-4 bg-gray-200 rounded-3xl p-1 text-gray-600 font-medium max-w-[160px]">
            <span className="ml-2">Go to Login page</span>
            <AiOutlineArrowRight />
          </Link>
        </div>
      </div>

      <div className="lg:flex-1">
        <Front />
      </div>
    </div>
  );
};

export default Signin;
