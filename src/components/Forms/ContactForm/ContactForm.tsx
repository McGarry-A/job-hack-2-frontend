import { Dispatch, SetStateAction } from "react";

interface props {
    handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    setSubject: Dispatch<SetStateAction<string | undefined>>
    setMessage: Dispatch<SetStateAction<string | undefined>>
    setFirstName: Dispatch<SetStateAction<string | undefined>>
    setLastName: Dispatch<SetStateAction<string | undefined>>
    setEmail: Dispatch<SetStateAction<string | undefined>>
    setPhone: Dispatch<SetStateAction<string | undefined>>
    error: string
}

const ContactForm = ({handleFormSubmit, setSubject, setMessage, setFirstName, setLastName, setEmail, setPhone, error}: props) => {
    return (
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
                className="border w-full h-10 rounded border-gray-300 p-2 focus-visible:outline-sky-300"
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <label className="block">
                Message <span className="text-red-700 font-bold">*</span>
              </label>
              <textarea
                rows={10}
                className="border w-full rounded border-gray-300 p-2 focus-visible:outline-sky-300"
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="col-span-1">
              <label className="block">
                First Name <span className="text-red-700 font-bold">*</span>
              </label>
              <input
                type="text"
                className="border w-full rounded border-gray-300 h-10 p-2 focus-visible:outline-sky-300"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="col-span-1">
              <label className="block">
                Last Name <span className="text-red-700 font-bold">*</span>
              </label>
              <input
                type="text"
                className="border w-full rounded border-gray-300 h-10 p-2 focus-visible:outline-sky-300"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="col-span-1">
              <label className="block">
                Email <span className="text-red-700 font-bold">*</span>
              </label>
              <input
                type="text"
                className="border w-full rounded border-gray-300 h-10 p-2 focus-visible:outline-sky-300"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-span-1">
              <label className="block">
                Phone <span className="text-red-700 font-bold">*</span>
              </label>
              <input
                type="text"
                className="border w-full rounded border-gray-300 h-10 p-2 focus-visible:outline-sky-300"
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
      );
}

export default ContactForm