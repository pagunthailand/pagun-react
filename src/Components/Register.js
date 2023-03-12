import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions, Alert } from 'react-native';
import ButtonRegister from '../Other/ButtonRegister';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { send_OTP_Action } from '../Model/Action';
import Global from '../Global';




const Register = ({ navigation }) => {

          AsyncStorage.getItem('isLoggedIn').then((res) => {

                    if (res == 'true') {
                              Global.isLogin = 'true';
                              // alert('if -- >' + Global.isLogin + JSON.stringify(res))
                              navigation.navigate('สินค้า')
                    } else {
                              Global.isLogin = 'false';
                              navigation.navigate('Register')
                    }

          })

          const [phoneNumber, setPhoneNumber] = useState('');
          const [phone, setphone] = useState({ phone: '' });

          const send_OTP = async () => {
                    phone.phone = phoneNumber;
                    // alert(phone.phone + '333');
                    var response = await send_OTP_Action(phone);
                    if (response.ResultStatus == 200) {
                              AsyncStorage.setItem('PhoneRegister', phoneNumber);
                              AsyncStorage.setItem('OTPtoken', response.Result);
                              Global.userPhone = phoneNumber;
                              Global.OTPToken = response.Result;
                              navigation.navigate('VartifyOTP', { name: 'VartifyOTP' })
                              // AsyncStorage.getItem('PhoneRegister', (err, result) => {

                              //           alert("res " + JSON.stringify(result))
                              // });

                    } else {
                              Global.userPhone = phoneNumber;
                              AsyncStorage.setItem('isLoggedIn', 'true');
                              Global.isLogin = 'true'
                              navigation.navigate('สินค้า', { name: 'สินค้า' })
                              alert("ไม่สามารถส่ง OTP ได้กรุณาตรวจสอบเบอร์" + Global.isLogin)
                    }

          };

          return (
                    <View
                              style={{
                                        flexDirection: 'column',
                                        height: '100%',
                              }}>
                              <View style={{ backgroundColor: '#F6F6F6', flex: 0.15 }} />
                              <View style={{ backgroundColor: '#F6F6F6', flex: 0.8 }} >
                                        <Text style={style.title}>ระบุหมายเลขโทรศัพท์ ที่ใช้ในการลงทะเบียนของคุณ</Text>
                                        <Text style={style.subtitle}>กรุณาอ่านข้อกำหนดและนโยบายให้ครบถ้วนก่อนดำเนินรายการต่อไป เพื่อสิทธิประโยชน์ของท่าน</Text>
                                        <TextInput style={style.inputPhone}
                                                  value={phoneNumber}
                                                  onChangeText={text => setPhoneNumber(text)}
                                                  maxLength={10}
                                                  placeholder="เบอร์โทรศัพท์ 10 หลัก"></TextInput>

                                        <ButtonRegister style={style.ButtonPhone} onPress={() => send_OTP()} title="ต่อไป" />
                              </View>
                              <View style={{ backgroundColor: '#F6F6F6', flex: 0.05 }} >
                                        <Text style={style.title_end}>ข้อกำหนด</Text>
                              </View>

                    </View>
          )


}


const { width } = Dimensions.get('window');
const isSmallScreen = width <= 375;
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
          inputPhone: {
                    color: '#000000',
                    fontSize: isSmallScreen ? 12 : 18,
                    marginTop: 35,
                    marginLeft: 25,
                    marginRight: 25,
                    height: 45,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    borderWidth: 1,
                    borderRadius: 15,
                    backgroundColor: '#E5E5E5',
                    borderColor: '#E5E5E5'
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
export default Register