import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Screens } from '../constants'
import * as ScreensSets from '../screens'
import HomeScreenBottom from './HomeScreenBottom'

const Stack = createStackNavigator()

const DashboardStackNavigator = props => {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={Screens.HOME_SCREEN_BOTTOM} component={HomeScreenBottom} />
            {/* <Stack.Screen name={Screens.CREATE_NEWS} component={ScreensSets.CreateNews} /> */}
            <Stack.Screen name={Screens.PRIVATE_CHAT} component={ScreensSets.PrivateChat} />
            <Stack.Screen name={Screens.USER_PROFILE} component={ScreensSets.UserProfile} />
        </Stack.Navigator>
    )
}

export default DashboardStackNavigator