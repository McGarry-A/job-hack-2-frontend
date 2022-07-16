interface props {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const registerEmail = async ({ firstName, lastName, email, password}: props) => {

  try {
    const data = await fetch(`${process.env.SERVER_API}api/user`, {
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

      if (res.status === 400) {
        console.error("Error response from server");
        return;
      }
      return res.state
    } catch (error) {
      console.error(error);
      return false
    }
  };

export default registerEmail;