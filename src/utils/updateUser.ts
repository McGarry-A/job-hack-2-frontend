interface params {
    user: {
        firstName: string;
        lastName: string;
        email: string;
    }
    newUser: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }
}

const updateUser = async ({user, newUser}: params) => {
    try {
        const response = await fetch(`https://jobhack2.herokuapp.com/api/user`, {
            method: "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                user, 
                newUser
            })
        })

        const data = await response.json()
        return data.status === 200 ? true : false
        
    } catch (error) {
        if (error) console.error("Error updating customer")
        return false
    }
}

export default updateUser;