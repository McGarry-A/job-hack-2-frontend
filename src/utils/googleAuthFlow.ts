export const strifg = ""

// interface props {
//   email: string;
//   firstName: string;
//   lastName: string;
// }

// const GoogleAuthFlow = async ({ email, firstName, lastName }: props) => {
//   try {
//     const data = await fetch(`https://jobhack2.herokuapp.com/api/google-auth`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         first_name: firstName,
//         last_name: lastName,
//         email,
//       }),
//     });

//     const res = await data.json();

//     if (res.status === 400) {
//       console.error("Error response from server");
//       return;
//     }
    
//     return res.state;

//   } catch (error) {
//     console.log(error);
//   }
// };

// export default GoogleAuthFlow;
