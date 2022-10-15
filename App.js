import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth'
import { useDispatch } from 'react-redux'
import { io } from "socket.io-client"
import PushNotification from "react-native-push-notification"

import Routes from './src/navigations/Routes'
import { setUser } from './src/redux/actions/authActions'
import { addMessage, setSocket } from './src/redux/actions/socketActions'
import { Splash } from './src/screens'
import { AuthRequest } from './src/api'
import { Urls } from './src/constants'
import showToastMessage from './src/utils/showToastMessage'
import { setSignInLoader } from './src/redux/actions/loaderActions'
import { Screens } from './src/constants'
import { getCurrentUser } from './src/api/authRequests'

const App = props => {

  const dispatch = useDispatch()

  const [initializing, setInitializing] = useState(true)

  const onAuthStateChanged = async user => {
    if (user == null) {
      dispatch(setUser({ user, initialRoute: null }))
      dispatch(setSignInLoader(false))
      if (initializing) setTimeout(() => setInitializing(false), 1000)
      return
    }

    const userData = await user?.getIdTokenResult()

    const config = {
      headers: {
        Authorization: userData.token,
      },
    }
    console.log(userData)
    getCurrentUser(config)
      .then(response => {
        const shouldBeCompleteProfile = response.data.fullName == null ||
          response.data.fullName === '' ||
          response.data.phoneNumber == null || response.data.phoneNumber === '' ||
          response.data.address == null || response.data.address === '' ||
          response.data.area == null || response.data.area === ''
        dispatch(setUser({
          user: { ...response.data, token: userData?.token },
          initialRoute: shouldBeCompleteProfile ?
            Screens.USER_PROFILE : Screens.HOME_SCREEN_BOTTOM
        }))
      })
      .catch(error => {
        console.error(error)
        // showToastMessage(error.message)
      })
      .finally(() => {
        if (initializing) setTimeout(() => {
          setInitializing(false)
          dispatch(setSignInLoader(false))
        }, 1000)
      })
  }

  const createChannel = () => {
    PushNotification.createChannel({
      channelId: 'divisional-secretariat',
      channelName: 'Divisional Secretariat',
    })
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [])

  const connetToServer = async () => {
    const socket = await io.connect(Urls.BASE_URI)
    socket.on('RECIEVE_MESSAGE', data => {
      dispatch(addMessage([data]))
    })
    if (socket) dispatch(setSocket(socket))
  }



  useEffect(() => {
    connetToServer()
    createChannel()
  }, [])

  if (initializing) return <Splash />

  return (
    <Routes />
  )
}

export default App
