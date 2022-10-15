import { View, Text, TouchableOpacity, Button, StyleSheet, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { LoginManager, AccessToken } from 'react-native-fbsdk-next'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import { useDispatch, useSelector } from 'react-redux'

import { CustomizableButton, Layout, TextField } from '../../components'
import { Screens, Images, Colors } from '../../constants'
import { hp, wp } from '../../utils/screenResponsiveFunctions'
import showToastMessage from '../../utils/showToastMessage'
import { setSignInLoader } from '../../redux/actions/loaderActions'

const TITLE = 'Divisional Secretariate Dompe'

const FacebookIcon = () => <FontAwesome name={'facebook-f'} size={20} color={'#00F'} />

const GoogleIcon = () => <AntDesign name={'google'} size={20} color={'#F00'} />

const UserIcon = () => <Feather name={'user'} size={20} color={'grey'} />

const LockIcon = () => <Feather name={'lock'} size={20} color={'grey'} />

const SignIn = props => {

  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const loading = useSelector(state => state.loader.signIn)

  const onSignIn = () => {
    if (username === '' || password === '') return showToastMessage('username and password cannot be empty')
    dispatch(setSignInLoader(true))
    auth()
      .signInWithEmailAndPassword(username, password)
      .then(() => {
        // showToastMessage('signed in')
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          console.error('That email address is invalid!')
        }
        showToastMessage(error?.message)
        console.error(error)
        dispatch(setSignInLoader(false))
      })
  }

  const onGoogleSignIn = async () => {
    const { idToken } = await GoogleSignin.signIn()
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)
    return auth().signInWithCredential(googleCredential)
  }

  const onGoogleButtonPress = () => {
    onGoogleSignIn()
      .then(() => {
        showToastMessage('signed in with Google')
      })
      .catch(error => {
        showToastMessage(error?.message)
        console.error(error)
      })
  }

  const onFacebookButtonPress = () => {
    onFacebookSignIn()
      .then(() => {
        showToastMessage('signed in with Facebook')
      })
      .catch(error => {
        showToastMessage(error?.message)
        console.error(error)
      })
  }

  const onFacebookSignIn = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      throw 'user cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }

  const onSignUp = () => {
    props.navigation.navigate(Screens.SIGN_UP)
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }} />
      <ScrollView
        style={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Image style={styles.logo} source={Images.LOGO} />
          <Text style={styles.title}>{TITLE}</Text>
        </View>
        <View>
          <TextField
            leftIcon={UserIcon}
            textInput={{
              value: username,
              onChangeText: text => setUsername(text),
              placeholder: 'Email'
            }} />
          <TextField
            leftIcon={LockIcon}
            rightIcon
            status={showPassword}
            setStatus={setShowPassword}
            textInput={{
              value: password,
              onChangeText: text => setPassword(text),
              placeholder: 'Password',
              secureTextEntry: !showPassword,
            }} />
          <CustomizableButton text={'Sign In'} onPress={onSignIn} loading={loading} />
          <View style={styles.questionContainer}>
            <TouchableOpacity>
              <Text style={styles.questions}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <CustomizableButton
            text={'Sign In With Facebook'}
            containerStyle={styles.signInWithFacebookBtnContainer}
            textStyle={styles.signInWithFacebookBtnText}
            leftIcon={FacebookIcon}
            onPress={onFacebookButtonPress} />
          <CustomizableButton
            text={'Sign In With Google'}
            containerStyle={styles.signInWithGoogleBtnContainer}
            textStyle={styles.signInWithGoogleBtnText}
            leftIcon={GoogleIcon}
            onPress={onGoogleButtonPress} />
          <View style={[styles.questionContainer, styles.createAccountContainer]}>
            <TouchableOpacity onPress={onSignUp}>
              <Text style={styles.questions}>Don't have an account? Create here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: Colors.primaryBackgroundColor,
  },
  contentContainerStyle: {
    height: hp(90),
  },
  textInput: {
    backgroundColor: '#FFF',
    borderWidth: 1,
  },
  headerContainer: {
    alignItems: 'center',
    paddingTop: 50,
    marginBottom: 10,
  },
  logo: {
    height: hp(20),
    aspectRatio: 1,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    color: Colors.primaryColor,
    marginTop: hp(2),
    fontWeight: 'bold',
  },
  questions: {

  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    paddingHorizontal: 5,
  },
  createAccountContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInWithFacebookBtnContainer: {
    backgroundColor: '#D0E8FF',
    borderWidth: 0,
  },
  signInWithGoogleBtnContainer: {
    backgroundColor: '#FFD0D0',
    borderWidth: 0,
  },
  signInWithFacebookBtnText: {
    color: '#00F',
  },
  signInWithGoogleBtnText: {
    color: '#F00',
  }
})
