import { UserStateInterface } from "../types/UserTypes";

interface props {
    email: string;
    password: string;
}

const loginEmail = async ({email, password}: props): Promise<boolean | UserStateInterface> => {
    try {
        const data = await fetch(`https://jobhack2.herokuapp.com/api/login`, {
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
          return false
        }

        // Successfully logged in
        // Add user to global state

        return res.user
      } catch (err) {
        console.error(err);
        return false
      }
}

export default loginEmail