import axios from "axios";
import { useEffect, useState } from "react";

const useIndeedToken = () => {
    const [isLoading, setIsLoading] = useState<boolean>()
    const [error, setIsError] = useState<boolean>()
    const [token, setToken] = useState()

    useEffect(() => {
        const getToken = async () => {
            try {
                const options = {
                    method: "POST",
                    url: "https://apis.indeed.com/oauth/v2/tokens",
                    params: {
                        client_id: process.env.INDEED_CLIENT_ID,
                        client_secret: process.env.INDEED_SECRET,
                        grant_type: "client_credentials"
                    }
                }

                const response = await axios.request(options)
                setToken(response.data.access_token)
                setIsError(false)
                setIsLoading(false)

            } catch (error) {
                console.error(error)
                setIsError(true)
                setIsLoading(false)
            }
        }


        getToken()
    }, [])

    return { isLoading, error, token }
}

export default useIndeedToken;