interface props {
    handleUpdateCustomer: (e: React.FormEvent<HTMLFormElement>) => void
    firstNameRef: React.RefObject<HTMLInputElement>
    lastNameRef: React.RefObject<HTMLInputElement>
    emailRef: React.RefObject<HTMLInputElement>
}
const AccountForm = ({handleUpdateCustomer, firstNameRef, lastNameRef, emailRef}: props) => {
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
            className="border w-full h-10 rounded border-gray-300 p-2"
          />
        </div>
        <div>
          <label className="block">Last Name</label>
          <input
            type="text"
            ref={lastNameRef}
            className="border w-full h-10 rounded border-gray-300 p-2"
          />
        </div>
        <div className="col-span-2">
          <label className="block">Email</label>
          <input
            type="text"
            ref={emailRef}
            className="border w-full h-10 rounded border-gray-300 p-2"
          />
        </div>
        <div className="">
          <label className="block">Confirm Current Password</label>
          <input
            type="password"
            className="border w-full h-10 rounded border-gray-300 p-2"
          />
        </div>
        <div></div>
        <div className="">
          <label className="block">New Password</label>
          <input
            type="password"
            className="border w-full h-10 rounded border-gray-300 p-2"
          />
        </div>
        <div className="">
          <label className="block">Confirm New Password</label>
          <input
            type="password"
            className="border w-full h-10 rounded border-gray-300 p-2"
          />
        </div>
        <div className="my-10">
          <button
            className="px-3 py-2 border bg-sky-400 text-gray-50 border-sky-400 rounded hover:bg-sky-300 hover:border-sky-300"
            type="submit"
          >
            Update User
          </button>
        </div>
      </form>
    )
}

export default AccountForm