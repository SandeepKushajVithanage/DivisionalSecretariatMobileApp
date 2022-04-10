import { ToastAndroid } from 'react-native'

const showToastMessage = (text, duration=ToastAndroid.SHORT) => {
    ToastAndroid.show(text, duration)
}

export default showToastMessage