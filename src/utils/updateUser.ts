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
        const response = await fetch("http://localhost:5001/api/user", {
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
        console.log(data)
    } catch (error) {
        if (error) console.error("Error updating customer")
    }
}

export default updateUser;