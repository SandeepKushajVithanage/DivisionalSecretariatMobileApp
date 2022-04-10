import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto'

import { Layout, NewsCard, SearchHeader } from '../../../components'
import { wp } from '../../../utils/screenResponsiveFunctions'
import { Screens, Urls } from '../../../constants'
import { Request } from '../../../api'
import showToastMessage from '../../../utils/showToastMessage'

const NewsFeed = props => {

    const [newsList, setNewsList] = useState([])
    const [refresh, setRefresh] = useState(false)

    const getNewsList = () => {
        Request.get(Urls.NEWS)
            .then(response => {
                setNewsList(response.data)
            })
            .catch(error => {
                console.error(error)
                showToastMessage(error.message)
            })
            .finally(() => {
                setRefresh(false)
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
        getNewsList()
    }, [])

    return (
        <Layout style={styles.container}>
            <SearchHeader />
            <FlatList
                flex={1}
                data={newsList}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                refreshing={refresh}
                onRefresh={onRefresh}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />} />
        </Layout>
    )
}

export default NewsFeed

const styles = StyleSheet.create({
    container: {
        
    },
})
