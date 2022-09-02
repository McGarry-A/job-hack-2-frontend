interface props {
    email: string;
    password: string;
}

const loginEmail = async ({email, password}: props)=> {
    try {

        console.log(email, password)
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

        if (res.status === 401) {
          console.log("Unauthorized")
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