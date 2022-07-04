import Navbar from "../components/Navbar/Navbar";
import { GrFormNext } from "react-icons/gr";
import { NavLink } from "react-router-dom";

const Contact = () => {
  const renderBreadcrumbs = () => {
    return (
      <div className="flex space-x-2 items-center justify-center my-24">
        <NavLink
          to="/"
          className="opacity-50 text-xs uppercase tracking-widest mt-1"
        >
          Home
        </NavLink>
        <GrFormNext size={"1.3rem"} className="opacity-50" />
        <NavLink
          to="/contact"
          className="text-xs uppercase tracking-widest mt-1"
        >
          Contact
        </NavLink>
      </div>
    );
  };

  const renderHero = () => {
    return (
      <div className="my-10 mx-auto text-center">
        <h2 className="text-5xl font-semibold">Contact JobHack</h2>
      </div>
    );
  };

  const renderContactDetails = () => {
    return (
      <div className="max-w-2xl flex flex-col text-gray-900 p-8">
        <h5 className="mt-2 mb-4 text-lg">Other Ways To Reach Us</h5>
        <div>
          <h6 className="font-semibold text-sm tracking-wide text-gray-500 mb-2">
            Email
          </h6>
          <p className="text-sm opacity-50 mb-2">
            <a href="www.google.com" className="text-sky-500 underline">
              atomcgarry@gmail.com
            </a>
          </p>
        </div>
        <div>
          <h6 className="font-semibold text-sm tracking-wide text-gray-500 mb-2">
            Mailing Address
          </h6>
          <p className="text-sm opacity-50 mb-2">
            15 Laburnham Avenue, Lostockhall
          </p>
          <p className="text-sm opacity-50 mb-2">Preston PR55AY</p>
        </div>
        <div>
          <h6 className="font-semibold text-sm tracking-wide text-gray-500 mb-2">
            Contact Number
          </h6>
          <p className="text-sm opacity-50 mb-2">
            For urgent enquiries, plase call
          </p>
          <p className="text-sm opacity-50 mb-2">atomcgarry@gmail.com</p>
        </div>
      </div>
    );
  };

  const renderForm = () => {
    return (
      <div className="max-w-6xl mx-auto bg-white rounded flex mb-24">
        <form className="grid grid-cols-2 gap-3 p-8 flex-grow">
          <div className="col-span-2">
            <label className="block">
              Subject <span className="text-red-700 font-bold">*</span>
            </label>
            <input
              type="text"
              className="border w-full h-10 rounded border-gray-300"
            />
          </div>
          <div className="col-span-2">
            <label className="block">
              Message <span className="text-red-700 font-bold">*</span>
            </label>
            <textarea
              rows={10}
              className="border w-full rounded border-gray-300"
            />
          </div>
          <div className="col-span-1">
            <label className="block">
              First Name <span className="text-red-700 font-bold">*</span>
            </label>
            <input
              type="text"
              className="border w-full rounded border-gray-300 h-10"
            />
          </div>
          <div className="col-span-1">
            <label className="block">
              Last Name <span className="text-red-700 font-bold">*</span>
            </label>
            <input
              type="text"
              className="border w-full rounded border-gray-300 h-10"
            />
          </div>
          <div className="col-span-1">
            <label className="block">
              Email <span className="text-red-700 font-bold">*</span>
            </label>
            <input
              type="text"
              className="border w-full rounded border-gray-300 h-10"
            />
          </div>
          <div className="col-span-1">
            <label className="block">
              Phone <span className="text-red-700 font-bold">*</span>
            </label>
            <input
              type="text"
              className="border w-full rounded border-gray-300 h-10"
            />
          </div>
          <div className="my-10">
            <button
              className="px-3 py-2 border bg-sky-400 text-gray-50 border-sky-400 rounded"
              type="submit"
            >
              Send Message
            </button>
          </div>
        </form>
        {renderContactDetails()}
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      {renderBreadcrumbs()}
      {renderHero()}
      {renderForm()}
    </div>
  );
};

export default Contact;
