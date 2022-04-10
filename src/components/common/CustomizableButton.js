import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'

import { hp } from '../../utils/screenResponsiveFunctions'
import { Colors } from '../../constants'

const CustomizableButton = props => {

    const onPress = props?.onPress ? props?.onPress : () => { }

    const LeftIcon = props?.leftIcon ? props?.leftIcon : () => <></>

    const RightIcon = props?.rightIcon ? props?.rightIcon : () => <></>

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container, props.containerStyle]}>
            <View style={styles.btnContainer}>
                <LeftIcon />
            </View>
            {
                props?.loading ?
                    <ActivityIndicator size={25} color={'#FFF'} /> : (
                        <View style={styles.textContainer}>
                            <Text style={[styles.text, props.textStyle]}>{props?.text}</Text>
                        </View>
                    )
            }
            <View style={styles.btnContainer}>
                <RightIcon />
            </View>
        </TouchableOpacity>
    )
}

export default CustomizableButton

const styles = StyleSheet.create({
    container: {
        height: 40,
        borderColor: Colors.primaryColor,
        borderWidth: 1,
        borderRadius: 5,
        marginTop: hp(2),
        flexDirection: 'row',
        backgroundColor: Colors.primaryColor,
        paddingHorizontal: 15,
    },
    textContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    btnContainer: {
        justifyContent: 'center',
        flex: 1,
    }
})