import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="flex justify-between p-8 bg-transparent">
      <div></div>
      <nav className="flex justify-end">
        <ul className="flex space-x-5 items-center">
          <li className="cursor-pointer">
            <NavLink to="/">Home</NavLink>
          </li>

          <li className="cursor-pointer">
            <NavLink to="/about">About</NavLink>
          </li>
          <li className="cursor-pointer">
            <NavLink to="/contact">Contact</NavLink>
          </li>
          <li>
            <NavLink to="/register">
              <button className="border-2 px-4 py-1 ml-4 rounded text-gray-50 border-gray-50">
                Log In
              </button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/register">
              <button className="border-2 px-4 py-1 bg-sky-500 border-sky-500 rounded text-gray-50">
                Register
              </button>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
