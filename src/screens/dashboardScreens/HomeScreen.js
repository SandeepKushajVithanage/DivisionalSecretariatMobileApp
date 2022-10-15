import { View, Text, Button, StyleSheet, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth'
import VideoPlayer from 'react-native-video-player'
import AppIntroSlider from 'react-native-app-intro-slider'

import { MainHeader, Layout, ServiceCard } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../redux/actions/authActions'
import { Colors, Images } from '../../constants'
import { hp, wp } from '../../utils/screenResponsiveFunctions'
import { getAreas } from '../../api/dashboardRequests'
import showToastMessage from '../../utils/showToastMessage'

const SLIDES = [Images.SLIDER_IMAGE_1, Images.SLIDER_IMAGE_2, Images.SLIDER_IMAGE_3, Images.SLIDER_IMAGE_4, Images.SLIDER_IMAGE_5]

const MISSION = 'To assure an efficient and fruitful state service which fulfill the desires of the people according to the government policy and the provincial administrational structure with a genuine resources coordination.'

const VISION = 'To provide efficient and fruitful state service to the customer.'

const HomeScreen = props => {

  const [subDivisions, setSubDivisions] = useState([])

  const getSubDivisions = () => {
    getAreas()
      .then(response => {
        setSubDivisions(response.data)
      })
      .catch(error => {
        showToastMessage(error.message)
      })
  }

  useEffect(() => {
    getSubDivisions()
  }, [])

  const renderItem = ({ item }) => (
    <View style={styles.imageSlide}>
      <Image source={item} style={styles.sliderImage} />
    </View>
  )

  return (
    <Layout>
      <MainHeader />
      <ScrollView flex={1} style={styles.container} contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.imageSliderContainer}>
          <AppIntroSlider
            renderItem={renderItem}
            data={SLIDES}
            renderNextButton={() => null}
            renderDoneButton={() => null}
            activeDotStyle={styles.activeDotStyle}
            dotStyle={styles.dotStyle} />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>MISSION</Text>
          <Text style={styles.sectionDescription}>{MISSION}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>VISION</Text>
          <Text style={styles.sectionDescription}>{VISION}</Text>
        </View>
        <Text style={styles.title}>Services (Coming soon)</Text>
        <View style={styles.servicesContainer}>
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
        </View>
        <Text style={styles.title}>Government Service Centers</Text>
        <View style={styles.servicesContainer}>
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
        </View>
      </ScrollView>
    </Layout>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryBackgroundColor,
  }, contentContainerStyle: {
    paddingBottom: 40,
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
    display: 'none',
  },
  dotStyle: {
    display: 'none',
  },
  section: {
    marginHorizontal: 10,
    marginTop: 10,
    paddingVertical: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primaryColor,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: Colors.primaryColor,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
  sectionDescription: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
  }
})

// rgba(255,206,49,1), rgba(254,244,186,1)