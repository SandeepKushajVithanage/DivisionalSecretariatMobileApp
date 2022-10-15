import { loaderActionTypes } from "../reducers/loaderReducer";

export const setSignInLoader = payload => ({ type: loaderActionTypes.SET_SIGN_IN_LOADER , payload })

export const setSignUpLoader = payload => ({ type: loaderActionTypes.SET_SIGN_UP_LOADER, payload })