import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import { Colors } from '../../constants'

const Loader = ({ active }) => {

    if (active) {
        return (
            <View style={styles.container}>
              <ActivityIndicator size={'large'} color={Colors.primaryColor} />
            </View>
          )
    } else {
        return (
            <></>
        )
    }
}

export default Loader

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
    }
})