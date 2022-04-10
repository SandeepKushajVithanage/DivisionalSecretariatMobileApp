import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import {ProgressBar} from '@react-native-community/progress-bar-android'

import { Colors, Images } from '../../constants'
import { hp, wp } from '../../utils/screenResponsiveFunctions'

const Splash = props => {
    return (
        <View style={styles.container}>
            <Image source={Images.LOGO} style={styles.logo}/>
            <View style={styles.loaderContainer}>
                <ProgressBar styleAttr="Horizontal" color={Colors.primaryColor} style={styles.loader} />
                <Text style={styles.loaderText}>Loading...</Text>
            </View>
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    logo: {
        height: hp(35),
        aspectRatio: 1200 / 1702,
    },
    loader: {
        width: wp(40),
    },
    loaderContainer: {
        position: 'absolute',
        bottom: 100,
    },
    loaderText: {
        textAlign: 'center',
        color: Colors.primaryColor,
    },
})