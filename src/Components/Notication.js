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
import { GetNoticationHistoryByuserid_Action, updateReadNotication_action } from '../Model/Action';
import Global from '../Global';
import moment from 'moment';

const Notication = ({ navigation }) => {

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
          <View style={{ flex: 1, padding: 10, marginVertical: 2,textAlign: 'left'  }}>
            <Text style={{ color: '#444444', fontWeight: '300', fontSize: 12, paddingLeft: 10, textAlign: 'left' }}><View style={{
              width: 10,
              height: 10,
              backgroundColor: item.isRead === true ? '#EFCDCD' : '#F47322',
              borderRadius: 5
            }}></View>{formattedDatetime}</Text>
            <Text style={{ color: '#000000', fontWeight: 'bold', paddingLeft: 10 }}>

              {item.nthTitle}</Text>

            <Text style={{ color: '#444444', fontWeight: '300', paddingLeft: 10 }}>{item.nthDetail}</Text>
          </View>
        </View>

      </TouchableOpacity>
    );
  };


  return (



    <View style={styles.container}
    >
      <Text style={styles.title_header}>อ่านทั้งหมด</Text>
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

export default Notication