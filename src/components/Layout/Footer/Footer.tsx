import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillInstagram,
} from "react-icons/ai";
import { BsGithub } from "react-icons/bs";
import { GrLinkNext } from "react-icons/gr";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const renderSocialIcons = () => {
    const icons = [
      AiFillFacebook,
      AiFillInstagram,
      AiFillTwitterSquare,
      BsGithub,
    ];

    return (
      <div className="flex justify-center md:justify-start mt-4 md:mt-0">
        {icons.map((El, index) => {
          return (
            <div
              className="cursor-pointer text-gray-600 hover:text-sky-500 mt-2 transition duration-150"
              key={index}
            >
              <El size="3rem" className="mr-2 " />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <footer className="border-t flex flex-col md:flex-row font-sans justify-evenly p-4 space-x-3 w-full mt-auto">
      <div className="my-2 text-center md:text-left">
        <h2 className="text-xl">JobHack2</h2>
        <p className="opacity-50 md:w-3/4 tracking-wide text-sm">
          The leading job board for developers, made by developers
        </p>
      </div>
      <div className="flex justify-center space-x-10 my-4 md:my-0">
        <nav className="flex flex-col my-2">
          <ul className="flex flex-col space-y-2">
            <li className="text-xl font-bold">Pages</li>
            <li className="opacity-50">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="opacity-50">
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li className="opacity-50">
              <NavLink to="/register">My Account</NavLink>
            </li>
          </ul>
        </nav>
        <div className="flex flex-col my-2">
          <ul className="space-y-2">
            <li className="text-xl font-bold">Join us</li>
            <li className="opacity-50">
              <NavLink to="/register">Login</NavLink>
            </li>
            <li className="opacity-50">
              <NavLink to="/register">Register</NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div className="space-y-1 flex flex-col my-2">
          <h5 className="text-lg font-bold">Connect With Us</h5>
          <p className="opacity-50">
            Be the first to hear about the latest news and job listings on the
            site.
          </p>
          <div className="flex justify-between items-center border py-2 px-3">
            <input
              type="email"
              placeholder="Email address"
              className="max-w-lg w-full h-10 focus:outline-none"
            />
            <GrLinkNext size="1.5rem" className="cursor-pointer" />
          </div>
          {renderSocialIcons()}{" "}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
