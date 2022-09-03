import { useEffect, useRef, useState } from "react";

import { setActiveUser } from "../store/userSlice";
import { useAppDispatch } from "../store";

import Breadcrumbs from "../components/Layout/Breadcrumbs/Breadcrumbs";
import PageTitle from "../components/Layout/PageTitle/PageTitle";
import Navbar from "../components/Layout/Navbar/Navbar";
import Footer from "../components/Layout/Footer/Footer";

import loginEmail from "../utils/loginEmail";
import registerEmail from "../utils/registerEmail";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import RouteVar from "../animations/Route";
import RegisterHero from "../images/register-hero.jpg";
import { useToast } from "@chakra-ui/react";

import bcrypt from "bcrypt"
// import jwt_decode from "jwt-decode";
// import GoogleAuthFlow from "../utils/googleAuthFlow";
// import { UserObjectInterface } from "../types/GoogleAuthTypes";
import ContentWrapper from "../components/Layout/ContentWrapper/ContentWrapper";
import { setJobs } from "../store/savedJobsSlice";

interface props {
  isRegister?: boolean;
}

const Register = ({ isRegister = true }: props) => {
  const [register, setRegister] = useState<boolean>(isRegister);

  const [email, setEmail] = useState<string>("test@testing.com");
  const [password, setPassword] = useState<string>("testtest");
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [error, setError] = useState<string>();
  const [rememberMe, setRememberMe] = useState<boolean>(false)

  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const googleAuthRef = useRef<HTMLDivElement>(null);

  // const jobs = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const salt = bcrypt.genSaltSync(10)

  const handleCallbackResponse = (res: any, error: any) => {
    if (error) return;

    // const userObject: UserObjectInterface = jwt_decode(res.credential);
    // GoogleAuthFlow({
    //   email: userObject.email,
    //   lastName: userObject.family_name,
    //   firstName: userObject.given_name,
    // });
  };

  // aud: "721662196942-9bnq2ileopd4mb4c0a7qi4brqbuqmpfo.apps.googleusercontent.com"
  // azp: "721662196942-9bnq2ileopd4mb4c0a7qi4brqbuqmpfo.apps.googleusercontent.com"
  // email: "atomcgarry@gmail.com"
  // email_verified: true
  // exp: 1659981039
  // family_name: "McGarry"
  // given_name: "Ahmed"
  // iat: 1659977439
  // iss: "https://accounts.google.com"
  // jti: "b0d13767f1f76ad1932406d9622b53f4b018eaa8"
  // name: "Ahmed McGarry"
  // nbf: 1659977139
  // picture: "https://lh3.googleusercontent.com/a/AItbvmkOGiR8XtPCSDanzArZtJGL9TJCHqvjV4ky8qab=s96-c"
  // sub: "115729128147296944785"

  useEffect(() => {
    if (googleAuthRef.current) {
      /* global google */
      //@ts-ignore
      window.google.accounts.id.initialize({
        client_id:
          "721662196942-9bnq2ileopd4mb4c0a7qi4brqbuqmpfo.apps.googleusercontent.com",
        callback: handleCallbackResponse,
      });

      //@ts-ignore
      google.accounts.id.renderButton(googleAuthRef.current, {
        theme: "outline",
        size: "large",
        width: "100%",
      });
    }
  }, []);

  useEffect(() => {
    if (emailRef.current && passwordRef.current) {
      emailRef.current.value = "test@testing.com";
      passwordRef.current.value = "testtest";
    }

    toast({
      title: "Demo User",
      description:
        "A demo user has already been entered for you to login, or create an account and test it yourself!",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
  }, []);

  useEffect(() => {
    setError("");
  }, [email, password, confirmPassword, firstName, lastName]);

  const handleFormSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter a username and password");
      return;
    }

    const user = await loginEmail({
      email,
      password,
    });

    console.log(user);
    if (typeof user === "boolean" || typeof user === "undefined") {
      toast({
        title: "Error Logging In",
        description: "Please ensure you entered the correct details",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      return;
    }

    dispatch(setActiveUser(user));
    dispatch(setJobs(user.savedJobs));

    // save to cache
    if (rememberMe) {
      localStorage.setItem("jobhack_user", JSON.stringify(user))
    }

    toast({
      title: "Success",
      description: "Successfully Logged In",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    navigate("/");
  };

  const handleFormSubmitRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
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

    const hashedPassword = bcrypt.hashSync(password, salt)

    const user = await registerEmail({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    if (user === null) {
      toast({
        title: "Error",
        description:
          "There was a problem registering your account. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      return;
    }

    dispatch(setActiveUser(user));

    toast({
      title: "Success",
      description: "Account has been created",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });

    navigate("/");
  };

  const breadcrumbs = [
    { title: "Home", link: "/" },
    { title: "Register", link: "/register" },
  ];

  const renderNameFields = () => {
    if (!register) {
      return (
        <div className="grid grid-cols-2 gap-2">
          <div className="mt-4">
            <label className="block">First Name</label>
            <input
              type={"text"}
              className="w-full h-10 p-2 focus-visible:outline-sky-300"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block">Last Name</label>
            <input
              type={"text"}
              className="w-full h-10 p-2 focus-visible:outline-sky-300"
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
            className="w-full h-10 p-2 focus-visible:outline-sky-300"
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
    <ContentWrapper>
      <div className="flex flex-col h-screen">
        <Navbar />
        <motion.div
          variants={RouteVar}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0 }}
        >
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          <PageTitle title={register ? "Login" : "Register"} />
          <div className="max-w-6xl w-full mx-auto mb-10 flex shadow-sm">
            <form
              className="p-12 outline-gray-500 max-w-xl w-full flex flex-col justify-center space-y-4 bg-gray-50"
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
                  className="w-full h-10 p-2 focus-visible:outline-sky-300"
                  ref={emailRef}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <label className="block">Password</label>
                <input
                  type={"password"}
                  className="w-full h-10 p-2 focus-visible:outline-sky-300"
                  ref={passwordRef}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {renderSecondPassword()}
              <div className="flex justify-between mt-3">
                <div className="">
                  <input type="checkbox" className="mr-2 checked:accent-sky-900" onChange={(e) => setRememberMe(e.target.checked)}/>
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
                className="w-full py-2 text-semibold bg-sky-400 text-gray-50 rounded mt-2 hover:bg-sky-300"
              >
                {register ? "Sign in" : "Register"}
              </button>
              {/* <div
                id="googleSignInButton"
                ref={googleAuthRef}
                className="mx-auto"
              ></div> */}
              {renderSwitchViews()}
            </form>
            <div className="w-full hidden md:flex">
              <img
                src={RegisterHero}
                alt="Register/Login"
                className="object-cover"
              />
            </div>
          </div>
          <Footer />
        </motion.div>
      </div>
    </ContentWrapper>
  );
};

export default Register;
