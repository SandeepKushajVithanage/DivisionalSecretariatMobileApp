import { View, Text, TouchableOpacity, StyleSheet, Image, Platform, KeyboardAvoidingView, TextInput, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor"
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import FileViewer from "react-native-file-viewer"
import FilePickerManager from 'react-native-file-picker'
import VideoPlayer from 'react-native-video-player'

import { DefaultHeader, Layout } from '../../../components'
import { hp, wp } from '../../../utils/screenResponsiveFunctions'
import { Colors, Screens } from '../../../constants'
import { createNews } from '../../../api/dashboardRequests'
import { requestPermissions } from '../../../utils/requestPermissions'
import useRequestConfig from '../../../hooks/useRequestConfig'
import showToastMessage from '../../../utils/showToastMessage'

const PostBtn = props => (
    <TouchableOpacity onPress={props?.onPress} style={styles.postBtnContainer}>
        <Text style={styles.postBtn}>Post</Text>
    </TouchableOpacity>
)

const CreateNews = props => {

    const richText = useRef()
    const scrollView = useRef()

    const [editorValue, setEditorValue] = useState('')
    const [title, setTitle] = useState('')

    const [files, setFiles] = useState([])

    const config = useRequestConfig({ 'Content-Type': 'multipart/form-data' })

    const onCreate = () => {
        const formData = new FormData()

        formData.append('title', title)
        formData.append('content', editorValue)

        files.forEach(file => {
            formData.append("files", file);
        })

        createNews(formData, config)
            .then(response => {
                showToastMessage('Successfully created')
                setTitle('')
                setEditorValue('')
                setFiles([])
                props.navigation.navigate(Screens.NEWS_FEED)
            })
            .catch(error => {
                console.error(error)
                showToastMessage(error.message)
            })
    }

    const onLaunchCameraImage = async () => {
        const permisson = await requestPermissions()

        if (permisson !== true) return

        const options = {
            mediaType: 'photo',
            cameraType: 'back',
            saveToPhotos: true,
            selectionLimit: 0,
        }

        const callback = value => {
            if (value?.assets) {
                const fileList = value?.assets?.map(item => ({
                    name: item.fileName,
                    uri: item.uri,
                    type: item.type,
                }))
                setFiles(files => [...files, ...fileList])
            } else {
                console.log('Somethings is wrong', value)
            }
        }

        try {
            launchCamera(options, callback)
        } catch (error) {
            console.error(error)
            showToastMessage(error.message)
        }
    }

    const onLaunchCameraVideo = async () => {
        const permisson = await requestPermissions()

        if (permisson !== true) return

        const options = {
            mediaType: 'video',
            saveToPhotos: true,
            selectionLimit: 0,
        }

        const callback = value => {
            if (value?.assets) {
                const fileList = value?.assets?.map(item => ({
                    name: item.fileName,
                    uri: item.uri,
                    type: item.type,
                }))
                setFiles(files => [...files, ...fileList])
            } else {
                console.log('Somethings is wrong', value)
            }
        }

        try {
            launchCamera(options, callback)
        } catch (error) {
            console.error(error)
            showToastMessage(error.message)
        }
    }

    const onLaunchGallery = async () => {
        const permisson = await requestPermissions()

        if (permisson !== true) return

        const options = {
            mediaType: 'mixed',
            cameraType: 'back',
            saveToPhotos: true,
            selectionLimit: 0,
        }

        const callback = value => {
            if (value?.assets) {
                const fileList = value?.assets?.map(item => ({
                    name: item.fileName,
                    uri: item.uri,
                    type: item.type,
                }))
                setFiles(files => [...files, ...fileList])
            } else {
                console.log('Somethings is wrong', value)
            }
        }

        try {
            launchImageLibrary(options, callback)
        } catch (error) {
            console.error(error)
            showToastMessage(error.message)
        }
    }

    const onPickUpFile = async () => {
        const permisson = await requestPermissions()

        if (permisson !== true) return

        FilePickerManager.showFilePicker(null, (response) => {
            if (response.didCancel) {
                console.error('User cancelled file picker');
            }
            else if (response.error) {
                console.error('FilePickerManager Error: ', response.error);
            }
            else {
                const file = {
                    name: response.fileName,
                    uri: response.uri,
                    type: response.type,
                }
                setFiles(files => [...files, response, file])
            }
        })
    }

    return (
        <Layout style={styles.container}>
            <DefaultHeader title={'Create News'} />
            <ScrollView ref={scrollView}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                    <View style={styles.profileContainer}>
                        <Image source={{ uri: PROFILE_PIC }} style={styles.profilePic} />
                        <View style={styles.profileDetailsContainer}>
                            <Text style={styles.profileName}>Sandeep Vithanage</Text>
                            <View style={styles.publishDetailsContainer}>
                                <Text>Publish for anyone?</Text>
                            </View>
                        </View>
                        <PostBtn onPress={onCreate} />
                    </View>
                    <View style={styles.addMediaContainer}>
                        <TouchableOpacity style={styles.addMediaIcon} onPress={onLaunchCameraImage}>
                            <Entypo name={'camera'} size={25} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.addMediaIcon} onPress={onLaunchCameraVideo}>
                            <Entypo name={'video-camera'} size={25} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.addMediaIcon} onPress={onLaunchGallery}>
                            <Entypo name={'folder-images'} size={25} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.addMediaIcon} onPress={onPickUpFile}>
                            <Entypo name={'attachment'} size={25} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.mediaContainer}>
                        {
                            files?.map((item, index) => {
                                if (item?.type?.split('/')[0] === 'image') {
                                    return (
                                        <TouchableOpacity style={styles.mediaItemContainer} key={item.uri + index.toString()}>
                                            <Image source={{ uri: item?.uri }} style={styles.mediaItem} />
                                        </TouchableOpacity>

                                    )
                                } else if (item?.type?.split('/')[0] === 'video') {
                                    return (
                                        <TouchableOpacity style={styles.mediaItemContainer} key={item.uri + index.toString()}>

                                        </TouchableOpacity>
                                    )
                                } else {
                                    return <View key={item.uri + index.toString()} />
                                }
                            })
                        }
                    </View>
                    <View style={styles.editTextContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Title</Text>
                            <View style={styles.textField}>
                                <TextInput value={title}
                                    onChangeText={text => setTitle(text)}
                                    style={styles.titleTextInput}
                                    placeholder={'Type title here'} />
                            </View>
                        </View>
                        <Text style={[styles.title, { marginLeft: 10 }]}>Content</Text>
                        <RichEditor
                            ref={richText}
                            initialFocus={false}
                            onChange={descriptionText => {
                                setEditorValue(descriptionText)
                            }}
                            editorStyle={{ ...styles.textField, padding: 20 }}
                            containerStyle={{
                                height: 200,
                                marginHorizontal: 10,
                                borderRadius: 10,
                            }}
                            placeholder={'Type description here'}
                            useContainer={true}
                            onCursorPosition={() => {
                                scrollRef.current.scrollTo({ y: scrollY - 30, animated: true })
                            }}
                        // initialHeight={wp(50)}
                        />
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
            <RichToolbar
                editor={richText}
                // actions={[actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1, ]}
                actions={ACTIONS}
                iconMap={{ [actions.heading1]: ({ tintColor }) => (<Text style={[{ color: tintColor }]}>H1</Text>), }}
            />
        </Layout>
    )
}

