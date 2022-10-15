import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto'

import { Layout, NewsCard, SearchHeader } from '../../../components'
import { wp } from '../../../utils/screenResponsiveFunctions'
import { Screens, Urls, Colors } from '../../../constants'
import { Request } from '../../../api'
import showToastMessage from '../../../utils/showToastMessage'

const NewsFeed = props => {

    const [newsList, setNewsList] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [loading, setLoading] = useState(true)

    const getNewsList = () => {
        Request.get(Urls.NEWS)
            .then(response => {
                const list = response.data
                list.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                setNewsList(list)
            })
            .catch(error => {
                console.error(error)
                showToastMessage(error.message)
            })
            .finally(() => {
                setRefresh(false)
                setLoading(false)
            })
    }

    const onRefresh = () => {
        setRefresh(true)
        getNewsList()
    }

    const renderItem = ({ item, index }) => {
        return (
            <NewsCard item={item} index={index} />
        )
    }

    useEffect(() => {
        setLoading(true)
        getNewsList()
    }, [])

    return (
        <Layout style={styles.container}>
            <SearchHeader />
            {
                loading ?
                    (
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <ActivityIndicator color={Colors.primaryColor} size={'large'} />
                        </View>
                    ) : (
                        <FlatList
                            flex={1}
                            contentContainerStyle={styles.contentContainerStyle}
                            data={newsList}
                            renderItem={renderItem}
                            keyExtractor={item => item._id}
                            refreshing={refresh}
                            onRefresh={onRefresh}
                            ItemSeparatorComponent={() => <View style={{ height: 10 }} />} />
                    )
            }
        </Layout>
    )
}

export default NewsFeed

const styles = StyleSheet.create({
    container: {

    },
    contentContainerStyle: {
        paddingBottom: 40,
        flexGrow: 1,
    },
})
