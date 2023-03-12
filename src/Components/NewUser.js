import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions, Alert } from 'react-native';
import ButtonRegister from '../Other/ButtonRegister';
import { RegisterUser_Action } from '../Model/Action';
import Global from '../Global';

const NewUser = ({navigation}) => {

          const [Input, setInput] = useState({
                    "name": "",
                    "lastName": "",
                    "emailAddress": "",
                    "phoneNumber": "",
                    "fcmToken": ""
          });
          const [param, setparam] = useState(
                    {
                              "name": "",
                              "lastName": "",
                              "emailAddress": "",
                              "phoneNumber": "",
                              "fcmToken": ""
                    });

          const Create_User = async () => {
                    param.phoneNumber = Global.userPhone;
                    param.fcmToken = Global.googleToken;
                    var response = await RegisterUser_Action(param);
                    //alert(JSON.stringify(response) )
                    if (response.ResultStatus == 200) {
                              navigation.navigate('สินค้า')
                    } else {
                              alert("ไม่สามารถบันทึกข้อมูลได้")
                              // navigation.navigate('Register')
                    }

          };

          return (
                    <View
                              style={{
                                        flexDirection: 'column',
                                        height: '100%',
                              }}>
                              <View style={{ backgroundColor: '#F6F6F6', flex: 0.15 }} />
                              <View style={{ backgroundColor: '#F6F6F6', flex: 0.80 }} >
                                        <Text style={style.title}>ผู้ใช้ใหม่</Text>
                                        <Text style={style.subtitle}>ข้อมูลที่บันทึกต่อไปนี้จะต้องเป็นข้อมูลจริง เพื่อปกป้องสิทธิประโยชน์ของท่าน</Text>
                                        <TextInput style={style.inputDetail}
                                                  value={Input.name}
                                                  onChangeText={text => setInput(text)}
                                                  placeholder="ชื่อจริง"></TextInput>
                                        <TextInput style={style.inputDetail}
                                                  value={Input.lastName}
                                                  onChangeText={text => setInput(text)}
                                                  placeholder="นามสกุลจริง"></TextInput>
                                        <TextInput style={style.inputDetail}
                                                  value={Input.emailAddress}
                                                  onChangeText={text => setInput(text)}
                                                  placeholder="อีเมลล์"></TextInput>

                                        <ButtonRegister onPress={() => Create_User()} title="บันทึก" />
                              </View>
                              <View style={{ backgroundColor: '#F6F6F6', flex: 0.05 }} >
                                        <Text style={style.title_end}>ข้อกำหนด</Text>
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
                    marginBottom: 25,
                    marginLeft: 25,
                    marginRight: 25,
                    textAlign: 'left',
                    fontWeight: 'normal'
          },
          inputDetail: {
                    color: '#000000',
                    fontSize: isSmallScreen ? 12 : 18,
                    marginTop: 15,
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
export default NewUser