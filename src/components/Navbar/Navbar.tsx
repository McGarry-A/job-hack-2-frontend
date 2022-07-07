import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { removeActiveUser } from "../../store/userSlice";

const Navbar = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(removeActiveUser("LOGOUT"));
  };

  const renderIsLoggedInTabs = () => {
    const { isLoggedIn } = user;

    if (isLoggedIn === true) {
      return (
        <>
          <li>
            <NavLink to="/">
              <button className="border-2 px-4 py-1 ml-4 rounded text-gray-50 border-gray-50">
                My Account
              </button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <button className="border-2 px-4 py-1 bg-sky-500 border-sky-500 rounded text-gray-50">
                Wishlist
              </button>
            </NavLink>
          </li>
          <li>
            <button
              className="border-2 px-4 py-1 bg-sky-500 border-sky-500 rounded text-gray-50"
              onClick={() => handleLogOut()}
            >
              Logout
            </button>
          </li>
        </>
      );
    }
  };
  const renderNotLoggedInTabs = () => {
    const { isLoggedIn } = user;

    if (isLoggedIn === false) {
      return (
        <>
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
        </>
      );
    }
  };

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
          {renderNotLoggedInTabs()}
          {renderIsLoggedInTabs()}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
