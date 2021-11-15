import React from 'react'
import { View, Text, TouchableOpacity, Image, SafeAreaView, StatusBar, Dimensions, StyleSheet } from 'react-native'
import { theme } from '../../constants/theme'
import AntDesign from 'react-native-vector-icons/AntDesign'


export const AuthHeader = ({
    guestUser,
    onPress = () => { }

}) => {
    return (
        <View style={{
            width: '85%',
            alignSelf: 'center',
            height: 50,
            // backgroundColor: 'red',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <AntDesign name='arrowleft' color='#000000' size={24} />


            {
                guestUser && <TouchableOpacity
                    activeOpacity={0.7}
                    style={{
                        width: 163,
                        height: 36,
                        borderRadius: 10,
                        backgroundColor: '#f9f9fb',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <Text style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: theme.textColor.litGrayText
                    }}>Continue As Guest User</Text>
                </TouchableOpacity>
            }

        </View>
    )
}


