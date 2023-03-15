import { View, Text, StyleSheet, TextInput, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetUserByid_Action, UpdateUser_Action } from '../Model/Action'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonSave from '../Other/ButtonSave';
import ButtonRegisPhone from '../Other/ButtonRegisPhone';

const User = ({navigation}) => {

  [_name, setName] = useState('');
  [lastName, setlastName] = useState('');
  var [emailAddress, setemailAddress] = useState('');
  [phoneNumber, setphoneNumber] = useState('');

  [data, setData] = useState({
    "id": null,
    "googleAuthenticatorKey": null,
    "facebookAuthenticatorKey": null,
    "departmentCode": null,
    "userTyp": null,
    "isActive": null,
    "isDeleted": false,
    "isEmailConfirmed": null,
    "isLockoutEnabled": null,
    "isPhoneNumberConfirmed": null,
    "username": null,
    "name": null,
    "lastName": null,
    "phoneNumber": null,
    "password": null,
    "passwordResetCode": null,
    "signInToken": null,
    "signInTokenExpireTimeUtc": null,
    "createTime": null,
    "emailAddress": null,
    "pictureUrl": null,
    "loginId": null,
    "addressNumber": null,
    "addressSoi": null,
    "message": null,
    "winNumber": null,
    "smsStatus": null,
    "notiStatus": null,
    "loginTyp": null,
    "phoneReg1": null,
    "phoneReg2": null,
    "phoneReg1approveTime": null,
    "phoneReg2approveTime": null,
    "fcmToken": null
  });

  useEffect(() => {
   

  

    const unsubscribe = navigation.addListener('focus', () => {
      AsyncStorage.getItem('sessionID', async (err, result_sessionID) => {

        await GetUserByid_Action(parseInt(result_sessionID)).then((res_GetUserByid_Action) => {
          data = setData(res_GetUserByid_Action.Result);
        });
      });
    });
    return unsubscribe;

  }, []);

  const GetUserByid = async () => {
    AsyncStorage.getItem('sessionID', async (err, result_sessionID) => {

      await GetUserByid_Action(parseInt(result_sessionID)).then((res_GetUserByid_Action) => {
        data = setData(res_GetUserByid_Action.Result);
      });
    });
  }

  const update_User = async () => {
    var response = await UpdateUser_Action(data);
    if (response.ResultStatus == 200) {
      alert("สำเร็จ")
      GetUserByid
    } else {
      alert("ไม่สำเร็จ")
    }
  };

  const LinkToRes =  () => {
    navigation.navigate('VartifyOTPphone1')
  };
  const handleNameChange = (value) => {
    setData(prevData => ({ ...prevData, name: value }));
  }
  const handlelastNameChange = (value) => {
    setData(prevData => ({ ...prevData, lastName: value }));
  }
  const handleemailAddressChange = (value) => {
    setData(prevData => ({ ...prevData, emailAddress: value }));
  }
  const handlephoneNumberChange = (value) => {
    setData(prevData => ({ ...prevData, phoneNumber: value }));
  }
  return (
    <View style={{ backgroundColor: '#F6F6F6', flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <Text style={style.title_header}>ตั้งค่าบัญชีผู้ใช้</Text>
        <View style={style.title_box}>
          <Text style={style.text_title_input}>ชื่อจริง</Text>
          <TextInput style={style.input}
            value={data.name}
            onChangeText={handleNameChange}
            placeholder="ต้องระบุ"></TextInput>

          <Text style={style.text_title_input}>นามสกุลจริง</Text>
          <TextInput style={style.input}
            value={data ? data.lastName : ''}
            onChangeText={handlelastNameChange}
            placeholder="ต้องระบุ"></TextInput>

          <Text style={style.text_title_input}>เบอร์โทรศัพท์หลัก</Text>
          <TextInput style={style.input}
            value={data ? data.phoneNumber : ''}
            onChangeText={handlephoneNumberChange}
            maxLength={10}
            placeholder="ต้องระบุ"></TextInput>

          <Text style={style.text_title_input}>อีเมลล์</Text>
          <TextInput style={style.input}
            value={data ? data.emailAddress : ''}
            onChangeText={handleemailAddressChange}
            placeholder="ต้องระบุ"></TextInput>
        </View>

        <Text style={style.title_header}>เพิ่มเบอร์โทรศัพท์ที่ใช้ลงทะเบียน</Text>
        <View style={style.title_box}>


          <Text style={style.text_title_input}>เบอร์โทรศัพท์  ลำดับที่ 1</Text>
          <View style={style.set_button}>
            <TextInput style={style.input}
              placeholder="หากเบอร์ที่ 1"></TextInput>
            <ButtonRegisPhone onPress={() => LinkToRes()}  title="5555" />
          </View>

          <Text style={style.text_title_input}>เบอร์โทรศัพท์  ลำดับที่ 2</Text>
          <TextInput style={style.input}
            placeholder="หากเบอร์ที่ 2"></TextInput>

        </View>

        <ButtonSave onPress={() => update_User()} title="บันทึกการเปลี่ยนแปลง"></ButtonSave>
      </ScrollView>
    </View>
  )
}

const { width } = Dimensions.get('window');
const isSmallScreen = width <= 375;
const style = StyleSheet.create({
  title_header: {
    color: '#9E9E9E',
    fontSize: isSmallScreen ? 12 : 15,
    marginTop: 15,
    marginLeft: 20,
    marginRight: 25,
    textAlign: 'left',
    fontWeight: 'bold'
  },
  title_box: {
    backgroundColor: '#FFFFFF',
    marginTop: 5,
    paddingBottom: 15,
    borderRadius: 20
  },
  text_title_input: {
    color: '#9E9E9E',
    fontSize: isSmallScreen ? 10 : 12,
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'left',
    fontWeight: '500'
  },
  input: {
    color: '#000000',
    marginTop: 5,
    paddingTop: 10,
    marginLeft: 20,
    marginRight: 20,
    height: 40,
    fontSize: isSmallScreen ? 15 : 18,
    textAlign: 'center',
    fontWeight: '500',
    textAlign: 'left',
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#F6F6F6',
    borderBottomWidth: 1,
    flex: 1,
  },
  set_button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'right',
    paddingHorizontal: 10,
  }

});

export default User