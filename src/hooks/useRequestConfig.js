import { useSelector } from "react-redux"

const useRequestConfig = headers => {
    const user = useSelector(state => state.auth.user)

    const config = {
        headers: {
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: user?.token,
            // firebaseId: user?.firebaseId,
            // email: user?.email,
            ...headers
        }
    }

    return config
}

export default useRequestConfig