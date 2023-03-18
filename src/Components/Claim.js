import { View, Text, StyleSheet, TextInput, Dimensions, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetUserByid_Action, UpdateUser_Action, get_Equipment_ฺbyID_Action, send_OTP_Action } from '../Model/Action'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonSave from '../Other/ButtonSave';
import ButtonRegisPhone from '../Other/ButtonRegisPhone';
import Global from '../Global';
import { useRoute } from '@react-navigation/native';
import moment from 'moment';
import ButtonCancel from '../Other/ButtonCancel';

const Claim = ({ navigation }) => {
          [formatted_warrantY_VALID_UTIL, setformatted_warrantY_VALID_UTIL] = useState('');
          [formatted_warrantY_VALID_FROM, setformatted_warrantY_VALID_FROM] = useState('');
          [_name, setName] = useState('');
          [lastName, setlastName] = useState('');
          [emailAddress, setemailAddress] = useState('');
          [phoneNumber, setphoneNumber] = useState('');
          const [phoneNumber1, setPhones] = useState('');
          const [phone1, setphone] = useState({ phone: '' });
          const [phone2, setphones2] = useState({ phone: '' });
          const [phoneNumber2, setphone2] = useState('');
          [data, setData] = useState({
                    eQ_ID: 0,
                    eQ_CODE: null,
                    eQ_NAME: null,
                    description: null,
                    createDate: null,
                    createBy: null,
                    updateDate: null,
                    updateBy: null,
                    eQ_STATUS: null,
                    warrantY_VALID_FROM: null,
                    warrantY_VALID_UTIL: null,
                    seriaL_NO: null,
                    model: null,
                    eQ_TYPE: null,
                    eQ_VALUE: null,
                    iD_USER: null,
          });
          let route = useRoute();
          let { param_id } = route.params;
          useEffect(() => {



                    const unsubscribe = navigation.addListener('focus', () => {
                              get_Equipment_ฺbyID();
                    }, []);

                    return unsubscribe;
          });

          const [refreshing, setRefreshing] = useState(false);
          const onRefresh = () => {
                    setRefreshing(true);
                    get_Equipment_ฺbyID();
                    setRefreshing(false)
          };


          const get_Equipment_ฺbyID = async () => {
                    get_Equipment_ฺbyID_Action(route.params.id).then((res_GetUserByid_Action) => {
                              data = res_GetUserByid_Action.Result;
                              data = setData(data);

                              if (!data) {
                                        const datetimeUTIL = moment(res_GetUserByid_Action.Result.warrantY_VALID_UTIL);
                                        setformatted_warrantY_VALID_UTIL(datetimeUTIL.format('DD/MM/YYYY'))


                                        const datetimeFROM = moment(res_GetUserByid_Action.Result.warrantY_VALID_FROM);
                                        setformatted_warrantY_VALID_FROM(datetimeFROM.format('DD/MM/YYYY'))


                              }

                    }, (err) => {
                              console.log(err);
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

          const handlephoneReg1Change = (value) => {
                    setData(prevData => ({ ...prevData, phoneReg1: value }));
          }

          const handlephoneReg2Change = (value) => {
                    setData(prevData => ({ ...prevData, phoneReg2: value }));
          }
          return (

                    <View style={{ backgroundColor: '#F6F6F6', flex: 1 }}>
                              <ScrollView style={{ flex: 1 }} refreshControl={
                                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                              }>
                                        <Text style={style.title_header}>สถานะการส่งเครมสินค้า</Text>
                                        <View style={style.title_box}>


                                                  <Text style={style.title_headname}>
                                                            {data.eQ_STATUS}</Text>

                                        </View>

                                        <Text style={style.title_header}>รายละเอียด</Text>
                                        <View style={style.title_box}>
                                                  <Text style={style.title_headname}>
                                                            {data.eQ_NAME}</Text>
                                                  <View style={style.container2}>
                                                            <View style={style.bodyFG1}>
                                                                      <Text style={style.bodyFG1}>รายละเอียด  : <Text style={style.bodyFG2}>{data.description}</Text> </Text>
                                                                      <Text style={style.bodyFG1}>Serial Number(S/N) : <Text style={style.bodyFG2}>{data.seriaL_NO}</Text> </Text>
                                                                      <Text style={style.bodyFG1}>เริ่มต้นประกัน : <Text style={style.bodyFG2}>{formatted_warrantY_VALID_FROM}</Text></Text>
                                                                      <Text style={style.bodyFG1}>สิ้นสุดประกัน : <Text style={style.bodyFG2}>{formatted_warrantY_VALID_UTIL}</Text></Text>
                                                                      <Text style={style.bodyFG1}>จากร้าน : <Text style={style.bodyFG2}>{data.coM_NAME}</Text></Text>
                                                                      <Text style={style.bodyFG1}>ราคาที่ซื้อ : <Text style={style.bodyFG2}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'THB' }).format(data.eQ_VALUE)}</Text></Text>

                                                                      <TextInput placeholder="ระบุรายละเอียด เครมสินค้า"
                                                                                multiline={true}
                                                                                style={style.input_area}
                                                                      />
                                                            </View>
                                                  </View>
                                        </View>


                                        <View style={{ flex: 1 ,  flexDirection: 'row',}}>
                                                  <View style={{ flex: 0.5 }}>
                                                            <ButtonCancel onPress={() => update_User()} title="ยกเลิก"></ButtonCancel>
                                                  </View>
                                                  <View style={{ flex: 0.5 }}>
                                                            <ButtonSave onPress={() => update_User()} title="บันทึกข้อมูลเครม"></ButtonSave>
                                                  </View>
                                        </View>


                              </ScrollView>
                    </View>
          )
}

const { width } = Dimensions.get('window');
const isSmallScreen = width <= 375;
const style = StyleSheet.create({
          container2: {
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
          },
          bodyFG1: {
                    flex: 1,
                    color: '#9E9E9E',
                    margin: 2.5,
                    marginLeft: 10,
                    textAlign: 'left',
                    fontSize: isSmallScreen ? 12 : 15,
                    // bottom: '',
          },
          bodyFG2: {
                    flex: 1,
                    margin: 2.5,
                    color: '#444444',
                    fontWeight: '500',
                    textAlign: 'left',

          },
          title_header: {
                    color: '#9E9E9E',
                    fontSize: isSmallScreen ? 12 : 15,
                    marginTop: 15,
                    marginLeft: 20,
                    marginRight: 25,
                    textAlign: 'left',
                    fontWeight: 'bold'
          },
          title_headname: {
                    color: '#000000',
                    fontSize: isSmallScreen ? 15 : 18,
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
          input_area: {
                    color: '#000000',
                    marginTop: 5,
                    // paddingTop: 10,
                    marginLeft: 10,
                    marginRight: 10,
                    height: 70,
                    fontSize: isSmallScreen ? 15 : 18,
                    textAlign: 'center',
                    fontWeight: '500',
                    textAlign: 'left',
                    borderRadius: 15,
                    backgroundColor: '#E5E5E5',
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

export default Claim