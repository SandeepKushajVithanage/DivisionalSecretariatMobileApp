import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ImageCropPicker from 'react-native-image-crop-picker'
import RNSearchablePicker from 'rn-searchable-picker'

import { DefaultHeader, Layout, Loader } from '../../../components'
import { wp } from '../../../utils/screenResponsiveFunctions'
import { useDispatch, useSelector } from 'react-redux'
import useRequestConfig from '../../../hooks/useRequestConfig'
import { updateProfileApi } from '../../../api/authRequests'
import { setUser } from '../../../redux/actions/authActions'
import showToastMessage from '../../../utils/showToastMessage'
import { Colors, Screens } from '../../../constants'
import { getAreas } from '../../../api/dashboardRequests'

const UserDataItem = ({ title, value, editable, onChange }) => {
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.title}>{title}</Text>
            <TextInput
                multiline={!editable}
                value={value}
                style={styles.value}
                editable={editable}
                onChangeText={text => onChange(text)} />
        </View>
    )
}

const UserProfile = props => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const config = useRequestConfig({ 'Content-Type': 'multipart/form-data' })
    const configJson = useRequestConfig()

    const [editable, setEditable] = useState(false)
    const [loading, setLoading] = useState(false)

    const [subDivision, setSubDivision] = useState(null)
    const [nic, setNic] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [fullName, setFullName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')

    const [areas, setAreas] = useState([])

    const onPressCamera = () => {
        ImageCropPicker.openPicker({
            width: 300,
            height: 300,
            cropping: true
        }).then(image => {
            const file = {
                name: image?.path?.split('/').pop(),
                uri: image?.path,
                type: image?.mime,
            }

            const formData = new FormData()
            formData.append("profilePicture", file);

            setLoading(true)
            updateProfileApi(formData, config)
                .then(response => {
                    const newUser = {
                        ...user,
                        ...response.data,
                    }
                    dispatch(setUser({ user: newUser, initialRoute: null }))
                })
                .catch(error => {
                    showToastMessage(error.message)
                })
                .finally(() => {
                    setLoading(false)
                })
        })
            .catch(error => {
                showToastMessage(error.message)
            })
    }

    const onEdit = () => {
        setEditable(true)
    }

    const onChangeArea = (value, index, item) => {
        setSubDivision(value)
    }

    const onSave = () => {
        const dataset = {
            displayName,
            nic,
            area: subDivision,
            fullName,
            address,
        }

        setLoading(true)
        updateProfileApi(dataset, configJson)
            .then(response => {
                const newUser = {
                    ...user,
                    ...response.data,
                }
                dispatch(setUser({ user: newUser, initialRoute: null }))
                showToastMessage('You are up to date!')
                props.navigation.navigate(Screens.HOME_SCREEN_BOTTOM, { screen: Screens.HOME_SCREEN })
            })
            .catch(error => {
                console.error(error)
                showToastMessage(error.message)
            })
            .finally(() => {
                setEditable(false)
                setLoading(false)
            })
    }

    const getSubDivisions = () => {
        getAreas(config)
            .then(response => {
                setAreas(response.data)
            })
            .catch(error => {
                showToastMessage(error.message)
            })
    }

    const setDataToDefault = () => {
        setDisplayName(user?.displayName)
        setSubDivision(user?.area)
        setNic(user?.nic)
        setEmail(user?.email)
        setFullName(user?.fullName)
        setPhoneNumber(user?.phoneNumber)
        setAddress(user?.address)
        setEditable(false)
    }

    useEffect(() => {
        const subscribe = props.navigation.addListener('focus', () => {
            setDataToDefault()
        })
        return subscribe
    }, [props.navigation])

    useEffect(() => {
        setDataToDefault()
    }, [user])

    useEffect(() => {
        getSubDivisions()
    }, [])

    const rightIcon = () => {
        if (editable) return <FontAwesome name={'save'} size={25} color={Colors.primaryBackgroundColor} />
        else return <FontAwesome name={'edit'} size={25} color={Colors.primaryBackgroundColor} />
    }

    return (
        <Layout style={{ backgroundColor: '#FFF' }}>
            <DefaultHeader title={user?.displayName} rightIcon={rightIcon} onRightIconPress={editable ? onSave : onEdit} />
            <ScrollView flex={1}>
                <View style={styles.profilePicContainer}>
                    <View style={styles.profilePicBackground}>
                        <Image source={{ uri: user?.profilePicture }} style={styles.profilePic} />
                        <TouchableOpacity style={styles.profileCamera} onPress={onPressCamera}>
                            <FontAwesome name={'camera'} size={wp(8)} color={Colors.primaryColor} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.nameContainer}>
                        <TextInput
                            value={displayName}
                            onChangeText={text => setDisplayName(text)}
                            style={styles.displayName}
                            editable={editable}
                            multiline={!editable} />
                    </View>
                </View>
                <View style={styles.detailContainer}>
                    <View style={styles.itemContainer}>
                        <Text style={styles.title}>Sub Division</Text>
                        <RNSearchablePicker
                            value={subDivision} // initial value (optionsl)
                            onValueChange={onChangeArea}
                            items={areas.map(item => ({
                                label: item.name,
                                value: item._id,
                            }))} // required
                            placeholder={{
                                label: 'Select Sub-Division',
                                value: null,
                            }}
                            disabled={!editable}
                            searchPlaceholder={'Type here...'}
                            containerStyle={{
                                borderWidth: 0,
                                paddingHorizontal: 0,
                            }} />
                    </View>
                    {/* <UserDataItem title={'Sub Division'} value={user?.area} editable={editable} /> */}
                    <UserDataItem title={'NIC'} value={nic} onChange={setNic} editable={editable} />
                    <UserDataItem title={'Email'} value={email} onChange={setEmail} editable={false} />
                    <UserDataItem title={'Full Name'} value={fullName} onChange={setFullName} editable={editable} />
                    <UserDataItem title={'Mobile'} value={phoneNumber} onChange={setPhoneNumber} editable={editable} />
                    <UserDataItem title={'Address'} value={address} onChange={setAddress} editable={editable} />
                </View>
            </ScrollView>
            <Loader active={loading} />
        </Layout>
    )
}

export default UserProfile

const styles = StyleSheet.create({
    container: {

    },
    profilePicContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        marginTop: 10,
        backgroundColor: Colors.primaryBackgroundColor,
        borderRadius: 10,
        padding: 10,
        // paddingVertical: 20,
        paddingTop: 50,
    },
    profilePicBackground: {
        width: wp(50),
        height: wp(50),
        position: 'relative',
    },
    profilePic: {
        width: '100%',
        height: '100%',
        borderRadius: wp(25),
        borderWidth: 5,
        borderColor: Colors.primaryColor,
    },
    profileCamera: {
        position: 'absolute',
        bottom: wp(2),
        right: wp(2),
        backgroundColor: Colors.primaryBackgroundColor,
        padding: 10,
        borderRadius: 50,
    },
    nameContainer: {
        marginTop: 20,
    },
    displayName: {
        fontSize: 25,
        fontWeight: 'bold',
        color: Colors.primaryColor,
        textAlign: 'center',
    },
    title: {
        fontWeight: 'bold',
        color: Colors.primaryColor,
        marginTop: 10,
    },
    value: {
        fontWeight: 'bold',
        textAlign: 'right',
        fontSize: 16,
        // marginTop: 10,
    },
    itemContainer: {
        marginTop: 10,
        backgroundColor: Colors.primaryBackgroundColor,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    detailContainer: {
        marginHorizontal: 10,
        marginBottom: 10,
    }
})