import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '../../constants'
import { wp } from '../../utils/screenResponsiveFunctions'

const ServiceCard = props => {
    return (
        <TouchableOpacity style={styles.container}>
            <MaterialCommunityIcons name={'certificate-outline'} size={wp(20)} color={Colors.primaryColor} />
            <Text style={styles.title}>Service</Text>
        </TouchableOpacity>
    )
}

export default ServiceCard

const styles = StyleSheet.create({
    container: {
        width: wp(30),
        height: wp(30),
        borderWidth: 1,
        borderColor: Colors.primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 10,
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
    }
})