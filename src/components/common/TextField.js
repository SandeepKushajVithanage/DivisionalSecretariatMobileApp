import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'

import { hp } from '../../utils/screenResponsiveFunctions'
import { Colors } from '../../constants'

const EyeIcon = ({ status }) => <Feather name={status ? 'eye' : 'eye-off'} size={20} color={'grey'} />

const TextField = props => {

    const LeftIcon = props?.leftIcon ? () => <View style={styles.icon}>{props?.leftIcon()}</View> : () => <></>
    
    const RightIcon = props?.rightIcon ? () => <TouchableOpacity style={styles.eyeIcon} onPress={() => props?.setStatus(!props?.status)}><EyeIcon status={props?.status} /></TouchableOpacity> : () => <></>

    return (
        <View style={styles.container}> 
            <LeftIcon />
            <View style={styles.textInputContainer}>
                <TextInput { ...props.textInput } style={styles.textInput} />
            </View>
            <RightIcon />
        </View>
    )
}

export default TextField

const styles = StyleSheet.create({
    container: {
        height: 40,
        borderColor: Colors.primaryColor,
        borderWidth: 1,
        borderRadius: 5,
        marginTop: hp(2),
        flexDirection: 'row',
        paddingHorizontal: 5,
    },
    textInputContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },
    textInput: {
        width: '100%',
        height: '100%',
        // fontWeight: 'bold',
    },
    icon: {
        justifyContent: 'center',
        marginLeft: 10,
    },
    eyeIcon: {
        justifyContent: 'center',
        paddingHorizontal: 10,
    }
})