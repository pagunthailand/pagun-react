import { View, Text, Dimensions, StyleSheet, ScrollView, Switch, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import ButtonSave from '../Other/ButtonSave';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetUserByid_Action, UpdateUser_Action, send_OTP_Action, updateNotiStatus } from '../Model/Action'
import Global from '../Global';
import ButtonCancel from '../Other/ButtonCancel';

const Setting = ({ navigation, route }) => {
  let [isEnabled, setIsEnabled] = useState(false);
  useEffect(() => {
     GetUserByid_Action(Global.userId).then((res_GetUserByid_Action) => {
      isEnabled = setIsEnabled(res_GetUserByid_Action.Result.notiStatus);
    });
  }, []);



  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);

    updateNotiStatus(Global.userId).then((res) => {
      isEnabled = setIsEnabled(res.Result.notiStatus);
    }, (err) => {
    })
  };

  const logout = async () => {
    await AsyncStorage.setItem('isLoggedIn', 'false');
    Global.isLogin = 'false'
    navigation.navigate('Register'); // navigate back to the login page
  };


  return (
    <View style={{ backgroundColor: '#F6F6F6', flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <Text style={style.title_header}>ตั้งค่าการแจ้งเตือน</Text>
        <View style={style.title_box}>
          <Text style={style.input}>การแจ้งเตือนผ่านแอพ</Text>
          <Switch style={style.input}
            trackColor={{ false: "#767577", true: "#9E9E9E" }}
            thumbColor={isEnabled ? "#444444" : "#f4f3f4"}
            ios_backgroundColor="#F6F6F6"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>

        <Text style={style.title_header}>เกี่ยวกับแอพ</Text>
        <View style={style.title_box_version}>
          <Text style={style.text_version}>Pagun Thailand</Text>
          <Text style={style.text_version}>เวอร์ชั่นก์ 1.0.0 (PG2302)</Text>
          <Text style={style.text_version}>www.pagunthailand.com</Text>
        </View>

        <ButtonCancel onPress={() => logout()} title="ออกจากระบบ"></ButtonCancel>

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
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
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
    paddingBottom: 10,
    marginRight: 20,
    fontSize: isSmallScreen ? 15 : 18,
    fontWeight: '500'
  },
  title_box_version: {
    backgroundColor: '#FFFFFF',
    marginTop: 5,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
  },
  text_version: {
    color: '#444444',
    textAlign: 'center',
    marginTop: 5,
    paddingTop: 5,
    marginLeft: 20,
    paddingBottom: 5,
    marginRight: 20,
    fontSize: isSmallScreen ? 15 : 18,
    fontWeight: '400'
  },

});

export default Setting