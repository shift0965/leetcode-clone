import { useSetRecoilState } from "recoil";
import { authModalState } from "../../atoms/stateAtoms";

const Login = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleClick = (type: string) => {
    if (type === "forgotPassword")
      setAuthModalState((prev) => ({ ...prev, type: "forgotPassword" }));
    else if (type === "register")
      setAuthModalState((prev) => ({ ...prev, type: "register" }));
  };

  return (
    <form className="px-6 pb-4">
      <h3 className="text-xl font-medium block mb-2 text-white">
        Sign in to Leetcode
      </h3>
      <div className=" mt-4">
        <label htmlFor="email" className="block mb-2 text-dark-gray-8">
          Your Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="outline-none sm:text-sm rounded-lg p-2.5 bg-dark-layer-1
                     w-full placeholder-gray-400 text-white"
          placeholder="name@email.com"
        />
      </div>
      <div className=" mt-4">
        <label htmlFor="password" className="block mb-2 text-dark-gray-8">
          Your Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="outline-none sm:text-sm rounded-lg p-2.5 bg-dark-layer-1
                     w-full placeholder-gray-400 text-white"
          placeholder="******"
        />
      </div>

      <button
        type="submit"
        className="w-full text-white rounded-lg px-5 py-2.5 bg-brand-orange hover:bg-brand-orange-s mt-6"
      >
        Submit
      </button>
      {/* <button
        onClick={() => handleClick("forgotPassword")}
        className="flex w-full justify-end text-brand-orange"
      >
        <a href="#">Forgot Password?</a>
      </button> */}
      <div className=" text-sm text-dark-gray-8 mt-5">
        Not Registered?
        <a
          href="#"
          onClick={() => handleClick("register")}
          className="text-blue-400 hover:underline ml-3"
        >
          Create Account
        </a>
      </div>
    </form>
  );
};
export default Login;
