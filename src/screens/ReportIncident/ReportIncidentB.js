import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, SafeAreaView, StatusBar, Dimensions, StyleSheet, ScrollView } from 'react-native'
import { Images } from '../../constants/images'
import { theme } from '../../constants/theme'
import Button from '../../components/Button'
const { width, height } = Dimensions.get('screen')
import LinearGradient from 'react-native-linear-gradient'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'



export const ReportIncidentB = ({ navigation }) => {
    const [select, setSelect] = useState([])

    const CardsData = [
        {
            img: Images.Pictures.category,
            title: 'Killing',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, sit justo vel in sapien ultrices id quam nam. ',

        },
        {
            img: Images.Pictures.harasment,
            title: 'Harrasment',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, sit justo vel in sapien ultrices id quam nam. ',

        },
        {
            img: Images.Pictures.kidnap,
            title: 'Kidnapping',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, sit justo vel in sapien ultrices id quam nam. ',

        },
        {
            img: Images.Pictures.robery,
            title: 'Robery',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, sit justo vel in sapien ultrices id quam nam. ',

        },
        {
            img: Images.Pictures.snatch,
            title: 'Snatching',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, sit justo vel in sapien ultrices id quam nam. ',

        },
        {
            img: Images.Pictures.assault,
            title: 'Assault',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, sit justo vel in sapien ultrices id quam nam. ',

        }
    ]

    // console.log('select', select)
    const selectedCard = (title) => {

        setSelect(title)

        // var arr = [...select]
        // var isFind = arr.findIndex(e => e == i)
        // if (isFind == -1) {
        //     arr.push(i)
        //     setSelect(arr)
        // }
        // else {
        //     arr.splice(isFind, 1)
        //     setSelect(arr)
        // }





    }

    // console.log('selcted', select)

    return (
        <SafeAreaView style={{
            flex: 1,

            backgroundColor: theme.primaryColor

        }}>
            <StatusBar backgroundColor={'transparent'} translucent={true} barStyle='dark-content' />



            <LinearGradient

                colors={['#9CA3AF', '#4A4C50']}
                start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }}
                style={styles.linearMainViewStyle}

            >
                <View

                    style={{
                        width: '85%',
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        marginTop: 20
                    }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',

                    }}>
                        <AntDesign name='arrowleft' color='#FFFFFF' size={25} onPress={() => { navigation.goBack() }} />
                        <Text style={{
                            marginLeft: 10,
                            fontSize: 20.28,
                            fontWeight: '500',
                            color: theme.textColor.whiteText
                        }}>Categories</Text>

                    </View>
                    <SimpleLineIcons name='options-vertical' color='#FFFFFF' size={18} />

                </View>



            </LinearGradient>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    flexGrow: 1
                }}>

                <View style={{
                    borderTopRightRadius: 15,
                    borderTopLeftRadius: 15,
                    backgroundColor: theme.backgrounds.whiteBG,
                    bottom: 10,

                }}>


                    <View style={{
                        width: '82%',
                        alignSelf: 'center',
                        marginVertical: 15,
                        flexDirection: 'row'



                    }}>

                        <Text style={{
                            fontSize: 17,
                            fontWeight: 'bold',
                            color: theme.textColor.blackText
                        }}>Select Categories</Text>





                    </View>




                    {
                        CardsData.map((item, i) => {
                            return (
                                <TouchableOpacity

                                    onPress={() => {
                                        selectedCard(item.title)
                                    }}
                                    activeOpacity={0.7}
                                    key={i}
                                    style={{
                                        width: '90%',
                                        alignSelf: 'center',
                                        height: 96.26,
                                        borderRadius: 10,
                                        backgroundColor: i == 1 ? '#FFA724' : i == 2 ? '#CF00BA' : i == 3 ? '#5819C1' : i == 4 ? '#211DE8' : i == 5 ? '#0CB9A2' : '#DF0707',
                                        flexDirection: 'row',
                                        marginBottom: 12,

                                        // alignItems: 'center',
                                    }}>

                                    <View style={{
                                        width: '30%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        // backgroundColor: 'transparent',
                                        // shadowColor: "#000",
                                        // shadowOffset: {
                                        //     width: 0,
                                        //     height: 5,
                                        // },
                                        // shadowOpacity: 0.34,
                                        // shadowRadius: 6.27,

                                        // elevation: 10,


                                    }}>
                                        <Image source={item.img} style={{
                                            width: 79.89,
                                            height: 79.89,

                                        }} />

                                    </View>
                                    <View style={{
                                        width: '70%',
                                        height: 79.89,
                                        // backgroundColor: 'green',
                                        // alignItems: 'center',
                                        justifyContent: 'center',
                                        marginTop: 6
                                    }}>

                                        <View style={{
                                            width: '92%',
                                            // backgroundColor: 'green',
                                            alignItems: 'flex-end',
                                            // marginTop: 4
                                        }}>

                                            <MaterialCommunityIcons name='circle-slice-8' color={'#ffff'} size={12} />

                                        </View>




                                        <View style={{
                                            height: 68,
                                            width: '90%'
                                            // backgroundColor: 'pink'
                                        }}>
                                            <Text style={{
                                                fontSize: 14,
                                                fontWeight: '500',
                                                color: '#ffff',
                                                paddingBottom: 5
                                            }}>
                                                {item.title}
                                            </Text>
                                            <Text style={{
                                                fontSize: 11,
                                                fontWeight: '500',
                                                color: '#fff',
                                                lineHeight: 12
                                                // marginBottom: 10
                                            }}>
                                                {item.description}
                                            </Text>
                                        </View>

                                    </View>





                                </TouchableOpacity>
                            )
                        })
                    }


                    <View

                        style={{
                            marginTop: 10
                        }}>
                        <Button
                            onPress={() => {
                                navigation.navigate('ReportIncidentC')
                            }}
                            linearColor1={'#9CA3AF'}
                            linearColor2={'#4A4C50'}

                            title={'Done'}
                            buttonStyle={{
                                width: '90%',
                                alignSelf: 'center'
                            }} />
                    </View>


                </View>



            </ScrollView>




            <View >

            </View>








        </SafeAreaView>
    )
}




const styles = StyleSheet.create({

    linearMainViewStyle: {
        height: height * 0.13,
        alignItems: 'center',
        justifyContent: 'center'
    }


})