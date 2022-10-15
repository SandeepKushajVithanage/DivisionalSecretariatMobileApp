import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { wp, hp } from '../../utils/screenResponsiveFunctions'
import { Colors } from '../../constants'
import VideoPlayer from 'react-native-video-player'

const FullScreenVideoPlayer = props => {

    const [visible, setVisible] = useState(false)
    const [rotate, setRotate] = useState(false)

    const width = rotate ? hp(50) : wp(100)
    const height = rotate ? wp(100) : hp(100)

    const openVideoViewer = () => {
        setVisible(true)
    }

    const onClose = () => {
        setVisible(false)
    }

    const onRotate = () => {
        // setRotate(!rotate)
    }

    return (
        <>
            <TouchableOpacity style={styles.mediaItemContainer} onPress={openVideoViewer} onLongPress={props.onLongPress ? props.onLongPress : () => null}>
                <AntDesign name={'playcircleo'} size={50} color={Colors.primaryBackgroundColor} />
            </TouchableOpacity>
            <Modal visible={visible} transparent={true} >
                <View style={[styles.backgroundContainer]}>
                    <View style={[styles.videoContainer(width, height), {
                        transform: [{ rotate: rotate ? "90deg" : "0deg" }]
                    }]}>
                        <VideoPlayer
                            video={{ uri: props?.uri }}
                            videoWidth={width}
                            // videoHeight={900}
                            thumbnail={{ uri: props?.thumbnailUri }}
                        />
                    </View>
                    <View style={styles.controlsContainer}>
                        <TouchableOpacity style={styles.icon} onPress={onRotate}>
                            <FontAwesome name={'rotate-right'} size={25} color={Colors.primaryBackgroundColor} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.icon}>
                            <Entypo name={'resize-full-screen'} size={25} color={Colors.primaryBackgroundColor} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.icon} onPress={onClose}>
                            <AntDesign name={'close'} size={30} color={Colors.primaryBackgroundColor} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default FullScreenVideoPlayer

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
    backgroundContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    videoContainer: (width, height) => ({
        backgroundColor: '#000',
        // minHeight: hp(50),
        width: width,
        height: height,
    }),
    controlsContainer: {
        position: 'absolute',
        right: 10,
        top: 10,
        flexDirection: 'row',
    },
    icon: {
        marginLeft: 10,
    },
})