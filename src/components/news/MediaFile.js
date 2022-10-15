import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'

import { wp, hp } from '../../utils/screenResponsiveFunctions'

const MediaFile = props => {
    const { uri, onPressImage } = props
    return (
        <TouchableOpacity style={styles.mediaItemContainer} onPress={onPressImage ? onPressImage : () => null}>
            <Image source={{ uri: uri }} style={styles.mediaItem} />
        </TouchableOpacity>
    )
}

export default MediaFile

const styles = StyleSheet.create({
    mediaItemContainer: {
        backgroundColor: '#000',
        width: wp(32),
        height: wp(32),
        borderRadius: 5,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mediaItem: {
        width: '100%',
        height: '100%',
    },
})