export default CreateNews

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 0,
    },
    postBtnContainer: {
        height: 40,
        width: 80,
        backgroundColor: Colors.primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginLeft: 'auto',
    },
    postBtn: {
        color: Colors.primaryBackgroundColor,
        fontSize: 16,
        fontWeight: 'bold',
    },
    headerCloseIconContainer: {

    },
    headerCloseIcon: {

    },
    profileContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        alignItems: 'center',
        marginTop: 20,
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    profileDetailsContainer: {
        marginLeft: 20,
    },
    profileName: {
        color: Colors.primaryColor,
        fontWeight: 'bold',
        fontSize: 18,
    },
    publishDetailsContainer: {
        flexDirection: 'row',
        // paddingHorizontal: 10,
        marginTop: 10,
        // justifyContent: 'center'
    },
    editTextContainer: {
        flex: 1,
        marginTop: 20,
        // backgroundColor: '#F00',
        // height: hp(70),
    },
    addMediaContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginHorizontal: 20,
        marginTop: 20,
    },
    addMediaIcon: {
        marginLeft: 10,
    },
    mediaContainer: {
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: wp(98),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mediaItemContainer: {
        backgroundColor: '#000',
        width: wp(32),
        height: wp(32),
        borderRadius: 5,
        overflow: 'hidden',
    },
    mediaItem: {
        width: '100%',
        height: '100%',
    },
    mediaTitle: {
        color: Colors.primaryColor,
        fontSize: 18,
        textAlign: 'center',
    },
    videoContainer: {
        padding: 10,
        backgroundColor: '#999999',
        borderRadius: 5,
        marginTop: 10,
    },
    titleContainer: {
        marginHorizontal: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
        marginTop: 20,
    },
    titleTextInput: {
        width: '100%',
        fontSize: 16,
        paddingHorizontal: 10,
    },
    textField: {
        backgroundColor: Colors.primaryBackgroundColor,
        borderRadius: 10,
    }
})

const PROFILE_PIC = 'https://scontent.fcmb1-2.fna.fbcdn.net/v/t1.6435-9/181347224_1985704098244405_6348078292449228458_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=syUGYEsd-VYAX_89PR4&_nc_ht=scontent.fcmb1-2.fna&oh=00_AT9UVtCxhVBuWpCktJNV--Wk5bq4gk2adT2BsI3igvPLrA&oe=6270AA37'

const ACTIONS = [
    actions.keyboard,
    actions.setBold,
    actions.setItalic,
    actions.setUnderline,
    actions.setStrikethrough,
    actions.insertBulletsList,
    actions.insertOrderedList,
    actions.insertLink,
    actions.undo,
    actions.redo,
    actions.removeFormat,
    // actions.insertImage,
    // actions.insertVideo,
    // actions.checkboxList,
]