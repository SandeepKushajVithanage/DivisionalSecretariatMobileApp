import { combineReducers, createStore } from "redux"

import authReducer from '../reducers/authReducer'
import loaderReducer from "../reducers/loaderReducer"
import socketReducer from "../reducers/socketReducer"
import dashboardReducer from "../reducers/dashboardReducer"

const configureStore = () => {
    const combinedReducer = combineReducers({
        auth: authReducer,
        loader: loaderReducer,
        socket: socketReducer,
        dashboard: dashboardReducer,
    })

    const store = createStore(combinedReducer)

    return store
}

export default configureStore