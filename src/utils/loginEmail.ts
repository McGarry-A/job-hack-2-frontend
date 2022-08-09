import { UserStateInterface } from "../types/UserTypes";

interface props {
    email: string;
    password: string;
}

const loginEmail = async ({email, password}: props): Promise<boolean | UserStateInterface> => {
    try {

        console.log(email, password)
        const data = await fetch(`http://localhost:5001/api/login`, {
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

        const loggedInUser = res.user
        const parsedUser = {
          ...loggedInUser,
          savedJobs: JSON.parse(loggedInUser.savedJobs)
        }

        console.log(parsedUser)
        return parsedUser
      } catch (err) {
        console.error(err);
        return false
      }
}

export default loginEmail