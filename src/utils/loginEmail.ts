interface props {
    email: string;
    password: string;
}

const loginEmail = async ({email, password}: props) => {
    try {
        const data = await fetch("http://localhost:5001/login", {
          method: "POST",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const res = await data.json();
        console.log(res)

        if (res.message !== "Success") {
          console.log("Error fetching from server");
          return;
        }

        // Successfully logged in
        // Add user to global state
        console.log(res.user);

        return true
      } catch (err) {
        console.error(err);
        return false
      }
}

export default loginEmail