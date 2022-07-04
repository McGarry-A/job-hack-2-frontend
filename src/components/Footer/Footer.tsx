import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillInstagram,
} from "react-icons/ai";
import { BsGithub } from "react-icons/bs";
import { GrLinkNext } from "react-icons/gr";

const Footer = () => {
  const renderSocialIcons = () => {
    const icons = [
      AiFillFacebook,
      AiFillInstagram,
      AiFillTwitterSquare,
      BsGithub,
    ];

    return (
      <div className="flex">
        {icons.map((El, index) => {
          return (
            <div className="cursor-pointer text-gray-600 hover:text-blue-900 mt-2">
              <El size="3rem" className="mr-2 " />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <footer className="border-t flex font-sans justify-around p-4 space-x-3">
      <nav className="flex flex-col my-2">
        <ul className="flex text-lg flex-col space-y-2">
          <li className="text-xl font-bold">Pages</li>
          <li className="opacity-50">Home</li>
          <li className="opacity-50">About</li>
          <li className="opacity-50">Contact</li>
        </ul>
      </nav>
      <div className="flex flex-col my-2">
        <ul className="space-y-2">
          <li className="text-xl font-bold">Join us</li>
          <li className="opacity-50">Login</li>
          <li className="opacity-50">Register</li>
        </ul>
      </div>
      <div>
        <div className="space-y-1 flex flex-col my-2">
          <h5 className="text-xl font-bold">Connect With Us</h5>
          <p>
            Be the first to hear about the latest news and job listings on the
            site.
          </p>
          <div className="flex justify-between items-center border py-2 px-3">
            <input
              type="email"
              placeholder="Email address"
              className="max-w-lg w-full h-10"
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
