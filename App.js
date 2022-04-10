import { LogBox } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth'
import { useDispatch } from 'react-redux'

import Routes from './src/navigations/Routes'
import { setUser } from './src/redux/actions/authActions'
import { Splash } from './src/screens'
import { AuthRequest } from './src/api'
import { Urls } from './src/constants'
import showToastMessage from './src/utils/showToastMessage'

const App = props => {

  const dispatch = useDispatch()

  const [initializing, setInitializing] = useState(true)

  const onAuthStateChanged = async user => {
    if (user == null) {
      dispatch(setUser(user))
      if (initializing) setTimeout(() => setInitializing(false), 1000)
      return
    }

    const userData = await user?.getIdTokenResult()
    console.log({ email: userData.claims.email, firebaseId: userData.claims.sub})
    const config = {
      headers: {
        Authorization: userData?.token,
        // email: userData.claims.email, firebaseId: userData.claims.sub
      }
    }

    AuthRequest.get(Urls.GET_CURRENT_USER, config)
      .then(response => {
        console.log(response.data)
        dispatch(setUser({ ...response.data, token: userData?.token }))
      })
      .catch(error => {
        console.error(error)
        showToastMessage(error.message)
      })
      .finally(() => {
        if (initializing) setTimeout(() => setInitializing(false), 1000)
      })
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [])

  if (initializing) return <Splash />

  return (
    <Routes />
  )
}

export default App
