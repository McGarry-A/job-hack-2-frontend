import Navbar from "../components/Layout/Navbar/Navbar";
import { useEffect, useState } from "react";
import Footer from "../components/Layout/Footer/Footer";
import { useAppDispatch } from "../store";
import { setNotification } from "../store/notificationSlice";
import { motion } from "framer-motion";
import RouteVar from "../animations/Route";
import Breadcrumbs from "../components/Layout/Breadcrumbs/Breadcrumbs";
import PageTitle from "../components/Layout/PageTitle/PageTitle";
import ContactForm from "../components/Forms/ContactForm/ContactForm";

const Contact = () => {
  const [subject, setSubject] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [phone, setPhone] = useState<string>();

  const [error, setError] = useState<string>("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    setError("");
  }, [subject, message, firstName, lastName, email, phone]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!subject || !message || !firstName || !lastName || !email || !phone) {
      setError("Please ensure all fields are filled");
      return;
    }

    dispatch(
      setNotification({
        state: false,
        status: "success",
        message:
          "Your message has been successfully sent. Our team will reiview and get back to you as soon as possible.",
      })
    );
  };

  const breadcrumbs = [
    { title: "Home", link: "/" },
    { title: "Contact", link: "/contact" },
  ];

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
        <ContactForm 
          handleFormSubmit={handleFormSubmit} 
          setEmail={setEmail} 
          setPhone={setPhone} 
          setFirstName={setFirstName} 
          setLastName={setLastName} 
          setMessage={setMessage} 
          setSubject={setSubject} 
          error={error}
           />
        {renderContactDetails()}
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <motion.div
        variants={RouteVar}
        initial="hidden"
        animate="show"
        exit={{ opacity: 0 }}
      >
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <PageTitle title="Contact" />
        {renderForm()}
      </motion.div>
      <Footer />
    </div>
  );
};

export default Contact;
