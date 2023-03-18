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
import { useNavigation } from '@react-navigation/native';


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
        .catch(error => console.error('error ==>', result_sessionID, error))

    });
  }


  setSelectedId_ = (id) => {
    updateReadNotication(id);
  }

  const updateReadNotication = async (id_) => {
    console.log(id_);
    navigation.navigate('ส่งเครม',{ id : id_});
    // console.log(id);
    // updateReadNotication_action(id)
    //   .then(response => response.Result)
    //   .then(GetNoticationHistoryByuserid())
    //   .catch(error => console.error(error))

  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    getuser_Equipment();
    setRefreshing(false)
  };


  let [selectedId, setSelectedId] = useState(null);
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#FFFFFF' : '#FFFFFF';
    //const backgroundColor = item.isRead === true ? '#000000' : '#FFFFFF';
    // datetime string in ISO format
    const datetimeString = item.warrantY_VALID_FROM;
    const datetime = moment(datetimeString);
    let formatted_warrantY_VALID_FROM = datetime.format('DD/MM/YYYY');
    return (

      <TouchableOpacity onPress={() => setSelectedId_(item.eQ_ID)}>

        <View style={styles.title_box}>
          <View style={styles.title_header}>
            <Text style={styles.title_header}>
              {item.eQ_NAME}</Text>
          </View>

          <View style={styles.container2}>
            <View style={styles.bodyFG1}>
              <Text style={styles.bodyFG1}>SN/รายละเอียด  : <Text style={styles.bodyFG2}>{item.description}</Text> </Text>
              <Text style={styles.bodyFG1}>สิ้นสุดประกัน : <Text style={styles.bodyFG2}>{formatted_warrantY_VALID_FROM}</Text></Text>
              <Text style={styles.bodyFG1}>จากร้าน : <Text style={styles.bodyFG2}>{item.coM_NAME}</Text></Text>
            </View>
          </View>
          <Text style={{
             fontSize:  isSmallScreen ? 14 : 18,
             fontWeight: 'bold',
             textAlign: 'center',
             color: item.htmL_COLOR
          }}>
            {item.eQ_STATUS}</Text>


        </View>


      </TouchableOpacity>
    );
  };


  const [searchValue, setSearchValue] = useState('');
  filteredData = data.filter(item =>
    item.eQ_NAME.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.description.toLowerCase().includes(searchValue.toLowerCase() ||
    item.coM_NAME.toLowerCase().includes(searchValue.toLowerCase()))
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
  container2: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    margin: 10,
  },
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
    // flex: 1,
    // flexDirection: 'row'
  },
  itemTitle: {
    marginTop: 5,
    paddingBottom: 15,
  },
  title_header: {
    color: '#000000',
    fontSize: isSmallScreen ? 15 : 18,
    paddingTop: 5,
    marginLeft: 10,
    fontWeight: 'bold'
  },
  body: {
    flex: 1,
    flexDirection: 'row'
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
});
export default Product