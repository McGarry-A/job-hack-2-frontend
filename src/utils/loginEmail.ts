interface props {
    email: string;
    password: string;
}

const loginEmail = async ({email, password}: props) => {
    try {
        const data = await fetch("/login", {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const res = await data.json();

        if (res.message !== "Success") {
          console.log("Error");
          return;
        }

        // Successfully logged in
        // Add user to global state
        console.log(res.message);
        console.log(res.user);
        return true
      } catch (err) {
        console.error(err);
        return false
      }
}

export default loginEmail