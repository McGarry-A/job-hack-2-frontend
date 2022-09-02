import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="m-auto text-center h-screen border flex flex-grow flex-col justify-center space-y-2">
      <h1 className="text-5xl font-bold text-slate-600">Page 404</h1>
      <h1 className="text-xl font-bold text-slate-600">
        The page you are looking for was not found or you do not have access to.
      </h1>
      <NavLink to="/">
        <button className="px-3 py-2 border bg-sky-400 text-gray-50 border-sky-400 rounded hover:bg-sky-300 hover:border-sky-300 uppercase tracking-wide w-36 mx-auto">
          Back to Home
        </button>
      </NavLink>
    </div>
  );
};

export default NotFound;
