export const authActionTypes = {
    SET_USER: 'SET_USER',
    SET_INITIAL_ROUTE: 'SET_INITIAL_ROUTE',
}

const initialState = {
    user: null,
    initialRoute: null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authActionTypes.SET_USER:
            return { ...state, user: action.payload.user, initialRoute: action.payload.initialRoute }

        case authActionTypes.SET_INITIAL_ROUTE:
            return { ...state, initialRoute: action.payload }

        default:
            return state
    }
}

export default authReducer