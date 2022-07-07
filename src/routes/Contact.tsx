import Navbar from "../components/Navbar/Navbar";
import { GrFormNext } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../components/Modal/Modal";

const Contact = () => {
  const [subject, setSubject] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [phone, setPhone] = useState<string>();

  const [modalIsHidden, setModalIsHidden] = useState<boolean>(true);
  const [messageSuccessSent, setMessageSuccessSent] = useState<boolean>(false);

  const [error, setError] = useState<string>("");

  useEffect(() => {
    setError("");
  }, [subject, message, firstName, lastName, email, phone]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!subject || !message || !firstName || !lastName || !email || !phone) {
      setError("Please ensure all fields are filled");
    }

    // handle send email using emailjs

    setMessageSuccessSent(true);
  };

  const renderBreadcrumbs = () => {
    return (
      <div className="flex space-x-2 items-center justify-center my-12">
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
        <form
          className="grid grid-cols-2 gap-3 p-8 flex-grow"
          onSubmit={(e) => handleFormSubmit(e)}
        >
          <div className="gird-cols-2">
            {error && <p className="text-red-500 text-sm">*{error}</p>}
          </div>
          <div className="col-span-2">
            <label className="block">
              Subject <span className="text-red-700 font-bold">*</span>
            </label>
            <input
              type="text"
              className="border w-full h-10 rounded border-gray-300 p-2"
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="col-span-2">
            <label className="block">
              Message <span className="text-red-700 font-bold">*</span>
            </label>
            <textarea
              rows={10}
              className="border w-full rounded border-gray-300 p-2"
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <label className="block">
              First Name <span className="text-red-700 font-bold">*</span>
            </label>
            <input
              type="text"
              className="border w-full rounded border-gray-300 h-10 p-2"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <label className="block">
              Last Name <span className="text-red-700 font-bold">*</span>
            </label>
            <input
              type="text"
              className="border w-full rounded border-gray-300 h-10 p-2"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <label className="block">
              Email <span className="text-red-700 font-bold">*</span>
            </label>
            <input
              type="text"
              className="border w-full rounded border-gray-300 h-10 p-2"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <label className="block">
              Phone <span className="text-red-700 font-bold">*</span>
            </label>
            <input
              type="text"
              className="border w-full rounded border-gray-300 h-10 p-2"
              onChange={(e) => setPhone(e.target.value)}
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

  const renderModal = () => {
    if (messageSuccessSent) {
      return <Modal isHidden={modalIsHidden}>{renderModalContent()}</Modal>;
    }
  };

  const renderModalContent = () => {
    return (
      <div>
        <h3>Thank you for reaching out.</h3>
        <p>
          Our team will be reviewing your email, and will be back in touch as
          soon as possible.
        </p>
        <button onClick={() => setModalIsHidden(true)}>
          <NavLink to="/">Back To Home</NavLink>
        </button>
      </div>
    );
  };
  return (
    <div>
      <Navbar />
      {renderBreadcrumbs()}
      {renderHero()}
      {renderForm()}
      {renderModal()}
    </div>
  );
};

export default Contact;
