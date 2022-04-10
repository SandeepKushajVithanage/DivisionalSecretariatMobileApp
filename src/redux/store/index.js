import { combineReducers, createStore } from "redux"
import authReducer from '../reducers/authReducer'

const configureStore = () => {
    const combinedReducer = combineReducers({
        auth: authReducer,
    })

    const store = createStore(combinedReducer)

    return store
}

export default configureStore