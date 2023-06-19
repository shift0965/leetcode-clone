import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authModalState } from "../../atoms/stateAtoms";

const Login = () => {
  const authModal = useRecoilValue(authModalState);
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleClick = (type: string) => {
    if (type === "forgotPassword")
      setAuthModalState((prev) => ({ ...prev, type: "forgotPassword" }));
    else if (type === "register")
      setAuthModalState((prev) => ({ ...prev, type: "register" }));
  };

  return (
    <form className=" space-y-6 px-6 pb-4">
      <h3 className="text-xl font-medium block mb-2 text-gray-300">
        Sign in to Leetcode
      </h3>
      <div className="">
        <label htmlFor="email" className="block mb-2 text-gray-300">
          Your Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="border-2 outline-none sm:text-sm rounded-lg 
                     focus:border-blue-500 p-2.5 bg-gray-600 border-gray-500 
                     w-full placeholder-gray-400 text-white"
          placeholder="name@email.com"
        />
      </div>
      <div className="">
        <label htmlFor="password" className="block mb-2 text-gray-300">
          Your Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="border-2 outline-none sm:text-sm rounded-lg 
                     focus:border-blue-500 p-2.5 bg-gray-600 border-gray-500 
                     w-full placeholder-gray-400 text-white"
          placeholder="******"
        />
      </div>

      <button
        type="submit"
        className="w-full text-white rounded-lg px-5 py-2.5 bg-brand-orange hover:bg-brand-orange-s"
      >
        Submit
      </button>
      <button
        onClick={() => handleClick("forgotPassword")}
        className="flex w-full justify-end text-brand-orange"
      >
        <a href="#">Forgot Password?</a>
      </button>
      <div className=" text-sm text-gray-500">
        Not Registered?
        <a
          href="#"
          onClick={() => handleClick("register")}
          className="text-blue-700 hover:underline ml-3"
        >
          Create Account
        </a>
      </div>
    </form>
  );
};
export default Login;
