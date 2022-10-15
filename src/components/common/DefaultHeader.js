import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'

import { Colors } from '../../constants'
import { useNavigation } from '@react-navigation/native'

const DefaultHeader = props => {

    const [leftWidth, setLeftWidth] = useState(0)

    const navigation = useNavigation()

    const getWidth = event => {
        const {x, y, height, width} = event.nativeEvent.layout
        setLeftWidth(width)
    }

    const LeftIcon = props?.leftIcon ? props?.leftIcon : () => (
        <AntDesign name={'arrowleft'} size={25} color={Colors.primaryBackgroundColor} />
    )

    const RightIcon = props?.rightIcon ? props?.rightIcon : () => (
        <View style={{ width: leftWidth }} />
    )

    const defaultLeftIconPress = () => {
        navigation.goBack()
    }

    const defaultOnPress = () => {

    }

    const onLeftIconPress = props?.onLeftIconPress ? props?.onLeftIconPress : defaultLeftIconPress

    const onRightIconPress = props?.onRightIconPress ? props?.onRightIconPress : defaultOnPress

    return (
        <View style={[styles.container, props.containerStyle]}>
            <TouchableOpacity onLayout={getWidth} onPress={onLeftIconPress}>
                <LeftIcon />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
                <Text numberOfLines={1} style={styles.title}>{props.title}</Text>
            </View>
            <TouchableOpacity onPress={onRightIconPress}>
                <RightIcon />
            </TouchableOpacity>
        </View>
    )
}

export default DefaultHeader

const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: Colors.primaryColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: Colors.primaryBackgroundColor,
        fontSize: 20,
        fontWeight: 'bold',
    }
})