import React, { Component, useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  PermissionsAndroid,
  Keyboard,
  TouchableWithoutFeedback,
  Alert
} from 'react-native'
import { Images } from '../../constants/images'
import { theme } from '../../constants/theme'
import Button from '../../components/Button'
const { width, height } = Dimensions.get('screen')
import AntDesign from 'react-native-vector-icons/AntDesign'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'

import Feather from 'react-native-vector-icons/Feather'
import ToggleButton from '../../components/ToggleButton/index'
import { useDispatch } from 'react-redux'
import { ReportIncidentLocationFloorData } from '../../stores/actions/user.action'
import { renderSearchLocation } from './locationModal'
import Geolocation from '@react-native-community/geolocation'
import ToastMessage from '../../components/ToastMessage/ToastMessage'
import { useTranslation } from 'react-i18next'
import { arToEnNumber } from '../../utils/helper'

export const ReportIncident = ({ navigation, route }) => {
  const { t } = useTranslation()
  const [location, setLocation] = useState({
    latitude: 51.6,
    longitude: 18.0,
    title: 'User1',
    description: 'HelloUser1',
    image: Images.Pictures.green
  })
  const [visible, setVisible] = useState(false)
  const [floor, setFloor] = useState(0)
  const mapRef = useRef(null)
  const [enabled, setEnabled] = useState(true)

  const dispatch = useDispatch()
  const onSelectSwitch = index => {
    if (index == 2 || !enabled) {
      setEnabled(true)
    } else {
      setEnabled(false)
    }
  }
  const [initialRegion, setinitialRegion] = useState({
    latitude: 52.5,
    longitude: 19.2,
    latitudeDelta: 0.02,
    longitudeDelta: 0.01
  })
  useEffect(() => {
    if(route?.params?.region) {
      mapRef.current.animateToRegion({ ...initialRegion, ...route?.params?.region }, 2000)
      setLocation({ ...location, ...route?.params?.region })
      setinitialRegion({ ...initialRegion, ...route?.params?.region })
    }else {
      Geolocation.getCurrentPosition(info => {
        mapRef.current.animateToRegion({ ...initialRegion, ...info.coords }, 2000)
        setLocation({ ...location, ...info.coords })
        setinitialRegion({ ...initialRegion, ...info.coords })
      })
    }
  }, [])
  const allMarkers = [
    {
      latitude: 51.6,
      longitude: 18.0,
      title: 'User1',
      description: 'HelloUser1',
      image: Images.Pictures.green
    }
  ]


  // useEffect(() => {
  //   const watchId = Geolocation.watchPosition(
  //     pos => {
  //       console.log("POSITION", pos)
  //       mapRef.current.animateToRegion(
  //         { ...initialRegion, ...pos?.coords },
  //         2000
  //       )
  //     },
  //     e => setError(e.message)
  //   );
  //   return () => Geolocation.clearWatch(watchId);
  // }, []);


  const animateToCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      info => {
        setinitialRegion({ ...initialRegion, ...info.coords })
        mapRef.current.animateToRegion(
          { ...initialRegion, ...info.coords },
          2000
        )
      },
      err => {
        console.log('err', Alert.alert('Permission denied!', err.message))
      }
    )
  }

  const onRegionChange = region => {
    setinitialRegion(region)

    // set
  }

    console.log('initialRegion', initialRegion)

  const next = () => {
    let value = /^\+?(0|[1-9]\d*)$/.test(arToEnNumber(floor))

    if (enabled) {
      let data = {
        latitude: initialRegion.latitude,
        longitude: initialRegion.longitude,
        floor: '0'
      }
      console.log('data', data)
      dispatch(ReportIncidentLocationFloorData(data, navigation))
    } else {
      if (floor == '') {
        ToastMessage(
          'Floor must be selected and cannot be left blank',
          null,
          'error'
        )
      } else if (!value) {
        ToastMessage('Floor should must be in number', null, 'info')
      } else {
        let data = {
          latitude: initialRegion.latitude,
          longitude: initialRegion.longitude,
          floor: floor
        }
        // console.log('data', data)
        dispatch(ReportIncidentLocationFloorData(data, navigation))
      }
    }
  }

  const onDone = e => {
    setVisible(!visible)
    setinitialRegion({ ...initialRegion, ...e })
    mapRef.current.animateToRegion({ ...initialRegion, ...e }, 2000)
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.primaryColor
      }}>
      {renderSearchLocation(visible, onDone)}

      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle="dark-content"
      />
      <View style={styles.headerContainer}>
        <View style={styles.rowViewStyle}>
          <AntDesign
            name="arrowleft"
            color="#000000"
            size={22}
            onPress={() => {
              navigation.goBack()
            }}
          />
          <Text style={styles.reportTextStyle}>{t('Report_Incident')}</Text>
        </View>
        {/* <Text style={styles.dateTextStyle}>01 - 03</Text> */}
      </View>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
        {/* <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}> */}
        <>
          <View>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: '#bdbdbd',
                width: '90%',
                alignSelf: 'center',
                borderRadius: 5,
                marginVertical: 10,
                height: height / 20
                // alignItems: 'center'
                // justifyContent: 'center'
              }}>
              <View style={{ justifyContent: 'center', paddingHorizontal: 15 }}>
                <Feather
                  name="search"
                  color={theme.iconsColor.SearchIcon}
                  size={18}
                />
              </View>
              <View style={{ marginTop: Platform.OS == 'ios' ? 10 : 0 }}>
                <TextInput
                  placeholder={t('Where_did_it_happen?')}
                  placeholderTextColor={theme.textColor.placeholderColor}
                  onPressIn={() => setVisible(true)}
                  
                />
              </View>
            </View>
          </View>
          <View style={styles.markerFixed}>
            <Image
              style={{ width: 58, height: 58 }}
              resizeMode={'contain'}
              source={Images.Pictures.red}
            />
          </View>
          <View style={{}}>
            <MapView
              showsCompass={true}
              showScale={true}
              showsIndoors={true}
              showsUserLocation={true}
              compassOffset={{ x: -(width - 60), y: 0 }}
              initialRegion={initialRegion}
              provider={PROVIDER_GOOGLE}
              style={{ height: '80%' }}
              onRegionChangeComplete={onRegionChange}
              onPress={e =>
                onRegionChange({
                  ...initialRegion,
                  ...e?.nativeEvent?.coordinate
                })
              }
              // provider={PROVIDER_GOOGLE}
              ref={mapRef}>
              {allMarkers.map((item, i) => {
                return (
                  <Marker
                    pointerEvents="none"
                    key={i}
                    coordinate={{
                      latitude: item.latitude,
                      longitude: item.longitude
                    }}>
                    <Image
                      source={item.image}
                      style={{ width: 58, height: 58 }}
                      resizeMode={'contain'}
                    />
                  </Marker>
                )
              })}
            </MapView>
          </View>
          <View style={styles.mapActionsContainer}>
            <View style={styles.verticalBtnContainer}>
              {/* <View>
                <Button
                  image={Images.Pictures.compass}
                  buttonStyle={styles.squareBtn}
                  onPress={() => animateToCurrentLocation()}
                />
              </View> */}
              {Platform.OS == 'ios' && (
                <View>
                  <Button
                    image={Images.Pictures.currentLocIcon}
                    linearColor1="#fff"
                    linearColor2="#fff"
                    imageStyle={{ tintColor: '#616161' }}
                    buttonStyle={styles.squareBtn}
                    onPress={() => animateToCurrentLocation()}
                  />
                </View>
              )}
            </View>
          </View>

          <View style={styles.footerViewStyle}>
            <View style={styles.footerRowViewStyle}>
              <View style={styles.textAndToggleViewStyle}>
                <Text style={styles.footerRowTextStyle}>{t('Ground_Floor')}</Text>
                <ToggleButton
                  selectionMode={enabled ? 2 : 1}
                  onSelectSwitch={onSelectSwitch}
                />
              </View>
              <View style={styles.textAndToggleViewStyle2}>
                <Text style={styles.footerRowTextStyle}>{t('Floor')}</Text>
                {enabled ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setEnabled(false)}>
                    <Text>{t('Ground_Floor')}</Text>
                  </TouchableOpacity>
                ) : (
                  <TextInput
                    editable={enabled ? false : true}
                    placeholder={t('11th')}
                    placeholderTextColor={theme.textColor.placeholderColor}
                    keyboardType={
                      Platform.OS == 'ios'
                        ? 'numbers-and-punctuation'
                        : 'number-pad'
                    }
                    maxLength={3}
                    onChangeText={number => {
                      setFloor(number)
                    }}
                    style={{
                      width: 63,
                      height: 36,
                      borderWidth: 0.8,
                      borderColor: theme.bordersColor.InputBorder,
                      borderRadius: 5,
                      paddingHorizontal: 15,
                      fontSize: 12,
                      fontFamily: 'Rubik-Regular',
                      color: 'black'
                    }}
                  />
                )}
              </View>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Button
                onPress={() => {
                  next()
                }}
                buttonStyle={{ width: '85%', alignSelf: 'center' }}
                title={t('Next')}
              />
            </View>
          </View>
          {/* </ScrollView> */}
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '90%',
    alignSelf: 'center',
    height: height * 0.1,
    // backgroundColor: 'red',
    marginTop: Platform.OS == 'android' ? 15 : -10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  rowViewStyle: {
    // width: '50%',

    flexDirection: 'row',
    alignItems: 'center'
    // justifyContent: 'space-between'
  },
  reportTextStyle: {
    paddingLeft: 20,
    fontSize: 20.28,
    fontFamily: 'Rubik-Medium'
  },
  dateTextStyle: {
    color: theme.textColor.grayText2,
    fontSize: 15,
    fontFamily: 'Rubik-Regular'
  },
  searchIconStyle: {
    width: 30,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },

  mapActionsContainer: {
    position: 'absolute',
    top: height / 11,
    width: '20%',
    left: 0,
    paddingHorizontal: 20
  },
  verticalBtnContainer: {
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    height: 120
  },
  squareBtn: {
    height: 35,
    width: 35,
    borderRadius: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    opacity: 0.7
  },
  reportBtn: { alignSelf: 'center', top: 20 },

  footerViewStyle: {
    position: 'absolute',
    bottom: 0,
    height: height * 0.223,
    backgroundColor: theme.backgrounds.whiteBG,
    width: '100%'
  },
  footerRowViewStyle: {
    width: '95%',
    alignSelf: 'center',
    // backgroundColor: 'red',
    height: height * 0.12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  textAndToggleViewStyle: {
    flexDirection: 'row',
    width: '40%',
    // backgroundColor: 'green',
    justifyContent: 'space-between'
  },
  textAndToggleViewStyle2: {
    flexDirection: 'row',
    width: '30%',
    // backgroundColor: 'green',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  footerRowTextStyle: {
    color: theme.textColor.blackText,
    fontFamily: 'Rubik-Medium',
    fontSize: 13
  },
  markerFixed: {
    left: '50%',
    marginLeft: -30,
    marginTop: Platform.OS == "ios" ? -120 : -135,
    position: 'absolute',
    top: '50%',
    zIndex: 1
  }
})
