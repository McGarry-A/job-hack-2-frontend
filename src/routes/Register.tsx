// import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import loginEmail from "../utils/loginEmail";
import registerEmail from "../utils/registerEmail";
import GoogleAuth from "../components/GoogleAuth";
import { NavLink } from "react-router-dom";
import { setActiveUser, userInterface } from "../store/userSlice";
import { useAppDispatch, useAppSelector } from "../store";

interface props {
  isRegister?: boolean;
}

const Register = ({ isRegister = true }: props) => {
  const [register, setRegister] = useState<boolean>(isRegister);

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [error, setError] = useState<string>();

  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();

  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.user);

  useEffect(() => {
    setError("");
  }, [email, password, confirmPassword, firstName, lastName]);

  // const handleGoogleAuth = () => {};

  const handleFormSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter a username and password");
      return;
    }

    const user: userInterface | boolean = await loginEmail({
      email,
      password,
    });

    if (typeof user === "boolean" || typeof user === "undefined") {
      setError("Failed logging in");
      return;
    }

    dispatch(setActiveUser(user));
    console.log(state);
    console.log(user);
    console.log("logged in!");
  };

  const handleFormSubmitRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password || !email || !confirmPassword || !firstName || !lastName) {
      setError("Please make sure all filds are filled.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Please ensure that both passwords match.");
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
    }

    registerEmail({ firstName, lastName, email, password });
  };

  const renderPageHeading = () => (
    <div className="flex justify-center px-12 pt-12">
      <h2 className="text-5xl font-semibold">JobHack-2</h2>
    </div>
  );

  const renderHomeLink = () => (
    <div className="flex space-x-2 items-center justify-center my-12">
      <NavLink
        to="/"
        className="opacity-50 text-xs uppercase tracking-widest mt-1"
      >
        Home
      </NavLink>
    </div>
  );

  const renderNameFields = () => {
    if (!register) {
      return (
        <div className="grid grid-cols-2 gap-2">
          <div className="mt-4">
            <label className="block">First Name</label>
            <input
              type={"text"}
              className="w-full h-10"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block">Last Name</label>
            <input
              type={"text"}
              className="w-full h-10"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
      );
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
            type={"password"}
            className="w-full h-10"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      );
    }
  };

  const renderSwitchViews = () => {
    if (register) {
      return (
        <p className="mt-2 text-center text-sm opacity-70">
          Don't have an account?{" "}
          <span
            onClick={() => setRegister(false)}
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
          onClick={() => setRegister(true)}
          className="text-sky-500 cursor-pointer font-semibold"
        >
          Log in
        </span>
      </p>
    );
  };

  return (
    <div className="">
      {renderPageHeading()}
      {renderHomeLink()}
      <div className="max-w-6xl w-full mx-auto pb-10 flex">
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
          {renderNameFields()}
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
              <a href="www.google.com" className="text-sm">
                Forgot password
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 text-semibold bg-sky-400 text-gray-50 rounded mt-2"
          >
            {register ? "Sign in" : "Register"}
          </button>
          <GoogleAuth />
          {renderSwitchViews()}
        </form>
        <div className="bg-registerHero w-full hidden md:flex flex-grow border"></div>
      </div>
    </div>
  );
};

export default Register;
