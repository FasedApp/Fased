import React from 'react'
import { Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { theme } from '../../constants/theme'
import AntDesign from 'react-native-vector-icons/AntDesign'

const { width, height } = Dimensions.get('screen')
export const AboutUs = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,

        backgroundColor: theme.primaryColor
      }}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle="dark-content"
      />

      <LinearGradient
        colors={['#9CA3AF', '#4A4C50']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={styles.linearMainViewStyle}>
        <View
          style={{
            width: '85%',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: 20
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <AntDesign
              name="arrowleft"
              color="#FFFFFF"
              size={25}
              onPress={() => {
                navigation.navigate('Home')
              }}
            />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 20.28,
                fontFamily: 'Rubik-Medium',
                color: theme.textColor.whiteText
              }}>
              About Us
            </Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.card}>
        {/* <Text style={styles.text}>About App</Text> */}
        <Text style={styles.text1}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat
        </Text>
        <Text style={styles.text1}>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
          If you are going to use a passage of Lorem Ipsum, you need to be sure
          there isn't anything embarrassing hidden in the middle of text. All
          the Lorem Ipsum generators on the Internet tend to repeat predefined
          chunks as necessary, making this the first true generator on the
          Internet. It uses a dictionary of over 200 Latin words, combined with
          a handful of model sentence structures, to generate Lorem Ipsum which
          looks reasonable. The generated Lorem Ipsum is therefore always free
          from repetition, injected humour, or non-characteristic words etc.
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  linearMainViewStyle: {
    height: height * 0.13,
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    paddingHorizontal:10,
    paddingVertical:10,
    borderRadius:8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
},
text:{
    textAlign:"center",
    color:"#9CA3AF",
    fontSize:20,
    fontFamily:"Oswald-Medium"

},
text1:{
    textAlign:"center",
    fontSize:16,
    paddingVertical:10,
    // color:"#85796d",
    fontFamily:"Oswald-Regular"
}
})