import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useSelector } from 'react-redux'

import { wp } from '../../utils/screenResponsiveFunctions'
import { Colors, Images } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import Avatar from './Avatar'

const MainHeader = props => {

    const navigation = useNavigation()

    const onSignOut = () => {
        navigation.openDrawer()
        // auth()
        //     .signOut()
        //     .then(() => console.log('User signed out!'))
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.iconContainer}
                onPress={onSignOut}
                activeOpacity={0.7}>
                <Image source={Images.LOGO} style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.title}>Welcome to Divisional Secretariat</Text>
            <View style={styles.iconContainer} />
        </View>
    )
}

export default MainHeader

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: Colors.primaryColor,
        // position: 'absolute',
        width: wp(100),
    },
    iconContainer: {
        width: 30,
        height: 30,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
    },
    icon: {
        height: '100%',
        aspectRatio: 1200 / 1702,
    }
})