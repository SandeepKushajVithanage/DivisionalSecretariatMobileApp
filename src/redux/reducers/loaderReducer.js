export const loaderActionTypes = {
    SET_SIGN_IN_LOADER: 'SET_SIGN_IN_LOADER',
    SET_SIGN_UP_LOADER: 'SET_SIGN_UP_LOADER',
}

const initialState = {
    signIn: false,
    signUp: false,
}

const loaderReducer = (state = initialState, action) => {
    switch (action.type) {
        case loaderActionTypes.SET_SIGN_IN_LOADER:
            return { ...state, signIn: action.payload }

        case loaderActionTypes.SET_SIGN_UP_LOADER:
            return { ...state, signUp: action.payload }

        default:
            return state
    }
}

export default loaderReducer