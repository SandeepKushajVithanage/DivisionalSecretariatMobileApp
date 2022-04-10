import 'react-native-gesture-handler'

import React, { useEffect } from 'react'
import { AppRegistry, LogBox, StatusBar } from 'react-native'
import { Provider } from 'react-redux'

import App from './App'
import { name as appName } from './app.json'
import configureStore from './src/redux/store'
import { Colors } from './src/constants'

const store = configureStore()

const StoreProvider = () => {

    LogBox.ignoreLogs(ignoreLogs)

    return (
        <Provider store={store}>
            <App />
            <StatusBar backgroundColor={Colors.primaryColor}/>
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => StoreProvider);


const ignoreLogs = [
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]
