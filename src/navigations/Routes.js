import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import DrawerNavigator from './DrawerNavigator'
import RootNavigator from './RootNavigator'
import { useSelector } from 'react-redux'

const Routes = props => {

    const user = useSelector(state => state.auth.user)
    // const user = true

    return (
        <NavigationContainer>
            {
                user ?
                    <DrawerNavigator /> :
                    <RootNavigator />
            }
        </NavigationContainer>
    )
}

export default Routes