import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import firestore from '@react-native-firebase/firestore'

import { DefaultHeader, Layout } from '../../../components'
import { Screens } from '../../../constants'

const AllMessages = props => {

    const getUsers = async () => {
        const users = await firestore().collection('Users').get()
        console.log(users)
    }

    useEffect(() => {
        // getUsers()
    }, [])

    const Chat = ({ item }) => {

        const onClick = () => {
            props.navigation.navigate(Screens.PRIVATE_CHAT)
        }

        return (
            <TouchableOpacity onPress={onClick} style={styles.chatContainer}>
                <Image source={{ uri: PROFILE_PIC }} style={styles.profilePic} />
                <View style={styles.chatMessageContainer}>
                    <View style={styles.chatNameContainer}>
                        <Text numberOfLines={1} style={styles.chatName}>{item?.name}</Text>
                        <Text numberOfLines={1} style={styles.chatTime}>{item?.time}</Text>
                    </View>
                    <View>
                    <Text numberOfLines={1} style={styles.chatMessage}>{item?.message}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const renderItem = ({ item, index }) => (
        <Chat item={item} />
    )
    
    return (
        <Layout>
            <DefaultHeader title={'Conversations'} />
            <FlatList
                bounces={false}
                data={CHAT_LIST}
                renderItem={renderItem}
                keyExtractor={item => item.id}
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
        paddingVertical: 10,
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