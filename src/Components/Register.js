import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions ,Alert } from 'react-native';

const Register = () => {



          return (
                    <View
                              style={{
                                        flexDirection: 'column',
                                        height: '100%',
                              }}>
                              <View style={{ backgroundColor: '#F6F6F6', flex: 0.15 }} />
                              <View style={{ backgroundColor: '#F6F6F6', flex: 0.6 }} >
                                        <Text style={style.title}>ระบุหมายเลขโทรศัพท์ ที่ใช้ในการลงทะเบียนของคุณ</Text>
                                        <Text style={style.subtitle}>กรุณาอ่านข้อกำหนดและนโยบายให้ครบถ้วนก่อนดำเนินรายการต่อไป เพื่อสิทธิประโยชน์ของท่าน</Text>
                                        <TextInput style={style.inputPhone}
                                                  placeholder="เบอร์โทรศัพท์"></TextInput>

                                       
                              </View>
                              <View style={{ backgroundColor: '#F6F6F6', flex: 0.25 }} />

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
                    backgroundColor: '#E5E5E5',
                    borderColor: '#E5E5E5'
          },
});
export default Register