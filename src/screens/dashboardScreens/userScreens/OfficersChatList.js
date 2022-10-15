import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { DefaultHeader, Layout } from '../../../components'
import { Screens } from '../../../constants'
import { getArea } from '../../../api/dashboardRequests'
import useRequestConfig from '../../../hooks/useRequestConfig'
import showToastMessage from '../../../utils/showToastMessage'
import { setMessages } from '../../../redux/actions/socketActions'
import { getSingleConversation } from '../../../api/chatRequests'

const OfficersChatList = props => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const {area, areaLoading} = useSelector(state => state.dashboard)
    const { socket, messages } = useSelector(state => state.socket)

    const config = useRequestConfig()

    const initializeChat = id => {
        dispatch(setMessages({ messages: [], selectedConversation: id }))
        getSingleConversation(id, config)
            .then(response => {
                dispatch(setMessages({ messages: response.data, selectedConversation: id }))
            }) 
            .catch(error => {
                showToastMessage(error.message)
            })
    }

    const Chat = ({ item }) => {

        const onClick = () => {
            initializeChat(item._id)
            props.navigation.navigate(Screens.PRIVATE_CHAT, { item })
        }

        return (
            <TouchableOpacity onPress={onClick} style={styles.chatContainer}>
                <Image source={{ uri: item?.profilePicture }} style={styles.profilePic} />
                <View style={styles.chatMessageContainer}>
                    <View style={styles.chatNameContainer}>
                        <Text numberOfLines={1} style={styles.chatName}>{item?.displayName}</Text>
                        <Text numberOfLines={1} style={styles.chatTime}>{item?.time}</Text>
                    </View>
                    <View>
                        <Text numberOfLines={1} style={styles.chatMessage}>{item?.email}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const renderItem = ({ item, index }) => (
        <Chat item={item} />
    )

    const onUpdateProfilePress = () => {
        props.navigation.navigate(Screens.USER_PROFILE)
    }

    return (
        <Layout>
            <DefaultHeader title={user?.area ? area?.name : 'Not Registerd'} />
            {
                user.area ?
                    (
                        <ScrollView flex={1}>
                            {
                                area?.primaryGN ?
                                    <Chat item={area?.primaryGN} /> : <></>
                            }
                            {
                                area?.primaryGSN ?
                                    <Chat item={area?.primaryGSN} /> : <></>
                            }
                        </ScrollView>
                    ) :
                    (
                        <View style={styles.notRegisterdContainer}>
                            <Text style={styles.notRegisterdText}>You have not registered to a sub division.</Text>
                            <TouchableOpacity style={styles.updateBtnContainer} onPress={onUpdateProfilePress}>
                                <Text style={styles.updateProfileBtn}>Update your profile</Text>
                            </TouchableOpacity>
                        </View>
                    )
            }
        </Layout>
    )
}

export default OfficersChatList

const styles = StyleSheet.create({
    container: {

    },
    chatContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    chatMessageContainer: {
        flex: 1,
        justifyContent: 'space-between',
        marginLeft: 15,
    },
    chatNameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    chatName: {
        color: '#000',
        fontSize: 17,
    },
    chatMessage: {
        color: '#000',
    },
    chatTime: {

    },
    notRegisterdContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    notRegisterdText: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
    },
    updateBtnContainer: {
        marginTop: 20,
    },
    updateProfileBtn: {
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 50,
        fontWeight: 'bold',
        paddingHorizontal: 20,
    }
})
