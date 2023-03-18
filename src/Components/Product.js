import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  RefreshControl,
  TextInput,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { GetNoticationHistoryByuserid_Action, updateReadNotication_action } from '../Model/Action';
import Global from '../Global';
import moment from 'moment';


const Product = ({ navigation }) => {

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      GetNoticationHistoryByuserid();
    });
    return unsubscribe;
  }, [navigation]);

  [getnoti, setgetnoti] = useState({
    "id": 0,
    "createTime": null,
    "isDelete": false,
    "isRead": false,
    "deleteTime": null,
    "nthTitle": null,
    "nthDetail": null,
    "nthTime": null,
    "nthStatus": null,
    "nthLocationId": null,
    "nthTyp": null,
    "nthLinkAddress": null
  })

  let [data, setData] = useState([]);

  const GetNoticationHistoryByuserid = async () => {

    GetNoticationHistoryByuserid_Action(Global.userId)
      .then(response => response.Result)
      .then(json => setData(json))
      .catch(error => console.error(error))

    //console.log('response.Result ', data);
  };

  setSelectedId_ = (id) => {

    updateReadNotication(id);
  }

  const updateReadNotication = async (id) => {
    console.log(id);
    updateReadNotication_action(id)
      .then(response => response.Result)
      .then(GetNoticationHistoryByuserid())
      .catch(error => console.error(error))

  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    GetNoticationHistoryByuserid();
    setRefreshing(false)
  };


  let [selectedId, setSelectedId] = useState(null);
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#FFFFFF' : '#FFFFFF';
    //const backgroundColor = item.isRead === true ? '#000000' : '#FFFFFF';
    // datetime string in ISO format
    const datetimeString = item.createTime;
    // parse datetime string with moment
    const datetime = moment(datetimeString);
    // format datetime with moment
    const formattedDatetime = datetime.format('DD/MM/YYYY HH:mm');
    return (

      <TouchableOpacity onPress={() => setSelectedId_(item.id)}>

        <View style={styles.title_box}>
          <View style={{ flex: 0.7, padding: 10, marginVertical: 2 }}>

            <Text style={{ color: '#000000', fontWeight: 'bold', paddingLeft: 10 }}>
              <View style={{
                width: 10,
                height: 10,
                backgroundColor: item.isRead === true ? '#EFCDCD' : '#F47322',
                borderRadius: 5
              }}></View>
              {item.nthTitle}</Text>
            <Text style={{ color: '#444444', fontWeight: '300', paddingLeft: 10 }}>{item.nthDetail}</Text>
          </View>
          <View style={{ flex: 0.3, padding: 10, marginVertical: 2 }}>
            <Text style={{ color: '#444444', fontWeight: '300', fontSize: 10, paddingRight: 10, textAlign: 'right' }}>{formattedDatetime}</Text>
          </View>
        </View>

      </TouchableOpacity>
    );
  };


  const [phoneNumber2, setphone2] = useState('');
  return (

    <View style={styles.container}
    >
      <View>
        <TextInput style={styles.input}
          placeholder="ค้นหา 1"
        ></TextInput>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  )
}

const { width } = Dimensions.get('window');
const isSmallScreen = width <= 375;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F6',
    flex: 1,
  },
  input: {
    color: '#000000',
    marginTop: 0,
    paddingTop: 40,
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 15,
    height: 40,
    fontSize: 18,
    textAlign: 'left',
    fontWeight: '500',
    textAlign: 'left',
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#F6F6F6',
    borderBottomWidth: 1,
    flex: 1,
  },
  title_box: {
    backgroundColor: '#FFFFFF',
    marginTop: 5,
    paddingBottom: 15,
    borderRadius: 20,
    flex: 1,
    flexDirection: 'row'
  },
  title_header: {
    color: '#00008B',
    fontSize: isSmallScreen ? 14 : 18,
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'right',
    fontWeight: 'bold'
  },
});
export default Product