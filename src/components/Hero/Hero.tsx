import {
  AiFillApple,
  AiFillFacebook,
  AiFillAmazonSquare,
  AiFillGoogleCircle,
  AiOutlineSearch
} from "react-icons/ai";
import { BsMicrosoft } from "react-icons/bs";
import { RiNetflixFill } from "react-icons/ri";

const Hero = () => {
  const renderNav = () => {
    return (
      <header className="flex justify-between p-8">
        <div></div>
        <nav className="flex justify-end">
          <ul className="flex space-x-5 items-center">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">About</li>
            <li className="cursor-pointer">Contact</li>
            <li>
              <button className="border-2 px-4 py-2 ml-4 rounded">
                Log In
              </button>
            </li>
            <li>
              <button className="border-2 px-4 py-2 bg-blue-500 border-blue-500 rounded">
                Register
              </button>
            </li>
          </ul>
        </nav>
      </header>
    );
  };
  const renderIcons = () => {
    const icons = [
      AiFillAmazonSquare,
      AiFillApple,
      AiFillFacebook,
      AiFillGoogleCircle,
      BsMicrosoft,
      RiNetflixFill,
    ];

    return (
      <div className="flex space-x-11 justify-center pt-10 pb-24">
        {icons.map((El) => {
          return <El size={"5rem"} className="text-white opacity-70" />;
        })}
      </div>
    );
  };

  return (
    <div className="bg-hero bg-opacity-0 w-full text-gray-50">
      {renderNav()}
      <div className=" w-full h-full flex justify-center flex-col items-center py-10">
        <h1 className="text-7xl font-bold text-center text-gray-50 w-2/3">
          The job board for developers, made by developers.
        </h1>
        <p className="w-full text-center uppercase text-sm font-bold opacity-50 my-6 text-gray-50">
          Trusted by developers from around the world
        </p>
      </div>
      {renderIcons()}
    </div>
  );
};

export default Hero;
