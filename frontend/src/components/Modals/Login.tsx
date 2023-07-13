import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../atoms/stateAtoms";
import { USER_SIGNIN } from "../../api.const";
import { toast } from "react-toastify";
import { validateEmail } from "../../types.const";

const Login = () => {
  const setAuthModal = useSetRecoilState(authModalState);
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!loading) {
      e.preventDefault();
      if (userEmail.trim() === "") return toast.error("Email can not be empty");
      if (!validateEmail(userEmail))
        return toast.error("Please enter a valid email");
      if (userPassword.trim() === "")
        return toast.error("Password can not be empty");
      if (userEmail.length > 30) return toast.error("Email too long");
      if (userPassword.length > 30) return toast.error("Password too long");

      setLoading(true);
      fetch(USER_SIGNIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          provider: "native",
          email: userEmail,
          password: userPassword,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.errors) {
            toast.error(data.errors);
          } else {
            toast.success("Sign In Successfully");
            localStorage.setItem("userData", JSON.stringify(data.data));
            setUserEmail("");
            setUserPassword("");
            setAuthModal((prev) => ({ ...prev, isOpen: false, isLogin: true }));
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className="px-8 pb-4 flex flex-col bg-gradient-to-b from-brand-orange-s to-dark-layer-1 pt-10 w-[340px]">
      <h3 className="text-2xl font-medium block mb-2 text-white">Sign In</h3>
      <form onSubmit={handleSubmit}>
        <div className=" mt-4">
          <label className="block mb-2 text-dark-gray-8">Your Email</label>
          <input
            type="text"
            value={userEmail}
            name="email"
            onChange={(e) => {
              setUserEmail(e.target.value.trim());
            }}
            className="outline-none sm:text-sm rounded-lg p-2.5 bg-dark-layer-1
                     w-full placeholder-gray-400 text-white"
            placeholder="name@email.com"
          />
        </div>

        <div className=" mt-4">
          <label className="block mb-2 text-dark-gray-8">Your Password</label>
          <input
            type="password"
            value={userPassword}
            name="password"
            onChange={(e) => {
              setUserPassword(e.target.value.trim());
            }}
            className="outline-none sm:text-sm rounded-lg p-2.5 bg-dark-layer-1
                     w-full placeholder-gray-400 text-white"
            placeholder="******"
          />
        </div>
        <button
          disabled={loading}
          className="w-full text-white rounded-lg px-5 py-2.5 bg-brand-orange hover:bg-brand-orange-s mt-6 disabled:opacity-60"
          type="submit"
        >
          Submit
        </button>
      </form>

      <div className=" text-sm text-dark-gray-8 mt-5">
        Not Registered?
        <button
          onClick={() => {
            setAuthModal((prev) => ({ ...prev, type: "register" }));
          }}
          className="text-blue-400 hover:underline ml-3"
        >
          Create Account
        </button>
      </div>
    </div>
  );
};
export default Login;
