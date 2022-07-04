import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

interface props {
  isRegister?: boolean;
}

const Register = ({ isRegister = true }: props) => {
  const [register, setRegister] = useState<boolean>(isRegister);

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [error, setError] = useState<string>();

  const handleFormSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const handleFormSubmitRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password || !email || !confirmPassword) {
      setError("Please make sure all filds are filled.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Please ensure that both passwords match.");
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
    }
  };

  const renderHeaders = () => {
    if (register) {
      return (
        <div>
          <h2 className="text-4xl">Welcome Back</h2>
          <p className="text-lg opacity-50">
            Welcome back! Please enter your details.
          </p>
        </div>
      );
    }

    return (
      <div>
        <h2 className="text-4xl">Welcome</h2>
        <p className="text-lg opacity-50">
          Welcome to JobHack! Please enter your details.
        </p>
      </div>
    );
  };

  const renderSecondPassword = () => {
    if (!register) {
      return (
        <div className="mt-2">
          <label className="block">Confrim password</label>
          <input
            type={"text"}
            className="w-full h-10"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      );
    }
  };

  const renderSwitchViews = () => {
    if (!register) {
      return (
        <p className="mt-2 text-center text-sm opacity-70">
          Don't have an account?{" "}
          <span
            onClick={() => setRegister(true)}
            className="text-sky-500 cursor-pointer font-semibold"
          >
            Register
          </span>
        </p>
      );
    }
    return (
      <p className="mt-2 text-center text-sm opacity-70">
        Already have an account?{" "}
        <span
          onClick={() => setRegister(false)}
          className="text-sky-500 cursor-pointer font-semibold"
        >
          Log in
        </span>
      </p>
    );
  };

  return (
    <>
      <div className="max-w-6xl w-full mx-auto p-10 md:p-24 flex">
        <form
          className="p-12 border max-w-xl w-full"
          onSubmit={
            register
              ? (e) => handleFormSubmitLogin(e)
              : (e) => handleFormSubmitRegister(e)
          }
        >
          {renderHeaders()}
          <div>
            <p className="text-sm text-red-600 mt-1">{error}</p>
          </div>
          <div className="mt-4">
            <label className="block">Email</label>
            <input
              type={"email"}
              className="w-full h-10"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-2">
            <label className="block">Password</label>
            <input
              type={"password"}
              className="w-full h-10"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {renderSecondPassword()}
          <div className="flex justify-between mt-3">
            <div className="">
              <input type="checkbox" className="mr-2" />
              <label>Remember me</label>
            </div>
            <div className="">
              <a href="www.google.com">Forgot password</a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 text-semibold bg-sky-400 text-gray-50 rounded mt-2"
          >
            Sign in
          </button>
          <button className="w-full py-2 text-semibold flex items-center justify-center border my-2 rounded bg-white">
            <FcGoogle className="mr-2" />
            Sign in with Google
          </button>
          {renderSwitchViews()}
        </form>
        <div className="bg-registerHero w-full hidden md:flex flex-grow border"></div>
      </div>
    </>
  );
};

export default Register;
