import { View, Text, Dimensions, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Global from '../Global';
import { send_VartifyOTP_Action, updatePhoneReg2 } from '../Model/Action';
import ButtonRegister from '../Other/ButtonRegister';

const VartifyOTPphone2 = ({navigation}) => {

    const [Pin, setPin] = useState('');
    const [param, setparam] = useState({ pin: '', token: '' });
  //  const [phone, setPhone] = useState('');

  const send_updatePhoneReg2 = async () => {

      //      param.pin = Pin;
       //     param.token = result;
       var response = await updatePhoneReg2(Global.userId,Global.userPhone2);
            if (response.ResultStatus == 200) {
                navigation.navigate('ผู้ใช้');
             
            } else {
                 // Global.isLogin = true;
                  //navigation.navigate('PathHome', { name: 'PathHome' })
                   alert("เกิดข้อผิดพลาด");
            }
    
};
    const send_VartifyOTP = async () => {
          AsyncStorage.getItem('OTPtoken', async (err, result) => {

      //      Global.userPhone = phoneNumber1;
     //       Global.OTPToken = response.Result;


                param.pin = Pin;
                param.token =   Global.OTPToken;
              //  AsyncStorage.getItem('PhoneRegister', phoneNumber);
                console.log('tomcode',Pin)
                console.log('tomcode',Global.userId)
              //  alert(Global.OTPToken)
                var response = await send_VartifyOTP_Action(param); 
                if (response.ResultStatus == 200) {
                 //   navigation.navigate('ผู้ใช้');
                 send_updatePhoneReg2();
                 
                } else {
                     // Global.isLogin = true;
                      //navigation.navigate('PathHome', { name: 'PathHome' })
                       alert("รหัสยืนยัน OTP ไม่ถูกต้อง")
                }
          });
    };
    
return (
    <View 
    style={{
          flexDirection: 'column',
          height: '100%',
    }}>
    <View style={{ backgroundColor: '#F6F6F6', flex: 1 }} >
          <Text style={style.title}>ใส่รหัสยืนยัน</Text>
          <Text style={style.subtitle}>รหัสยืนยันส่งไปยัง SMS บนโทรศัพท์มือถือของท่านที่ได้ระบุหมายเลข {Global.userPhone2}</Text>
          <TextInput style={style.inputOTP}
                value={Pin}
                onChangeText={text => setPin(text)}
                maxLength={6}
                keyboardType="numeric"
                placeholder="รหัส OTP 6 หลัก"></TextInput>

          <ButtonRegister style={style.ButtonPhone} onPress={() => send_VartifyOTP()} title="ยืนยัน" />
    </View>


</View>
)
}

const { width } = Dimensions.get('window');
const isSmallScreen = width <= 375; // Define the breakpoint for small screens

const style = StyleSheet.create({
      title: {
            color: '#232323',
            fontSize: isSmallScreen ? 18 : 25,
            marginLeft: 25,
            marginRight: 25,
            textAlign: 'left',
            fontWeight: 'bold'
      },
      subtitle: {
            color: '#F0C3C3',
            fontSize: isSmallScreen ? 12 : 18,
            marginTop: 25,
            marginLeft: 25,
            marginRight: 25,
            textAlign: 'left',
            fontWeight: 'normal'
      },
      inputOTP: {
            color: '#000000',
            fontSize: isSmallScreen ? 12 : 18,
            marginTop: 35,
            marginLeft: '20%',
            marginRight: '20%',
            height: 45,
            textAlign: 'center',
            fontWeight: 'bold',
            backgroundColor: '#F6F6F6',
            borderBottomColor: '#444444',
            borderBottomWidth: 2,
      },
      ButtonPhone: {

            marginTop: 35,
            marginLeft: 25,
            marginRight: 25,
            height: 45,
      },
      title_end: {
            color: '#BA3C3C',
            fontSize: isSmallScreen ? 10 : 18,
            marginLeft: 25,
            marginRight: 25,
            textAlign: 'center',
            fontWeight: 'bold',
            textDecorationLine: 'underline',
      },
});

export default VartifyOTPphone2