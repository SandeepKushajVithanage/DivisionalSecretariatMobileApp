import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useSelector } from 'react-redux'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import auth from '@react-native-firebase/auth'

import { Colors, Screens } from '../../constants'
import Avatar from '../common/Avatar'
import { DrawerItem } from '..'
import showToastMessage from '../../utils/showToastMessage'
import { useNavigation } from '@react-navigation/native'

const DrawerContent = props => {

    const user = useSelector(state => state.auth.user)

    const navigation = useNavigation()

    const onSignOut = () => {
        auth()
            .signOut()
            .then(() => {
                showToastMessage('signed out')
            })
    }

    const onPressProfile = () => {
        navigation.navigate(Screens.USER_PROFILE)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.profilePictureContainer}>
                    <Avatar style={styles.profilePicture} />
                </View>
                <TouchableOpacity style={styles.profileDetailsContainer} onPress={onPressProfile}>
                    <Text style={styles.displayName}>{user?.displayName}</Text>
                    <Text style={styles.email}>{user?.email}</Text>
                </TouchableOpacity>
            </View>
            <DrawerContentScrollView style={styles.section}>
                <DrawerItem name={'Home'} screen={Screens.HOME_SCREEN} />
                <DrawerItem name={'News Feed'} screen={Screens.NEWS_FEED} />
                {/* <DrawerItem name={'Create News'} screen={Screens.CREATE_NEWS} /> */}
                <DrawerItem name={'All Messages'} screen={Screens.ALL_MESSAGES} />
                <DrawerItem name={'Settings'} screen={Screens.SETTINGS} />
                <DrawerItem name={'About Us'} screen={Screens.SETTINGS} />
                <DrawerItem name={'Help'} screen={Screens.SETTINGS} />
            </DrawerContentScrollView>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.signOutContainer} onPress={onSignOut}>
                    <Text style={styles.signOut}>Sign Out</Text>
                    <FontAwesome name={'sign-out'} size={22} color={'#FFF'} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DrawerContent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        backgroundColor: Colors.primaryColor,
    },
    profilePictureContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    profilePicture: {
        width: 100,
        height: 100,
    },
    profileDetailsContainer: {
        marginVertical: 20,
        marginHorizontal: 10,
    },
    displayName: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 20,
        // textAlign: 'center',
    },
    email: {
        color: '#FFF',
        fontSize: 16,
    },
    section: {
        flex: 1,
    },
    footer: {
        height: 50,
        backgroundColor: Colors.primaryColor,
        justifyContent: 'center',
    },
    signOutContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 10,
    },
    signOut: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
})