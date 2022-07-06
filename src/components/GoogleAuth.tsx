import GoogleLogin from "react-google-login";
import { FcGoogle } from "react-icons/fc";

const GoogleAuth = () => {
  const log = () => console.log("log");
  return (
    <GoogleLogin
      clientId="721662196942-0s1kgfnm01rp998ir53vribm7dmvmagk.apps.googleusercontent.com"
      render={() => (
        <button className="w-full py-2 text-semibold flex items-center justify-center border my-2 rounded bg-white">
          <FcGoogle className="mr-2" />
          Sign in with Google
        </button>
      )}
      onSuccess={log}
      onFailure={log}
    />
  );
};

export default GoogleAuth;
