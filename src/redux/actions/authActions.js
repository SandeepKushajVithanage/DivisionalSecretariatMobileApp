const authActionTypes = {
    SET_USER: 'SET_USER',
}

export const setUser = payload => ({ type: authActionTypes.SET_USER, payload })

export default authActionTypes