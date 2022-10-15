import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { Screens } from '../../constants'

const Avatar = props => {

    const user = useSelector(state => state.auth.user)

    const navigation = useNavigation()

    const onPressProfile = () => {
        navigation.navigate(Screens.USER_PROFILE)
    }

    return (
        <TouchableOpacity style={[styles.container, props.style]} onPress={onPressProfile}>
            <Image source={{ uri: user?.profilePicture }} style={[styles.image, props.imageStyle]} />
        </TouchableOpacity>
    )
}

export default Avatar

const styles = StyleSheet.create({
    container: {
        width: 30,
        height: 30,
        borderRadius: 50,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
})