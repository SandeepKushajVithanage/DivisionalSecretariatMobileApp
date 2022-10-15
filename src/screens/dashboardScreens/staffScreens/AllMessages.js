import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'

import { DefaultHeader, Layout, SearchHeader } from '../../../components'
import { Screens } from '../../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleConversation } from '../../../api/chatRequests'
import useRequestConfig from '../../../hooks/useRequestConfig'
import { addMessage, setMessages } from '../../../redux/actions/socketActions'
import showToastMessage from '../../../utils/showToastMessage'

const AllMessages = props => {
    
    const dispatch = useDispatch()
    const { socket, messages, conversations } = useSelector(state => state.socket)
    const user = useSelector(state => state.auth.user)
    const config = useRequestConfig()

    // const [users, setUsers] = useState([])

    // const initializeMessages = async () => {
    //     socket.emit('INITIALIZE_MESSAGES', { id: user._id })
    // }

    // useEffect(() => {
    //     const subscribe = props.navigation.addListener('focus', () => {
    //         initializeMessages()
    //     })
    //     return subscribe
    // }, [props.navigation])

    // useEffect(() => {
    //     const newList = []
    //     messages.forEach(item => {
    //         const u = newList.find(el => el._id === item.user._id || el._id === item.reciever._id)
    //         if (!u) {
    //             if (user._id !== item.user._id) newList.push(item.user)
    //             else newList.push(item.reciever)
    //         }
    //     })
    //     setUsers(newList)
    // }, [messages])

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
                <Image source={{ uri: item.profilePicture }} style={styles.profilePic} />
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
        <Chat item={item.user} />
    )

    return (
        <Layout>
            <DefaultHeader title={'Conversations'} />
            <SearchHeader />
            <FlatList
                bounces={false}
                data={conversations}
                renderItem={renderItem}
                keyExtractor={item => item.user._id}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                showsVerticalScrollIndicator={false}
            />
        </Layout>
    )
}

export default AllMessages

const styles = StyleSheet.create({
    container: {

    },
    chatContainer: {
        flexDirection: 'row',
        padding: 10,
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
})

const CHAT_LIST = [
    {
        id: 1,
        name: 'Sandeep Vithanage',
        message: 'EnsureSingleNavigator (at BaseNavigationContainer.tsx:430)',
        time: '12:35 PM',
        image: PROFILE_PIC,
    },
    {
        id: 2,
        name: 'Sandeep Vithanage',
        message: 'EnsureSingleNavigator (at BaseNavigationContainer.tsx:430)',
        time: '12:35 PM',
        image: PROFILE_PIC,
    },
    {
        id: 3,
        name: 'Sandeep Vithanage',
        message: 'EnsureSingleNavigator (at BaseNavigationContainer.tsx:430)',
        time: '12:35 PM',
        image: PROFILE_PIC,
    },
    {
        id: 4,
        name: 'Sandeep Vithanage',
        message: 'EnsureSingleNavigator (at BaseNavigationContainer.tsx:430)',
        time: '12:35 PM',
        image: PROFILE_PIC,
    },
    {
        id: 5,
        name: 'Sandeep Vithanage',
        message: 'EnsureSingleNavigator (at BaseNavigationContainer.tsx:430)',
        time: '12:35 PM',
        image: PROFILE_PIC,
    },
    {
        id: 6,
        name: 'Sandeep Vithanage',
        message: 'EnsureSingleNavigator (at BaseNavigationContainer.tsx:430)',
        time: '12:35 PM',
        image: PROFILE_PIC,
    },
    {
        id: 7,
        name: 'Sandeep Vithanage',
        message: 'EnsureSingleNavigator (at BaseNavigationContainer.tsx:430)',
        time: '12:35 PM',
        image: PROFILE_PIC,
    },
    {
        id: 8,
        name: 'Sandeep Vithanage',
        message: 'EnsureSingleNavigator (at BaseNavigationContainer.tsx:430)',
        time: '12:35 PM',
        image: PROFILE_PIC,
    },
    {
        id: 9,
        name: 'Sandeep Vithanage',
        message: 'EnsureSingleNavigator (at BaseNavigationContainer.tsx:430)',
        time: '12:35 PM',
        image: PROFILE_PIC,
    },
    {
        id: 10,
        name: 'Sandeep Vithanage',
        message: 'EnsureSingleNavigator (at BaseNavigationContainer.tsx:430)',
        time: '12:35 PM',
        image: PROFILE_PIC,
    },
]
const PROFILE_PIC = 'https://scontent.fcmb1-2.fna.fbcdn.net/v/t1.6435-9/181347224_1985704098244405_6348078292449228458_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=syUGYEsd-VYAX_89PR4&_nc_ht=scontent.fcmb1-2.fna&oh=00_AT9UVtCxhVBuWpCktJNV--Wk5bq4gk2adT2BsI3igvPLrA&oe=6270AA37'