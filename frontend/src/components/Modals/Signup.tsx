import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { authModalState } from "../../atoms/stateAtoms";
import { toast } from "react-toastify";
import { USER_SIGNUP } from "../../api.const";
import { hasWhiteSpace, validateEmail } from "../../types.const";

const Signup = () => {
  const [authModal, setAuthModal] = useRecoilState(authModalState);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authModal.isOpen) {
      resetForm();
    }
  }, [authModal]);

  const resetForm = () => {
    setUserName("");
    setUserEmail("");
    setUserPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!loading) {
      e.preventDefault();
      if (hasWhiteSpace(userName))
        return toast.error("Name should not contain spaces");
      if (userName === "") return toast.error("Name can not be empty");
      if (userName.length > 30)
        return toast.error("UserName should not exceed 30 characters");

      if (userEmail === "") return toast.error("Email can not be empty");
      if (!validateEmail(userEmail))
        return toast.error("Please enter a valid email");
      if (userEmail.length > 40)
        return toast.error("Email should not exceed 40 characters");

      if (userPassword === "") return toast.error("Password can not be empty");
      if (hasWhiteSpace(userPassword))
        return toast.error("Password should not contain spaces");
      if (userPassword.length > 30)
        return toast.error("Password shoule not exceed 30 characters");
      if (confirmPassword !== userPassword)
        return toast.error("Passwords are not matched");

      setLoading(true);

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
            resetForm();
            setAuthModal((prev) => ({ ...prev, isOpen: false, isLogin: true }));
          }
        })
        .catch((error) => {
          toast.error(error.errors);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className="px-8 pb-4 flex flex-col bg-gradient-to-b from-brand-orange-s to-dark-layer-1 pt-10 w-[340px]">
      <h3 className="text-2xl font-medium block mb-2 text-white">Sign Up</h3>
      <form onSubmit={handleSubmit}>
        <div className="mt-3">
          <label className="block mb-1 text-dark-gray-8">Your Name</label>
          <input
            type="name"
            name="name"
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
            name="email"
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
            name="password"
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
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="outline-none sm:text-sm rounded-lg p-2.5 bg-dark-layer-1
          w-full placeholder-gray-400 text-white"
            placeholder="******"
          />
        </div>
        <button
          aria-label="submit"
          disabled={loading}
          className=" mt-5 w-full text-white rounded-lg px-5 py-2.5 bg-brand-orange hover:bg-brand-orange-s disabled:opacity-60"
          type="submit"
        >
          Submit
        </button>
      </form>

      <div className=" text-sm text-dark-gray-8 mt-3">
        Already have an account
        <button
          aria-label="to sign in"
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
