import React, { useEffect } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import messaging from '@react-native-firebase/messaging'
import PushNotification from "react-native-push-notification"
// import { useDrawerProgress } from "@react-navigation/drawer"
import Animated from 'react-native-reanimated'

import { Screens, Urls } from '../constants'
import * as ScreensSets from '../screens'
import HomeScreenBottom from "./HomeScreenBottom";
import { DrawerContent, Header } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfileApi } from '../api/authRequests'
import useRequestConfig from '../hooks/useRequestConfig'
import showToastMessage from '../utils/showToastMessage'
import { getConversations } from '../api/chatRequests'
import { setConversations } from '../redux/actions/socketActions'
import { getArea } from '../api/dashboardRequests'
import { setArea } from '../redux/actions/dashboardActions'
import DashboardStackNavigator from './DashboardStackNavigator'

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {

  const dispatch = useDispatch()

  const socket = useSelector(state => state.socket.socket)
  const { user, initialRoute } = useSelector(state => state.auth)

  const config = useRequestConfig()

  const updateFcm = () => {
    messaging().getToken()
      .then(fcmToken => {
        const dataset = {
          firebaseId: fcmToken
        }

        return updateProfileApi(dataset, config)
      })
      .then(response => {

      })
      .catch(error => {
        showToastMessage(error.message)
      })
  }

  const initializeConversations = () => {
    getConversations(config)
      .then(response => {
        dispatch(setConversations(response.data))
      })
      .catch(error => {
        showToastMessage(error.message)
      })
  }

  const handleNotification = (remoteMessage) => {
    PushNotification.localNotification({
      channelId: 'divisional-secretariat',
      title: remoteMessage?.notification?.title,
      message: remoteMessage?.notification?.body,
      bigPictureUrl: remoteMessage?.notification?.android?.imageUrl,
    })
  }

  const joinSocketIoChannel = () => {
    if (socket) {
      socket.emit('USER_JOINED', { userId: user?._id })
    }
  }

  const getAreaDetails = () => {
    getArea(user?.area, config)
      .then(response => {
        dispatch(setArea(response.data))
      })
      .catch(error => {
        showToastMessage(error.message)
        dispatch(setArea(null))
      })
  }

  useEffect(() => {
    joinSocketIoChannel()
  }, [socket?.connected])

  useEffect(() => {
    const unsubscribe = messaging().onMessage(handleNotification)

    return unsubscribe
  }, [])

  useEffect(() => {
    updateFcm()
    initializeConversations()
    if (user?.area) getAreaDetails()
  }, [])

  // const progress = useDrawerProgress();

  // const scale = Animated.interpolateNode(progress, {
  //   inputRange: [0, 1],
  //   outputRange: [1, 0.8],
  // })

  // const borderRadius = Animated.interpolateNode(progress, {
  //   inputRange: [0, 1],
  //   outputRange: [0, 30],
  // })

  // const animatedStyle = {
  //   borderRadius,
  //   transform: [{ scale }],
  // }

  return (
    <Animated.View style={[{ flex: 1 }]}>
      <Drawer.Navigator
        drawerContent={props => <DrawerContent {...props} />}
        screenOptions={{ headerShown: false }}
        initialRouteName={initialRoute}>
         <Drawer.Screen name={Screens.DASHBOARD_SCREENS} component={DashboardStackNavigator} />
      </Drawer.Navigator>
    </Animated.View>
  )
}

export default DrawerNavigator
