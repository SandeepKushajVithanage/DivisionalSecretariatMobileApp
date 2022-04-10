import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants'
import { useNavigation } from '@react-navigation/native'

const DrawerItem = props => {
    const navigation = useNavigation()

    const onClick = () => {
        navigation.navigate(props?.screen)
    }

    return (
        <TouchableOpacity style={style.container} onPress={onClick}>
            <Text style={style.screen}>{props?.name}</Text>
        </TouchableOpacity>
    )
}

export default DrawerItem

const style = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        borderBottomWidth: 0.7,
    },
    screen: {
        paddingVertical: 15,
        color: Colors.secondaryBackgroundColor,
        fontWeight: 'bold',
    },
})