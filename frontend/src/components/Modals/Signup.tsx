import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../atoms/stateAtoms";
import { toast } from "react-toastify";
import { USER_SIGNUP } from "../../api.const";

const Signup = () => {
  const setAuthModal = useSetRecoilState(authModalState);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userName === "") return toast.error("Name can not be empty");
    if (userEmail === "") return toast.error("Email can not be empty");
    if (userPassword === "") return toast.error("Password can not be empty");
    if (confirmPassword !== userPassword)
      return toast.error("Passwords are not matched");

    fetch(USER_SIGNUP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userName,
        email: userEmail,
        password: userPassword,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.errors) {
          toast.error(result.errors);
        } else {
          toast.success("Sign Up Successfully");
          localStorage.setItem("userData", JSON.stringify(result.data));
          setUserName("");
          setUserEmail("");
          setUserPassword("");
          setConfirmPassword("");
          setAuthModal((prev) => ({ ...prev, isOpen: false, isLogin: true }));
        }
      })
      .catch((error) => {
        toast.error(error.errors);
      });
  };

  return (
    <div className="px-8 pb-4 flex flex-col bg-gradient-to-b from-brand-orange-s to-dark-layer-1 pt-10 w-[340px]">
      <h3 className="text-2xl font-medium block mb-2 text-white">Sign Up</h3>
      <form onSubmit={handleSubmit}>
        <div className="mt-3">
          <label className="block mb-1 text-dark-gray-8">Your Name</label>
          <input
            type="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="outline-none sm:text-sm rounded-lg p-2.5 bg-dark-layer-1
          w-full placeholder-gray-400 text-white"
            placeholder="name"
          />
        </div>
        <div className="mt-2">
          <label className="block mb-1 text-dark-gray-8">Your Email</label>
          <input
            type="text"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="outline-none sm:text-sm rounded-lg p-2.5 bg-dark-layer-1
          w-full placeholder-gray-400 text-white"
            placeholder="name@email.com"
          />
        </div>
        <div className="mt-2">
          <label className="block mb-1 text-dark-gray-8">Your Password</label>
          <input
            type="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            className="outline-none sm:text-sm rounded-lg p-2.5 bg-dark-layer-1
          w-full placeholder-gray-400 text-white"
            placeholder="******"
          />
        </div>
        <div className="mt-2">
          <label className="block mb-1 text-dark-gray-8">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="outline-none sm:text-sm rounded-lg p-2.5 bg-dark-layer-1
          w-full placeholder-gray-400 text-white"
            placeholder="******"
          />
        </div>{" "}
        <button
          className=" mt-5 w-full text-white rounded-lg px-5 py-2.5 bg-brand-orange hover:bg-brand-orange-s"
          type="submit"
        >
          Submit
        </button>
      </form>

      <div className=" text-sm text-dark-gray-8 mt-3">
        Already have an account
        <button
          className="text-blue-300 hover:underline ml-3"
          onClick={() => {
            setAuthModal((prev) => ({ ...prev, type: "login" }));
          }}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};
export default Signup;
