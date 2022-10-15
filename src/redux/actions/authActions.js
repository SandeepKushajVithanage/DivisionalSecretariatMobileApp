import { authActionTypes } from "../reducers/authReducer"

export const setUser = payload => ({ type: authActionTypes.SET_USER, payload })
