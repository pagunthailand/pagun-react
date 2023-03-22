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
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { GetNoticationHistoryByuserid_Action, GetWorkOrderLog_Action, updateReadNotication_action } from '../Model/Action';
import Global from '../Global';
import moment from 'moment';
import SearchBar from './SearchBar';
const History = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      GetNoticationHistoryByuserid();
    });
    return unsubscribe;
  }, [navigation]);





  [getnoti, setgetnoti] = useState({
    "wO_NO": null,
    "eQ_ID": null,
    "eQ_NAME": null,
    "wO_STATUS": null,
    "description": null,
    "erR_DESC": null,
    "creatE_DATE": null,
    "reporteD_BY_ID": 0
  })

  let [data, setData] = useState([]);

  const GetNoticationHistoryByuserid = async () => {

    GetWorkOrderLog_Action(Global.userId)
      .then(response => response.Result.data)
      .then(json => setData(json))
      .catch(error => console.error(error))

    console.log('response.Result ', data);
  };

  setSelectedId_ = (id_) => {

    navigation.navigate('ส่งเครม', { id: id_ });
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
    const datetimeString = item.creatE_DATE;
    // parse datetime string with moment
    const datetime = moment(datetimeString);
    // format datetime with moment
    const formattedDatetime = datetime.format('DD/MM/YYYY HH:mm');
    return (

      <TouchableOpacity onPress={() => setSelectedId_(item.eQ_ID)}>

        <View style={styles.title_box}>
          <View style={{ flex: 0.7, padding: 10, marginVertical: 2 }}>

            <Text style={{ color: '#444444', fontWeight: '300', fontSize: 12, paddingLeft: 10, textAlign: 'left' }}>

              {formattedDatetime}</Text>
            <Text style={{ color: '#000000', fontWeight: 'bold', paddingLeft: 10 }}>

              {item.eQ_NAME}</Text>
            <Text  style={{ color: '#444444', fontWeight: '300', fontSize: 12, paddingLeft: 10, textAlign: 'left' }}>

              {item.erR_DESC}</Text>

          </View>
          <View style={{ flex: 0.3, padding: 10, marginVertical: 2 }}>

            <Text style={{ color: '#444444', fontWeight: 'bold', paddingRight: 10, textAlign: 'right' }}></Text>
            <Text style={{ color: '#444444', fontWeight: 'bold', paddingRight: 10, textAlign: 'right' }}>{item.description}</Text>
          </View>

        </View>

      </TouchableOpacity>
    );
  };



  const [searchValue, setSearchValue] = useState('');
  if (!!data)
    filteredData = data.filter(item =>
      item.description.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.wO_STATUS.toLowerCase().includes(searchValue.toLowerCase() ||
        item.erR_DESC.toLowerCase().includes(searchValue.toLowerCase()))
    );
  else
    filteredData = null

  return (

    <View style={styles.container}
    >
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />

      <FlatList
        data={filteredData}
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
  title_box: {
    backgroundColor: '#FFFFFF',
    marginTop: 5,
    paddingBottom: 15,
    borderRadius: 5,
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
export default History