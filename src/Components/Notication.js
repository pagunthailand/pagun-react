import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { GetNoticationHistoryByuserid_Action } from '../Model/Action';
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
    console.log(id);
  }


  let [selectedId, setSelectedId] = useState(null);
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    // datetime string in ISO format
    const datetimeString = item.createTime;
    // parse datetime string with moment
    const datetime = moment(datetimeString);
    // format datetime with moment
    const formattedDatetime = datetime.format('DD/MM/YYYY HH:mm');
    return (
      <TouchableOpacity onPress={() => setSelectedId_(item.id)}>
        <View style={{ backgroundColor, padding: 20, marginVertical: 2 }}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>{item.nthTitle}</Text>
          <Text style={{ color: '#fff', fontWeight: '300' }}>{item.nthDetail}</Text>
          <Text style={{ color: '#fff', fontWeight: '300' }}>{formattedDatetime}</Text>
        </View>
      </TouchableOpacity>
    );
  };


  return (

    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Notication