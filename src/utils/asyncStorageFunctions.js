import AsyncStorage from '@react-native-async-storage/async-storage'
import showToastMessage from './showToastMessage';

export const setKeys = async (key, value, callBack = null) => {
  try {
    await AsyncStorage.setItem(key, value, () => {
      if (callBack) {
        callBack()
      }
    });
  } catch (error) {
    console.error(error)
    showToastMessage(error.message)
  }
}

export const getKeys = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    const data = jsonValue != null ? JSON.parse(jsonValue) : null
    return data;
  } catch (error) {
    console.error(error);
    showToastMessage(error.message)
  }
}

export const removeKeys = async key => {
  return await AsyncStorage.removeItem(key)
}
