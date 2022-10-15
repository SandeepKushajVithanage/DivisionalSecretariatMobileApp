import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import WebView from 'react-native-webview'
import AutoHeightWebView from 'react-native-autoheight-webview'
import AutoHeightImage from 'react-native-auto-height-image'
import ImageView from "react-native-image-viewing"
import moment from 'moment'

import { Colors, Urls } from '../../constants'
import { wp } from '../../utils/screenResponsiveFunctions'
import VideoPlayer from 'react-native-video-player'
import MediaFile from './MediaFile'
import FullScreenVideoPlayer from '../common/FullScreenVideoPlayer'

const scripts = '<meta name="viewport" content="user-scalable=1.0,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">'

const FileContent = ({ item, onPressImage }) => {
    if (item?.mimeType?.split('/')[0] === 'image') {
        return <MediaFile uri={Urls.BASE_URI + item?.filePath} key={item._id} onPressImage={onPressImage} />
    } else if (item?.mimeType?.split('/')[0] === 'video') {
        return <FullScreenVideoPlayer uri={Urls.BASE_URI + item?.filePath} key={item._id} />
    } else {
        return <></>
    }
}

const NewsCard = ({ item, index }) => {

    const [visible, setIsVisible] = useState(false)

    const images = item?.files?.filter(file => file?.mimeType?.split('/')[0] === 'image')?.map(file => ({ uri: Urls.BASE_URI + file?.filePath }))

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: item?.author?.profilePicture }} style={styles.profilePicture} />
                <View style={styles.profileDetailContainer}>
                    <Text style={styles.profileName} numberOfLines={1}>{item?.author?.displayName}</Text>
                    <Text style={styles.role} numberOfLines={1}>
                        {item?.author?.role === 'GN' ? 'Grama Niladhari ' : 'Gowijanasewa Niladhari '}
                        ({item?.visibility ? item?.visibility?.name : 'Public'})
                    </Text>
                </View>
                <TouchableOpacity>
                    <Entypo name={'dots-three-vertical'} size={20} />
                </TouchableOpacity>
            </View>
            <Text style={styles.contentTitle}>{item?.title}</Text>
            <View style={styles.contentContainer}>
                <Text numberOfLines={7} style={styles.content}>{item?.content}</Text>
            </View>
            {/* <AutoHeightWebView
                originWhitelist={['*']}
                source={{ html: scripts + item?.content }}
                style={styles.contentContainerStyle}
            /> */}
            <View style={{ marginBottom: 10}}>
                <ScrollView horizontal={true}>
                    {
                        item?.files?.map(item => <FileContent item={item} key={item._id} onPressImage={() => setIsVisible(true)} />)
                    }
                </ScrollView>
            </View>
            <ImageView
                images={images}
                imageIndex={0}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
            />
            <View style={{ marginVertical: 10 }}>
                <Text style={{ textAlign: 'center' }}>{moment(item?.updatedAt).format("ddd, hA")}</Text>
            </View>
        </View>
    )
}

export default NewsCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primaryBackgroundColor,
        // height: 400,
        // paddingBottom: 10,
    },
    header: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'flex-start',
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    profileDetailContainer: {
        flex: 1,
        marginLeft: 10,
    },
    profileName: {
        color: Colors.primaryColor,
        fontWeight: 'bold',
        fontSize: 20,
    },
    role: {
        fontWeight: 'bold',
    },
    contentContainerStyle: {
        width: wp(97),
        marginHorizontal: wp(1),
        marginVertical: 5,
    },
    defaultMediaContainer: {
        minHeight: (wp(100) / 5) * 3,
        width: wp(100),
        justifyContent: 'center'
    },
    contentContainer: {

    },
    contentTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
    content: {
        marginBottom: 10,
    }
})