import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillInstagram,
} from "react-icons/ai";
import { BsGithub } from "react-icons/bs";

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
      <nav className="flex flex-col justify-center">
        <ul className="flex text-lg flex-col">
          <li className="text-xl font-bold">Pages</li>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
      <div className="flex flex-col justify-center">
        <ul className="space-y-2">
          <li className="text-xl font-bold">Join us</li>
          <li>
            <button className="border px-3 py-1 w-24">Login</button>
          </li>
          <li>
            <button className="border px-3 py-1 w-24 bg-blue-600 text-white font-semibold">
              Register
            </button>
          </li>
        </ul>
      </div>
      <div>
        <div className="space-y-1">
          <h5 className="text-xl font-bold">Connect With Us</h5>
          <p>
            Follow us on social media, and plug your email in to be the first to
            hear about the latest news and job listings on the site.
          </p>
          <input
            type="email"
            placeholder="Email address"
            className="border p-2 max-w-lg w-full h-10"
          />
          <button className="border px-3 py-1 w-24 h-10 ml-2 text-white font-semibold bg-blue-600 rounded">
            Submit
          </button>
          {renderSocialIcons()}{" "}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
