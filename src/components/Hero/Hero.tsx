import {
  AiFillApple,
  AiFillFacebook,
  AiFillAmazonSquare,
  AiFillGoogleCircle,
} from "react-icons/ai";
import { BsMicrosoft } from "react-icons/bs";
import { RiNetflixFill } from "react-icons/ri";
import Navbar from "../Navbar/Navbar";

const Hero = () => {
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
        {icons.map((El, index) => {
          return (
            <El key={index} size={"5rem"} className="text-white opacity-70" />
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-hero w-full text-gray-50">
      <Navbar />
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
