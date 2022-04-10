import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import { Colors } from '../../constants'

const SearchHeader = props => {
    return (
        <View style={[styles.container, props.containerStyle]}>
            <View style={styles.searchBar}>
                <TextInput placeholder={'Search here...'} />
            </View>
            <TouchableOpacity>
                <FontAwesome5 name={'search'} size={25} style={styles.searchIcon}/>
            </TouchableOpacity>
        </View>
    )
}

export default SearchHeader

const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: Colors.primaryColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    searchBar: {
        backgroundColor: Colors.primaryBackgroundColor,
        flex: 1,
        height: 40,
        borderRadius: 5,
        marginLeft: 10,
        paddingHorizontal: 10,
        // paddingVertical: 5,
    },
    searchIcon: {
        paddingHorizontal: 15,
    },
    searchField: {
        width: '100%',
        height: '100%',
    },
})