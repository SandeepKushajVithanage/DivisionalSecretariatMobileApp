import { View, Text, Button, StyleSheet, Image } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth'
import VideoPlayer from 'react-native-video-player'
import AppIntroSlider from 'react-native-app-intro-slider'

import { MainHeader, Layout } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../redux/actions/authActions'
import { Colors, Images } from '../../constants'
import { hp, wp } from '../../utils/screenResponsiveFunctions'

const SLIDES = [Images.SLIDER_IMAGE_1, Images.SLIDER_IMAGE_2, Images.SLIDER_IMAGE_3, Images.SLIDER_IMAGE_4, Images.SLIDER_IMAGE_5]

const HomeScreen = props => {

  const renderItem = ({ item }) => (
    <View style={styles.imageSlide}>
      <Image source={item} style={styles.sliderImage} />
    </View>
  )

  return (
    <Layout style={styles.container}>
      <MainHeader />
      <View style={styles.imageSliderContainer}>
        <AppIntroSlider
          renderItem={renderItem}
          data={SLIDES}
          renderNextButton={() => null}
          renderDoneButton={() => null}
          activeDotStyle={styles.activeDotStyle}
          dotStyle={styles.dotStyle} />
      </View>
    </Layout>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
  imageSliderContainer: {
    height: hp(40),
    position: 'relative',
  },
  imageSlide: {
    width: '100%',
    // height: '90%',
  },
  sliderImage: {
    width: '100%',
    height: '100%',
  },
  activeDotStyle: {
    backgroundColor: Colors.primaryColor,
    // position: 'absolute',
    marginTop: 110,
  },
  dotStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    marginTop: 110,
  },
})

// rgba(255,206,49,1), rgba(254,244,186,1)