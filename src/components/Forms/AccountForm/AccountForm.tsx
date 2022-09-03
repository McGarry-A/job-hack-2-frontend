interface props {
  handleUpdateCustomer: (e: React.FormEvent<HTMLFormElement>) => void;
  firstNameRef: React.RefObject<HTMLInputElement>;
  lastNameRef: React.RefObject<HTMLInputElement>;
  emailRef: React.RefObject<HTMLInputElement>;
  newPassRef: React.RefObject<HTMLInputElement>;
  newPassConfRef: React.RefObject<HTMLInputElement>;
}
const AccountForm = ({
  handleUpdateCustomer,
  firstNameRef,
  lastNameRef,
  emailRef,
  newPassRef,
  newPassConfRef,
}: props) => {
  return (
    <form
      className="grid grid-cols-2 w-full mx-auto gap-3"
      onSubmit={(e) => handleUpdateCustomer(e)}
    >
      <div>
        <label className="block">First Name</label>
        <input
          type="text"
          ref={firstNameRef}
          disabled
          className="border w-full h-10 rounded border-gray-300 p-2 focus-visible:outline-sky-300"
        />
      </div>
      <div>
        <label className="block">Last Name</label>
        <input
          type="text"
          ref={lastNameRef}
          disabled
          className="border w-full h-10 rounded border-gray-300 p-2 focus-visible:outline-sky-300"
        />
      </div>
      <div className="col-span-2">
        <label className="block">Email</label>
        <input
          type="text"
          ref={emailRef}
          disabled
          className="border w-full h-10 rounded border-gray-300 p-2 focus-visible:outline-sky-300"
        />
      </div>
      <div className="">
        <label className="block">New Password</label>
        <input
          type="password"
          className="border w-full h-10 rounded border-gray-300 p-2 focus-visible:outline-sky-300"
          ref={newPassRef}
        />
      </div>
      <div className="">
        <label className="block">Confirm New Password</label>
        <input
          type="password"
          className="border w-full h-10 rounded border-gray-300 p-2 focus-visible:outline-sky-300"
          ref={newPassConfRef}
        />
      </div>
      <div className="my-10">
        <button
          className="px-3 py-2 border bg-sky-400 text-gray-50 border-sky-400 rounded hover:bg-sky-300 hover:border-sky-300 focus-visible:outline-sky-300"
          type="submit"
        >
          Update User
        </button>
      </div>
    </form>
  );
};

export default AccountForm;
