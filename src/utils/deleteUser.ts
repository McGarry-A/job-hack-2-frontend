import axios from "axios"

const deleteUser = async (email: string) => {
    try {
        const options = {
            url: `https://jobhack2.herokuapp.com/api/user`,
            method: "DELETE", 
            headers: {
                "Content-Type":"application/json"
            },
            data: {
                email: email
            }
        }

        console.log(email)

        const data = await axios.request(options)
        const response = data.status === 200 ? true : false
        return response
    } catch (error) {
        console.error(error)
        return false
    }
}

export default deleteUser