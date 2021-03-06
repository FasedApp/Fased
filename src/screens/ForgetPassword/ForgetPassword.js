import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  StatusBar,
  ActivityIndicator
} from 'react-native'
import { Images } from '../../constants/images'
import { Dimensions } from 'react-native'
import CheckBox from 'react-native-check-box'
import { theme } from '../../constants/theme'
import Button from '../../components/Button'
const { width, height } = Dimensions.get('window')
import { AuthHeader } from '../../components/AuthHeader/AuthHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import ToastMessage from '../../components/ToastMessage/ToastMessage'
import { useDispatch } from 'react-redux'
import { ForgotPasswordAction } from '../../stores/actions/user.action'
import { Forgot_Password } from '../../utils/mutation'
import { useMutation, useLazyQuery } from '@apollo/client'
import { useTranslation } from 'react-i18next'
export const ForgetPassword = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const { t } =  useTranslation()
  const dispatch = useDispatch()
  const [forgotPassword, { data, loading, error }] =
    useMutation(Forgot_Password)
  const forgotPasswordFunc = () => {
    let value =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    if (email == '') {
      ToastMessage('Please enter email', null, 'error')
    } else if (!value) {
      ToastMessage('Please enter a valid email address', null, 'info')
    } else {
      forgotPassword({
        variables: {
          email: email
        }
      })
        .then(data => {
          // console.log('data return', data.data.forgotPassword.status)
          if (data?.data?.forgotPassword?.status) {
            // ToastMessage(data?.data?.forgotPassword?.message, null, 'success')
            ToastMessage('Otp sent to your email address', null, 'success')

            navigation.navigate('Otp', {
              emailFromParam: email
            })
          } else {
            ToastMessage(data?.data?.forgotPassword?.message, null, 'error')
          }
        })
        .catch(error => {
          console.log('error', error)
          if (error) {
            ToastMessage('Something went wrong', null, 'error')
          } else {
            ToastMessage(error?.data?.forgotPassword?.message, null, 'error')
          }
        })
    }
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <AuthHeader
        onPress={() => {
          navigation.goBack()
        }}
      />
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={'dark-content'}
      />

      <View style={styles.logoContainer}>
        <Image
          source={Images.Pictures.logo}
          style={{ width: 105, height: 105 }}
        />
      </View>
      <View style={styles.textView}>
        <Text style={styles.ForgetPasswordText}>{t('Forgot_Password')}</Text>
        <View
          style={{
            backgroundColor: '#FE0000',
            width: 21,
            height: 1,
            marginTop: 8
          }}
        />
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.InputContainer}>
          <View style={{ width: '83%', alignSelf: 'center', marginTop: 8 }}>
            <Text style={styles.inputLabel}>{t('Email_address')}</Text>
          </View>

          <TextInput
            style={styles.input}
            // onChangeText={onChangeNumber}
            // value={'123456789012'}
            placeholder="Eg namaemail@emailkamu.com"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={text => {
              setEmail(text)
            }}
          />
        </View>

        <View
          style={{
            width: '76%',
            alignSelf: 'center',
            marginTop: 8,
            paddingVertical: 10
          }}>
          <Text
            style={{
              color: '#A8AEB9',
              fontSize: 14,
              fontFamily: 'Rubik-Regular',
              lineHeight: 16,
              textAlign: 'center'
            }}>
            {t('message_sent_to_email')}
          </Text>
        </View>

        <View
          style={{
            // alignItems: 'center',
            // justifyContent: 'center',
            paddingVertical: 20
          }}>
          {loading ? (
            <ActivityIndicator size="large" color="#4A4C50" />
          ) : (
            <Button
              onPress={() => {
                forgotPasswordFunc()
              }}
              // onPress={() => { navigation.navigate('ChangePassword') }}
              buttonStyle={{
                width: '90%',
                height: 48,
                alignSelf: 'center',
                marginTop: 10
              }}
              title={t('Recover_Password')}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  logoContainer: {
    width: width,
    height: height / 4.5,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  textView: {
    width: width,
    height: height / 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ForgetPasswordText: {
    fontSize: 18,
    fontFamily: 'Rubik-Medium',
    textAlign: 'center'
  },
  InputContainer: {
    alignItems: 'center'
  },
  inputLabel: {
    color: '#374151',
    fontSize: 14,
    fontFamily: 'Rubik-Medium'
  },
  input: {
    width: '88%',
    alignSelf: 'center',
    height: 48,
    marginVertical: 8,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#BEC5D1',
    paddingHorizontal: 14,
    color: '#374151',
    fontSize: 12,
    fontFamily: 'Rubik-Regular',
    backgroundColor: '#fff'
  }
})
