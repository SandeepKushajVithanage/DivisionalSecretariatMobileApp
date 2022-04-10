import authActionTypes from "../actions/authActions"

const initialState = {
    user: null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authActionTypes.SET_USER:
            return { ...state, user: action.payload }

        default:
            return state
    }
}

export default authReducer