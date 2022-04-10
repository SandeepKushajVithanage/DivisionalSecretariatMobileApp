import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const Avatar = props => {

    const user = useSelector(state => state.auth.user)

    return (
        <View style={[styles.container, props.style]}>
            <Image source={{ uri: user?.profilePicture }} style={[styles.image, props.imageStyle]} />
        </View>
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