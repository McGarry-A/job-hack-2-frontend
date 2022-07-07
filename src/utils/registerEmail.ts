interface props {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const registerEmail = async ({ firstName, lastName, email, password}: props) => {

  try {
    const data = await fetch("http://localhost:5001/user", {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          password,
        }),
      });

      const res = await data.json();
      console.log(res);

      if (res.message !== "Success") {
        console.error("Error response from server");
        return;
      }

      // Successfully registered
      // Add user to global state
      console.log(res.message);
      console.log(res.newUser);
      return true

    } catch (error) {
      console.error(error);
      return false
    }
  };

export default registerEmail;