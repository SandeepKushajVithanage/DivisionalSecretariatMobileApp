import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

import { DefaultHeader, Layout } from '../../../components'
import { wp } from '../../../utils/screenResponsiveFunctions'
import { Colors, Screens } from '../../../constants'
import { Switch } from 'react-native-paper'
import { useState } from 'react'

const OfficerCard = props => {
    const { user } = props
    return (
        <TouchableOpacity style={styles.officerCard}>
            <View style={styles.onlineIcon(props.isActive)} />
            <Image style={styles.officerAvataer} source={{ uri: user?.profilePicture }} />
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={styles.officerName}>{user?.displayName}</Text>
                <Text style={styles.officerPhoneNumber}>{user?.phoneNumber}</Text>
                <Text style={styles.officerRole}>{user?.role === 'GN' ? 'Gramasewa Niladhari' : 'Gowijanasewa Niladhari'}</Text>
            </View>
        </TouchableOpacity>
    )
}

const MyArea = props => {

    const { area, areaLoading } = useSelector(state => state.dashboard)
    const user = useSelector(state => state.auth.user)

    const [atOffice, setAtOffice] = useState(false)

    const onUpdateProfilePress = () => {
        props.navigation.navigate(Screens.USER_PROFILE)
    }

    return (
        <Layout>
            <DefaultHeader title={user?.area ? 'My Sub Division' : 'Not Registerd'} />
            {
                user.area ?
                    (
                        <ScrollView flex={1}>
                            <ImageBackground style={styles.coverImage} source={{ uri: IMAGE }}>
                                <View style={styles.coverContainer}>
                                    <Text style={styles.coverTitle}>{area?.name}</Text>
                                </View>
                            </ImageBackground>
                            {
                                user?.role === 'GS' || user?.role === 'GSN' ?
                                    (
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10, marginVertical: 20 }}>
                                            <Text style={{ fontWeight: 'bold', marginLeft: 5 }}>Are you at office?</Text>
                                            <Switch size={30} value={atOffice} onValueChange={setAtOffice} color={Colors.primaryColor} />
                                        </View>
                                    ) : (
                                        <></>
                                    )
                            }
                            <View style={styles.descriptionContainer}>
                                <Text style={styles.description}>{area?.description}</Text>
                            </View>
                            <Text style={styles.title}>Officers</Text>
                            <View style={styles.officerDetailsContainer}>
                                {
                                    area?.primaryGN ?
                                        <OfficerCard user={area?.primaryGN} isActive={atOffice} /> :
                                        null
                                }
                                {
                                    area?.primaryGSN ?
                                        <OfficerCard user={area?.primaryGSN} /> :
                                        null
                                }
                            </View>
                            <Text style={styles.title}>Notices</Text>
                            <View style={{ marginTop: 10 }}>

                            </View>
                        </ScrollView>
                    ) : (
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

export default MyArea

const styles = StyleSheet.create({
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
    },
    coverImage: {
        height: wp(50),
    },
    coverContainer: {
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
        padding: 20,
    },
    descriptionContainer: {
        margin: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.primaryColor,
        minHeight: 150,
        // backgroundColor: Colors.grayColor,
    },
    description: {
        padding: 10,
        fontSize: 16,
        // color: Colors.secondaryBackgroundColor,
    },
    officerCard: {
        width: wp(50) - 10,
        minHeight: wp(50) - 10,
        borderWidth: 1,
        borderColor: Colors.primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 10,
    },
    officerAvataer: {
        width: wp(20),
        height: wp(20),
        borderRadius: wp(10),
        borderWidth: 1,
        borderColor: Colors.primaryColor,
        marginTop: wp(5),
        marginBottom: 8,
    },
    officerDetailsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    officerRole: {
        marginTop: 'auto',
        marginBottom: 10,
    },
    officerName: {
        fontSize: 16,
        color: Colors.primaryColor,
        fontWeight: 'bold',
    },
    officerPhoneNumber: {
        fontWeight: 'bold',
    },
    coverTitle: {
        fontSize: 25,
        color: Colors.primaryBackgroundColor,
        fontWeight: 'bold',
    },
    onlineIcon: isActive => ({
        width: 15,
        height: 15,
        borderRadius: 10,
        backgroundColor: isActive ? 'green' : 'red',
        position: 'absolute',
        top: 10,
        right: 10,
    }),
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30,
    }
})

const IMAGE = "https://images.unsplash.com/photo-1586672806791-3a67d24186c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y292ZXIlMjBhcnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"