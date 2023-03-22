import { View, Text, StyleSheet, TextInput, Dimensions, ScrollView, RefreshControl, FlatList, Image, Button, TouchableOpacity, SafeAreaView, TouchableHighlight } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetUserByid_Action, UpdateUser_Action, get_Equipment_ฺbyID_Action, send_OTP_Action, create_WorkOrder, SendNotificationSingleUser_Action, GetWorkOrderLog_Action, GetWorkOrder_Action } from '../Model/Action'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonSave from '../Other/ButtonSave';
import ButtonRegisPhone from '../Other/ButtonRegisPhone';
import Global from '../Global';
import { useRoute } from '@react-navigation/native';
import moment from 'moment';
import ButtonCancel from '../Other/ButtonCancel';
import ButtonClaimaSave from '../Other/ButtonClaimaSave';
import ButtonClaimUpload from '../Other/ButtonClaimUpload';
import ButtonClaimLocation from '../Other/ButtonClaimLocation';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import {
  ImageGallery,
  ImageObject,
} from '@georstat/react-native-image-gallery';
import Icon from 'react-native-vector-icons/FontAwesome';

const Claim = ({ navigation }) => {
  [formatted_warrantY_VALID_UTIL, setformatted_warrantY_VALID_UTIL] = useState('');
  [formatted_warrantY_VALID_FROM, setformatted_warrantY_VALID_FROM] = useState('');

  [ClaimDetail, setClaimDetail] = useState({ detail: '' });

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
      data = res_GetUserByid_Action.Result.data[0];
      data = setData(data);
      console.log('data_wO_NO', res_GetUserByid_Action.Result.data[0].wO_NO);
      get_WorkOrder_event(res_GetUserByid_Action.Result.data[0].wO_NO)
      //console.log('data',res_GetUserByid_Action.Result.data);
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
  let [WoDetail, setWoDetail] = useState(
    {
      "create_Date": null,
      "description": null,
      "eQ_NAME": null,
      "erR_DESC": null,
      "wO_NO": null
    }
  )
  let ImgDetail = {}
  let [_ImgDetail, set_ImgDetail] = useState();
  [data, setData] = useState({
    "erR_DESC": null,
  });
  const get_WorkOrder_event = async (WO_ID) => {
    // console.log('ClaimDetail', lop, data.detail, Global.userId, route.params.id);
    await GetWorkOrder_Action(WO_ID).then((res) => {
      WoDetail = setWoDetail(res.Result.data.wono)
      ImgDetail = res.Result.data.img
      _ImgDetail = set_ImgDetail(res.Result.data.img)
      console.log('ImgDetail', ImgDetail);
    }, (err) => {
      console.log('err', err);
    })

  };

  const [paramnoti, setparamnoti] = useState(
    {
      userid: 0,
      title: "",
      body: "",
      subtitle: ""
    });
  const send_Noti_welcome = async (title, detail) => {
    AsyncStorage.getItem('OTPtoken', async (err, result) => {
      paramnoti.userid = Global.userId;
      paramnoti.title = title;
      paramnoti.body = detail;
      paramnoti.subtitle = "";

      //console.log('paramnoti' , paramnoti);
      var response = await SendNotificationSingleUser_Action(paramnoti);
      if (response.ResultStatus == 200) {

      } else {

      }
    });
  };

  const create_WorkOrder_event = async () => {
    await create_WorkOrder(route.params.id, WoDetail.erR_DESC, Global.userId).then((res) => {
      let title = 'เครม ' + data.eQ_NAME;
      let detail = data.detail
      get_Equipment_ฺbyID();
      send_Noti_welcome(title, detail)
      console.log(res);
    }, (err) => {
      console.log('err', err);
    })

  };


  const [state, setState] = useState([]);
  source = null;
  handleChoosePhoto = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      // console.log('=?', response,!response.didCancel);
      if (!response.didCancel)
        if (response.assets[0]) {
          //console.log(state.lenght);

          setState(oldArray => [response.assets[0], ...oldArray]);
          console.log('response.assets', state);
          handleUploadPhoto();
        }
    })
  }

  handleClearPhoto = () => {
    setState([]);
  }



  handleUploadPhoto = async () => {

    //alert(WoDetail.wO_NO)

    let fromData = new FormData();

    let body = {
      UserId: parseInt(Global.userId),
      WoNo: WoDetail.wO_NO
    }
    Object.keys(body).forEach(key => {
      fromData.append(key, body[key]);
    });

    let value = []
    state.forEach((_state, index) => {
      value.push({
        uri: Platform.OS === "android" ? _state.uri : _state.uri.replace("file://", ""),
        type: _state.type,
        name: _state.fileName
      }
      )
    });

    value.forEach(element => {
      fromData.append("formFile", element);
    });



    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    console.log('createFormData', JSON.stringify(fromData));

    try {
      let res = await axios.post("http://183.90.170.87:3000/api/FileUpload/UploadFile"
        , fromData, config)

      get_Equipment_ฺbyID();
      console.log('Success Status : ', res.status, res);

    } catch (error) {
      console.log('error', error);
    }

  };

  const OpenMapPartner = () => {
    alert('ที่ตั้งร้าน')
  }


  const handleClaimDetailChange = (value) => {
    setWoDetail(prevData => ({ ...prevData, erR_DESC: value }));
  }

  renderItem = ({ item }) => {
    console.log('item', item);
    return (

      <View style={{
        flex: 1,
        flexDirection: 'row'
      }}>
        <Text> {item.urL_IMAGE}</Text>
        <Image source={{ uri: item.urL_IMAGE }} style={{ width: 200, height: 200 }} />
      </View>
    );
  };

  handleDeleteImage = (val) => {
    console.log(val);
  }

  const [isOpen, setIsOpen] = useState(false);
  const [isCustomGalleryOpen, setIsCustomGalleryOpen] = useState(false);

  const openGallery = () => setIsOpen(true);
  const closeGallery = () => setIsOpen(false);


  const renderSwipeable = (item) => {

    return (
      <View>
        <View>
          <TouchableOpacity style={{
            position: 'absolute',
            height: 20,
            width: 20,
            paddingHorizontal: 2,
            borderRadius: 10,
            backgroundColor: 'red',
            top: -120,
            left: 90,
            zIndex: 1,
          }}
            onPress={() => removeImage(item)}>
            <Icon name="close" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={openGallery} style={{ position: 'relative' }}>
            <Image source={{ uri: item.url }} style={{ width: 100, height: 100, margin: 10, marginLeft: 0, resizeMode: 'cover' }} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const removeImage = () => {
    alert(555)
    //console.log(image);
    // const newImages = images.filter((item) => item.id !== image.id);
    // setImages(newImages);
  };

  return (

    <View style={{ backgroundColor: '#F6F6F6', flex: 1 }}>

      {data.eQ_STATUS_ID !== 1 ?
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <ButtonClaimLocation onPress={() => OpenMapPartner()} title="ที่ตั้งร้าน"></ButtonClaimLocation>
          <ButtonClaimUpload onPress={() => handleChoosePhoto()} title="เพิ่มรูป"></ButtonClaimUpload>
          {data.eQ_STATUS_ID == 0 ?
            <ButtonClaimaSave onPress={() => create_WorkOrder_event()} title="ส่งเครม"></ButtonClaimaSave>
            : ''}
        </View>
        : ''}
      <ScrollView style={{ flex: 1 }} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <Text style={style.title_header}>สถานะของสินค้า</Text>
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
                value={WoDetail ? WoDetail.erR_DESC : ''}
                onChangeText={handleClaimDetailChange}
                style={style.input_area}
              />
            </View>
          </View>
        </View>
        <Text style={style.title_header}>รูปที่อัพโหลด</Text>
        <SafeAreaView style={style.title_box}>

          <View style={style.screen}>
            <ImageGallery
              close={closeGallery}
              images={_ImgDetail}
              isOpen={isOpen}
              hideThumbs
              resizeMode="contain"
            />

          </View>

          <FlatList
            data={_ImgDetail}
            numColumns={3}
            contentContainerStyle={{ padding: 20 }}
            keyExtractor={(item) => item.url}
            renderItem={({ item }) => renderSwipeable(item)}
          />


        </SafeAreaView>

        <ButtonCancel onPress={() => create_WorkOrder_event()} title="ยกเลิก"></ButtonCancel>

      </ScrollView>

    </View>
  )


}

const { width } = Dimensions.get('window');
const isSmallScreen = width <= 375;
const style = StyleSheet.create({
  image: {
    height: 200,
    marginVertical: 5,
  },
  screen: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
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
    borderRadius: 5
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
    borderRadius: 5,
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