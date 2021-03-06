import React, { useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  StatusBar,
  Platform
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import { Images } from '../../constants/images'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LOGOUT } from '../../stores/actions/actionType'
import { useTranslation } from 'react-i18next'

export const CustomDrawer = ({ navigation }) => {
  const { t } = useTranslation()
  const [active, setActive] = useState('')
  const isGuest = useSelector(state => state.userReducer.isGuest)
  const dispatch = useDispatch()
  const Data = [
    {
      title: t('Home'),
      navigateTo: 'Home'
    },
    {
      title: t('About_Us'),
      navigateTo: 'AboutUs'
    },
    {
      title: t('Settings'),
      navigateTo: 'Settings'
    },
    {
      title: isGuest ? t('Sign_Up') : t('LogOut'),
      navigateTo: isGuest ? 'Sign Up' : 'Sign In'
    }
    // {
    //   title: 'Logout'
    //   // navigateTo: 'SignIn'
    // }
  ]
  const removeUser = async () => {
    try {
      if (Platform.OS == 'ios') {
        await AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove)
      } else {
        await AsyncStorage.clear()
      }
      dispatch(dispatchh => {
        dispatchh({ type: LOGOUT })
      })
      navigation.navigate('AuthStackNavigator', {
        screen: 'SignIn'
      })
      return true
    } catch (exception) {
      console.log('exception exception', exception)
      return false
    }
  }
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={'dark-content'}
      />
      <View style={styles.topCutButton}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}>
          <Image
            source={Images.Pictures.closeIcon}
            style={{ width: 13, height: 13, resizeMode: 'contain' }}
          />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {Data.map((item, i) => {
          return (
            <LinearGradient
              key={i}
              colors={
                active == i
                  ? ['#ffffff20', '#6C8CB220', '#ffffff20']
                  : ['#ffffff', '#ffffff']
              }
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              style={styles.mainView}>
              <TouchableOpacity
                onPress={() => {
                  setActive(i)
                  if (i == 3) {
                    // AsyncStorage.removeItem('userData')
                    removeUser()
                  } else {
                    item.navigateTo && navigation.navigate(item.navigateTo)
                  }

                  // i == 3 ? AsyncStorage.removeItem('userData')   :
                  // item.navigateTo && navigation.navigate(item.navigateTo)
                  //   alert('Navigate')
                }}
                activeOpacity={0.7}
                key={i}
                style={{
                  height: 65,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: i == active ? '#fff' : 'transparent',
                  marginVertical: 8
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'OpenSans-Bold',
                    color: i == active ? '#000' : '#ACB8BE'
                  }}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          )
        })}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  topCutButton: {
    alignItems: 'flex-end',
    marginTop: 50,
    paddingRight: 20
  },
  mainView: {
    width: '100%'
  }
})
