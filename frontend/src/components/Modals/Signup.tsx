import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authModalState } from "../../atoms/authModalAtom";

const Signup = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleClick = () => {
    setAuthModalState((prev) => ({ ...prev, type: "login" }));
  };

  return (
    <form className="px-6 pb-4 flex flex-col">
      <h3 className="text-xl font-medium block mb-2 text-gray-300">
        Sign in to Leetcode
      </h3>
      <div className=" mt-3">
        <label htmlFor="name" className="block mb-1 text-gray-300">
          Your Name
        </label>
        <input
          type="name"
          name="name"
          id="name"
          className="border-2 outline-none sm:text-sm rounded-lg 
                   focus:border-blue-500 p-2.5 bg-gray-600 border-gray-500 
                   w-full placeholder-gray-400 text-white"
          placeholder="name"
        />
      </div>
      <div className="mt-3">
        <label htmlFor="email" className="block mb-1 text-gray-300">
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
      <div className="mt-3">
        <label htmlFor="password" className="block mb-1 text-gray-300">
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
      <div className="mt-3">
        <label htmlFor="Confirm password" className="block mb-1 text-gray-300">
          Confirm Password
        </label>
        <input
          type="password"
          name="Confirm password"
          id="Confirm password"
          className="border-2 outline-none sm:text-sm rounded-lg 
                   focus:border-blue-500 p-2.5 bg-gray-600 border-gray-500 
                   w-full placeholder-gray-400 text-white"
          placeholder="******"
        />
      </div>

      <button
        type="submit"
        className=" mt-5 w-full text-white rounded-lg px-5 py-2.5 bg-brand-orange hover:bg-brand-orange-s"
      >
        Submit
      </button>
      <div className=" text-sm text-gray-500 mt-3">
        Already have an account
        <a
          href="#"
          className="text-blue-700 hover:underline ml-3"
          onClick={handleClick}
        >
          Sign in
        </a>
      </div>
    </form>
  );
};
export default Signup;
