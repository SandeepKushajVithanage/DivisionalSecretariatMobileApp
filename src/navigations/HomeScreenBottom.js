import React from "react"
import { View, Text } from 'react-native'
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { useSelector } from 'react-redux'

import { AllMessages, HomeScreen, NewsFeed, CreateNews, Settings, OfficersChatList, MyArea } from "../screens"
import { Colors, Screens } from "../constants"
import { Header } from "../components"

const BottomNavigation = createMaterialBottomTabNavigator()

const HomeScreenBottom = props => {

  const user = useSelector(state => state.auth.user)

  return (
    <BottomNavigation.Navigator
      barStyle={{ height: 50, backgroundColor: Colors.primaryColor }}
      activeColor={Colors.primaryBackgroundColor}
      inactiveColor={'#DDD'}
      screenOptions={{
        // header: (props) => <Header />
      }}>
      <BottomNavigation.Screen
        name={Screens.HOME_SCREEN}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={25} />
          ),
        }} />
      <BottomNavigation.Screen
        name={Screens.NEWS_FEED}
        component={NewsFeed}
        options={{
          tabBarLabel: 'News Feed',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="newspaper-variant" color={color} size={25} />
          ),
        }} />
      {
        user?.role !== 'USER' ?
          (
            <BottomNavigation.Screen
              name={Screens.CREATE_NEWS}
              component={CreateNews}
              options={{
                tabBarLabel: 'Create',
                tabBarIcon: ({ color, size }) => (
                  <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 25,
                    height: 25,
                    backgroundColor: color,
                    borderRadius: 50
                  }}>
                    <Fontisto name={'plus-a'} size={20} color={Colors.primaryColor} />
                  </View>
                ),
              }} />
          ) : (
            <></>
          )
      }
      <BottomNavigation.Screen
        name={Screens.ALL_MESSAGES}
        component={user?.role === 'USER' ? OfficersChatList : AllMessages}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="message" color={color} size={25} />
          ),
        }} />
      <BottomNavigation.Screen
        name={Screens.MY_AREA}
        component={MyArea}
        options={{
          tabBarLabel: 'My Division',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="office-building" color={color} size={25} />
          ),
        }} />
    </BottomNavigation.Navigator>
  )
}

export default HomeScreenBottom

