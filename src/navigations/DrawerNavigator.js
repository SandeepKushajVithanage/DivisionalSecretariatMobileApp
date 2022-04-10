import React from 'react'
import { View } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Screens } from '../constants'
import * as ScreensSets from '../screens'
import HomeScreenBottom from "./HomeScreenBottom";
import { DrawerContent, Header } from '../components'

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{ headerShown: false }}>
      <Drawer.Screen name={Screens.HOME_SCREEN_BOTTOM} component={HomeScreenBottom} />
      {/* <Drawer.Screen name={Screens.CREATE_NEWS} component={ScreensSets.CreateNews} /> */}
      <Drawer.Screen name={Screens.PRIVATE_CHAT} component={ScreensSets.PrivateChat} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator
