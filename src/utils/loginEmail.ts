import { UserStateInterface } from "../types/UserTypes";

interface props {
    email: string;
    password: string;
}

const loginEmail = async ({email, password}: props): Promise<boolean | UserStateInterface> => {
    try {
        const data = await fetch(`http://localhost:5000/api/login`, {
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

        const loggedInUser: UserStateInterface = res.user

        console.log(loggedInUser)
        return loggedInUser
      } catch (err) {
        console.error(err);
        return false
      }
}

export default loginEmail