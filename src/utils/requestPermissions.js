import { PermissionsAndroid, Platform } from 'react-native'
import showToastMessage from './showToastMessage'

export const requestPermissions = async () => {
    if (Platform.OS === 'ios') return true
    try {
        const result_1 = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
        const result_2 = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
        const result_3 = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
        const result_4 = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO)

        if (
            result_1 === PermissionsAndroid.RESULTS.GRANTED &&
            result_2 === PermissionsAndroid.RESULTS.GRANTED &&
            result_3 === PermissionsAndroid.RESULTS.GRANTED &&
            result_4 === PermissionsAndroid.RESULTS.GRANTED
        ) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.error(error)
        showToastMessage(error.message)
        return false
    }
}