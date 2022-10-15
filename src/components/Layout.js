import { View, StyleSheet } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

const Layout = props => (
    <LinearGradient colors={['#EEE', '#EEE']} flex={1} style={[styles.container, props.style]}>
        {props.children}
    </LinearGradient>
)

export default Layout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingHorizontal: 20,
        // backgroundColor: '#EEE',
    },
})
