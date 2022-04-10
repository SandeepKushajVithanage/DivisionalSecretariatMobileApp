import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import WebView from 'react-native-webview'
import AutoHeightWebView from 'react-native-autoheight-webview'
import AutoHeightImage from 'react-native-auto-height-image'

import { Colors, Urls } from '../../constants'
import { wp } from '../../utils/screenResponsiveFunctions'
import VideoPlayer from 'react-native-video-player'

const scripts = '<meta name="viewport" content="user-scalable=1.0,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">'

const FileContent = ({ item }) => {
    if (item?.mimeType?.split('/')[0] === 'image') {
        return (
            <AutoHeightImage
                width={wp(100)}
                source={{
                    uri: Urls.BASE_URI + item?.filePath
                }} />
        )
    } else if (item?.mimeType?.split('/')[0] === 'video') {
        return (
            <View style={styles.defaultMediaContainer}>
                <VideoPlayer
                    video={{
                        uri: Urls.BASE_URI + item?.filePath
                    }}
                    style={{
                        width: '100%',
                        // height: '100%',
                        backgroundColor: '#000000',
                    }}
                // thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
                />
            </View>

        )
    } else {
        return <></>
    }
}

const NewsCard = ({ item, index }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: item?.author?.profilePicture }} style={styles.profilePicture} />
                <View style={styles.profileDetailContainer}>
                    <Text style={styles.profileName}>{item?.author?.displayName}</Text>
                    <Text style={styles.role}>Grama Niladhari</Text>
                </View>
                <TouchableOpacity>
                    <Entypo name={'dots-three-vertical'} size={20} />
                </TouchableOpacity>
            </View>
            <AutoHeightWebView
                originWhitelist={['*']}
                source={{ html: scripts + item?.content }}
                style={styles.contentContainerStyle}
            />
            <View>
                <ScrollView horizontal={true}>
                    {
                        item?.files?.map(item => <FileContent item={item} key={item._id} />)
                    }
                </ScrollView>
            </View>
        </View>
    )
}

export default NewsCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primaryBackgroundColor,
        // height: 400,
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
        minHeight: (wp(100)/5) * 3, 
        width: wp(100), 
        justifyContent: 'center' 
    },
})