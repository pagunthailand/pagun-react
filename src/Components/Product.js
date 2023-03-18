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
import { GetNoticationHistoryByuserid_Action, getuser_Equipment_Action, updateReadNotication_action } from '../Model/Action';
import Global from '../Global';
import moment from 'moment';
import SearchBar from './SearchBar';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Product = ({ navigation }) => {

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getuser_Equipment();
    });
    return unsubscribe;
  }, [navigation]);

  [getProduct, setProduct] = useState({
    "iD_USER": 0,
    "eQ_CODE": null,
    "eQ_NAME": null,
    "description": null,
    "warrantY_VALID_FROM": null,
    "warrantY_VALID_UTIL": null,
    "eQ_VALUE": null,
    "phoneNumber": null,
    "name": null,
    "lastName": null,
    "coM_NAME": null,
    "coM_ID": null
  })

  let [data, setData] = useState([]);
  let [filteredData, setfilteredData] = useState([]);
  const getuser_Equipment = async () => {
    AsyncStorage.getItem('sessionID', async (err, result_sessionID) => {
      getuser_Equipment_Action(result_sessionID)
        .then(response => response.Result.data)
        .then(json => setData(json))
        .catch(error => console.error('error ==>',result_sessionID, error))

      console.log('response.Result ', result_sessionID, data);
    });
  }


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
    const datetimeString = item.warrantY_VALID_FROM;
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
              {item.eQ_NAME}</Text>
            <Text style={{ color: '#444444', fontWeight: '300', paddingLeft: 10 }}>{item.description}</Text>
          </View>
          <View style={{ flex: 0.3, padding: 10, marginVertical: 2 }}>
            <Text style={{ color: '#444444', fontWeight: '300', fontSize: 10, paddingRight: 10, textAlign: 'right' }}>{formattedDatetime}</Text>
          </View>
        </View>

      </TouchableOpacity>
    );
  };


  const [searchValue, setSearchValue] = useState('');
  filteredData = data.filter(item =>
    item.eQ_NAME.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.description.toLowerCase().includes(searchValue.toLowerCase())
  );

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