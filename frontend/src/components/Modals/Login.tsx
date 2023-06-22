import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../atoms/stateAtoms";
import { USER_SIGNIN } from "../../api.const";
import { toast } from "react-toastify";

const Login = () => {
  const setAuthModal = useSetRecoilState(authModalState);
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  const handleSubmit = () => {
    if (userEmail === "") return toast.error("Email can not be empty");
    if (userPassword === "") return toast.error("Password can not be empty");

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
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then((error) => {
            throw error;
          });
        }
        return response.json();
      })
      .then((data) => {
        toast.success("Sign In Successfully");
        localStorage.setItem("userData", JSON.stringify(data.data));
        setAuthModal((prev) => ({ ...prev, isOpen: false, isLogin: true }));
      })
      .catch((error) => {
        toast.error(error.errors);
      });
  };

  return (
    <div className="px-6 pb-4">
      <h3 className="text-2xl font-medium block mb-2 text-white">Sign In</h3>
      <div className=" mt-4">
        <label className="block mb-2 text-dark-gray-8">Your Email</label>
        <input
          type="text"
          value={userEmail}
          onChange={(e) => {
            setUserEmail(e.target.value);
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
          onChange={(e) => {
            setUserPassword(e.target.value);
          }}
          className="outline-none sm:text-sm rounded-lg p-2.5 bg-dark-layer-1
                     w-full placeholder-gray-400 text-white"
          placeholder="******"
        />
      </div>

      <button
        className="w-full text-white rounded-lg px-5 py-2.5 bg-brand-orange hover:bg-brand-orange-s mt-6"
        onClick={handleSubmit}
      >
        Submit
      </button>

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
