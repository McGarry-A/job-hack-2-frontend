import {
  AiFillApple,
  AiFillFacebook,
  AiFillAmazonSquare,
  AiOutlineTwitter,
  AiOutlineAmazon,
  AiOutlineAlibaba,
} from "react-icons/ai";
import { motion } from "framer-motion";
import { RiNetflixFill } from "react-icons/ri";
import { GrGoogle } from "react-icons/gr";
import { TbBrandAirbnb } from "react-icons/tb";
import { FaUber, FaSalesforce, FaPaypal } from "react-icons/fa";
import {
  SiDeliveroo,
  SiSamsung,
  SiIntel,
  SiShopify,
  SiTesla,
  SiAdobe,
  SiCisco,
  SiNintendo,
  SiXbox,
  SiPlaystation,
  SiHuawei,
} from "react-icons/si";
import Navbar from "../Navbar/Navbar";

const Hero = () => {
  const renderIcons = () => {
    const icons = [
      AiFillAmazonSquare,
      AiFillApple,
      AiFillFacebook,
      GrGoogle,
      RiNetflixFill,
      TbBrandAirbnb,
      FaUber,
      SiDeliveroo,
      SiSamsung,
      SiIntel,
      FaSalesforce,
      FaPaypal,
      SiShopify,
      AiOutlineTwitter,
      SiTesla,
      AiOutlineAmazon,
      SiAdobe,
      AiOutlineAlibaba,
      SiCisco,
      SiNintendo,
      SiXbox,
      SiPlaystation,
      SiHuawei,
    ];

    return (
      <motion.div
        className="flex space-x-24 justify-center pt-10 pb-24 opacity-50 px-10 overflow-hidden"
        initial=""
        animate={{ x: "30%" }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      >
        {icons.map((El, index) => {
          return (
            <El
              key={index}
              size={"5rem"}
              className="text-white opacity-70 w-26 flex shrink-0"
            />
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className="bg-hero w-full text-gray-50 [mask-image:linear-gradient(to bottom, transparent 100%, black)]">
      <div className="bg-gradient-to-b from-transparent via-transparent to-black ">
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
    </div>
  );
};

export default Hero;
