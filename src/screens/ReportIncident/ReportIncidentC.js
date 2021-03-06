import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  StatusBar,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import { Images } from '../../constants/images'
import { Dimensions } from 'react-native'
import Button from '../../components/Button'
const { width, height } = Dimensions.get('window')
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  Create_Report_Incident,
  Create_Report_Incident_without_SubCat
} from '../../utils/mutation'
import { useMutation, useLazyQuery } from '@apollo/client'
import { ReportIncidentAllData } from '../../stores/actions/user.action'
import ToastMessage from '../../components/ToastMessage/ToastMessage'
import { useTranslation } from 'react-i18next'
import { arToEnNumber } from '../../utils/helper'

export const ReportIncidentC = ({ navigation }) => {
  const { t, i18n } = useTranslation()
  const [loader, setLoader] = useState(false)
  const [textNew, setText] = useState('')
  const [height, setheight] = useState(0)
  const isGuest = useSelector(state => state.userReducer.isGuest)
  const selectedLanguageCode = i18n.language

  const [CreateReport, { data, loading, error }] = useMutation(
    Create_Report_Incident
  )
  const [CreateReportWithoutSubCat] = useMutation(
    Create_Report_Incident_without_SubCat
  )
  const reportIncidentLocationFloorData = useSelector(
    state => state?.userReducer?.reportIncidentLocationFloorData
  )
  const reportIncidentAllData = useSelector(
    state => state?.userReducer?.reportIncidentAllData
  )
  // const [text, setText] = useState('')
  const [userId, setUserId] = useState('')

  useEffect(() => {
    getUserData()
  }, [])

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem('userData')
    let data = JSON.parse(userData)
    setUserId(data?.id)

    // console.log('data', data.id)
  }

  const next = () => {
    // console.log("DATA DATA", {
    //   userId: isGuest ? 0 : parseInt(userId),
    //   categoryId: reportIncidentAllData?.category,
    //   subCategoryId: reportIncidentAllData?.subcategory,
    //   latitude: reportIncidentLocationFloorData?.latitude,
    //   longitude: reportIncidentLocationFloorData?.longitude,
    //   suspectName: reportIncidentAllData?.suspectName,
    //   costMoney: parseInt(selectedLanguageCode == 'ar' ? arToEnNumber(reportIncidentAllData?.amount)  : reportIncidentAllData?.amount),
    //   incidentDate: reportIncidentAllData?.date,
    //   incidentTime: reportIncidentAllData?.time,
    //   description: textNew ? textNew : '',
    //   floor: parseInt(selectedLanguageCode == 'ar' ? arToEnNumber(reportIncidentLocationFloorData?.floor)  : reportIncidentLocationFloorData?.floor)
    // }, arToEnNumber(reportIncidentLocationFloorData?.floor), reportIncidentLocationFloorData )

    // console.log(
    //   'object',

    //   {
    //     userId: parseInt(userId),
    //     categoryId: reportIncidentAllData?.category,
    //     latitude: reportIncidentLocationFloorData?.latitude,
    //     longitude: reportIncidentLocationFloorData?.longitude,
    //     suspectName: reportIncidentAllData?.suspectName,
    //     costMoney: parseInt(reportIncidentAllData?.amount),
    //     incidentDate: reportIncidentAllData?.date,
    //     incidentTime: reportIncidentAllData?.time,
    //     description: textNew,
    //     floor: parseInt(reportIncidentLocationFloorData?.floor)
    //   }
    // )
    setLoader(true)
    if (textNew == '' || textNew == undefined) {
      setLoader(false)
      ToastMessage("Description field shouldn't be empty", null, 'error')
    } else {
      if (reportIncidentAllData?.subcategory == '0') {
        CreateReportWithoutSubCat({
          variables: {
            userId: isGuest ? 0 : parseInt(userId),
            categoryId: reportIncidentAllData?.category,
            latitude: reportIncidentLocationFloorData?.latitude,
            longitude: reportIncidentLocationFloorData?.longitude,
            suspectName: reportIncidentAllData?.suspectName,
            costMoney: parseInt(
              selectedLanguageCode == 'ar'
                ? arToEnNumber(reportIncidentAllData?.amount)
                : reportIncidentAllData?.amount
            ),
            incidentDate: reportIncidentAllData?.date,
            incidentTime: reportIncidentAllData?.time,
            description: textNew ? textNew : '',
            floor: parseInt(
              selectedLanguageCode == 'ar'
                ? arToEnNumber(reportIncidentLocationFloorData?.floor)
                : reportIncidentLocationFloorData?.floor
            )
          }
        })
          .then(data => {
            if (data?.data?.CreateReport?.status) {
              ToastMessage(data?.data?.CreateReport?.message, null, 'success')
              setLoader(false)
              navigation.navigate('ReportingDone')
            } else {
              setLoader(false)
              ToastMessage(data?.data?.CreateReport?.message, null, 'error')
            }
          })
          .catch(error => {
            if (error) {
              setLoader(false)
              ToastMessage('Something went wrong', null, 'error')
            } else {
              setLoader(false)
              ToastMessage(error?.data?.CreateReport?.message, null, 'error')
            }
          })
      } else {
        CreateReport({
          variables: {
            userId: isGuest ? 0 : parseInt(userId),
            categoryId: reportIncidentAllData?.category,
            subCategoryId: reportIncidentAllData?.subcategory,
            latitude: reportIncidentLocationFloorData?.latitude,
            longitude: reportIncidentLocationFloorData?.longitude,
            suspectName: reportIncidentAllData?.suspectName,
            costMoney: parseInt(
              selectedLanguageCode == 'ar'
                ? arToEnNumber(reportIncidentAllData?.amount)
                : reportIncidentAllData?.amount
            ),
            incidentDate: reportIncidentAllData?.date,
            incidentTime: reportIncidentAllData?.time,
            description: textNew ? textNew : '',
            floor: parseInt(
              selectedLanguageCode == 'ar'
                ? arToEnNumber(reportIncidentLocationFloorData?.floor)
                : reportIncidentLocationFloorData?.floor
            )
          }
        })
          .then(data => {
            // console.log('data return', data)
            if (data?.data?.CreateReport?.status) {
              ToastMessage(data?.data?.CreateReport?.message, null, 'success')
              setLoader(false)
              navigation.navigate('ReportingDone')
            } else {
              setLoader(false)
              ToastMessage(data?.data?.CreateReport?.message, null, 'error')
            }
          })
          .catch(error => {
            console.log('error', error, {
              userId: isGuest ? 0 : parseInt(userId),
              categoryId: reportIncidentAllData?.category,
              subCategoryId: reportIncidentAllData?.subcategory,
              latitude: reportIncidentLocationFloorData?.latitude,
              longitude: reportIncidentLocationFloorData?.longitude,
              suspectName: reportIncidentAllData?.suspectName,
              costMoney: parseInt(
                selectedLanguageCode == 'ar'
                  ? arToEnNumber(reportIncidentAllData?.amount)
                  : reportIncidentAllData?.amount
              ),
              incidentDate: reportIncidentAllData?.date,
              incidentTime: reportIncidentAllData?.time,
              description: textNew ? textNew : '',
              floor: parseInt(
                selectedLanguageCode == 'ar'
                  ? arToEnNumber(reportIncidentLocationFloorData?.floor)
                  : reportIncidentLocationFloorData?.floor
              )
            })
            if (error) {
              setLoader(false)
              ToastMessage('Something went wrong', null, 'error')
            } else {
              setLoader(false)
              ToastMessage(error?.data?.CreateReport?.message, null, 'error')
            }
          })
      }
    }
  }
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={'dark-content'}
      />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.headerContainer}>
            <View
              style={{
                flexDirection: 'row',
                width: '80%',
                alignItems: 'center'
              }}>
              <AntDesign
                name="arrowleft"
                color="#000000"
                size={22}
                onPress={() => {
                  navigation.goBack()
                }}
              />
              <Text style={styles.headerLabel}>{t('Report_Incident')}</Text>
            </View>
            <View style={{ width: '20%', alignItems: 'flex-end' }}>
              <Text
                style={{
                  color: '#909090',
                  fontSize: 15,
                  fontFamily: 'Rubik-Regular'
                }}>
                02 - 03
              </Text>
            </View>
          </View>

          <View style={styles.textAreaContainer}>
            <TextInput
              style={[
                styles.textArea,
                {
                  height: Math.max(Platform.OS == 'android' ? 35 : 35, height)
                }
              ]}
              underlineColorAndroid="transparent"
              placeholder={t('Tell_us_what_happen')}
              placeholderTextColor="#8F9BBA"
              numberOfLines={10}
              multiline={true}
              selectionColor="#a9a9a990"
              textAlignVertical="top"
              maxLength={1000}
              blurOnSubmit
              returnKeyType="done"
              onChangeText={e => {
                setText(e)
                // setState({ ...state, text: e })
              }}
              onContentSizeChange={event => {
                setheight(event.nativeEvent.contentSize.height + 40)
              }}
              // onSubmitEditing={() => {
              //   navigation.navigate('ReportingDone')
              // }}
            />
            {/* <Image
          source={Images.Pictures.textAreaIcon}
          style={{
            position: 'absolute',
            right: 10,
            top: 325,
            width: 15,
            height: 15,
            resizeMode: 'contain',
            tintColor: '#8F9BBA'
          }}
        /> */}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                margin: 15
              }}>
              <Text style={styles.countText}>{textNew?.length}</Text>
              <Text style={styles.countText}>/1000</Text>
            </View>
          </View>

          <View>
            {loader ? (
              <ActivityIndicator size="large" color="#4A4C50" />
            ) : (
              <Button
                onPress={() => {
                  next()
                }}
                // onPress={() => {
                //   navigation.navigate('ReportingDone')
                // }}
                buttonStyle={{ width: '90%', alignSelf: 'center' }}
                title={t('Done')}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },

  headerContainer: {
    width: '90%',
    alignSelf: 'center',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerLabel: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 20,
    fontFamily: 'Rubik-Medium'
  },
  textAreaContainer: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 12,
    height: height / 1.4,
    marginTop: 60
  },
  textArea: {
    // height: 350,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'justify',
    fontFamily: 'Rubik-Regular',
    borderRadius: 12,
    backgroundColor: '#F4F7FC',
    padding: 15,
    color: 'black'
  },
  countText: {
    color: '#8F9BBA',
    fontSize: 13,
    fontFamily: 'Rubik-Regular'
  }
})
