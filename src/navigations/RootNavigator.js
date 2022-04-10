import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

import { Screens } from '../constants'
import { SignIn, SignUp } from '../screens'

const Stack = createStackNavigator()

const RootNavigator = props => {

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '930030971251-poooah22anc0j0ui6jtrmu6cqtnt78b1.apps.googleusercontent.com',
    })
  }, [])

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screens.SIGN_IN} component={SignIn} />
      <Stack.Screen name={Screens.SIGN_UP} component={SignUp} />
    </Stack.Navigator>
  )
}

export default RootNavigator
