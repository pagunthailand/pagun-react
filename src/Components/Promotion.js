import { View, Text, FlatList, StyleSheet, Image,TouchableOpacity  } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetEqType, updateReadNotication_action } from '../Model/Action';

const Promotion = ({ navigation }) => {
  const DATA = [
    { id: '1', name: 'Item 1', image: 'https://fastly.picsum.photos/id/480/200/200.jpg?hmac=q_kzh_8Ih85_5t_jN3rcD3npeNBLA41oDGtQZVkmmYs' },
    { id: '2', name: 'Item 2', image: 'https://fastly.picsum.photos/id/480/200/200.jpg?hmac=q_kzh_8Ih85_5t_jN3rcD3npeNBLA41oDGtQZVkmmYs' },
    { id: '3', name: 'Item 3', image: 'https://fastly.picsum.photos/id/480/200/200.jpg?hmac=q_kzh_8Ih85_5t_jN3rcD3npeNBLA41oDGtQZVkmmYs' },
    { id: '4', name: 'Item 4', image: 'https://fastly.picsum.photos/id/480/200/200.jpg?hmac=q_kzh_8Ih85_5t_jN3rcD3npeNBLA41oDGtQZVkmmYs' },
    { id: '5', name: 'Item 5', image: 'https://fastly.picsum.photos/id/480/200/200.jpg?hmac=q_kzh_8Ih85_5t_jN3rcD3npeNBLA41oDGtQZVkmmYs' },
    { id: '6', name: 'Item 6', image: 'https://fastly.picsum.photos/id/480/200/200.jpg?hmac=q_kzh_8Ih85_5t_jN3rcD3npeNBLA41oDGtQZVkmmYs' },
  ];
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      GetEqTypeByuserids();
    });
    return unsubscribe;
  }, [navigation]);

  let [DATAs, setData] = useState([]);
  setSelectedId_ = (id) => {

   // updateReadNotication(id);
  }


  const GetEqTypeByuserids = async () => {
    GetEqType()
    .then(response => response.Result)
    .then(json => setData(json))
    .catch(error => console.error(error))

   // console.log('response.Result ', DATAs);
      // console.log('ClaimDetail', lop, data.detail, Global.userId, route.params.id);
  //    await GetEqType().then((res) => {
      
  // console.log('WoPermission',res);
     //   console.log('ImgDetail', json);
 //     }, (err) => {
  //      console.log('err', err);
   //   })
  
   
  
    //console.log('response.Result ', data);
  };
setSelectedId_ = (id_) => {

   
  navigation.navigate('รายละเอียดสินค้า', { id: id_ });
  }


 
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      GetEqTypeByuserids();
    });
    return unsubscribe;
  }, [navigation]);

  
    const renderItems = ({ item }) => (
        <TouchableOpacity style={styless.button} >
          <Text style={styless.text}>{item.label}</Text>
        </TouchableOpacity>
      ); 
    const renderItem = ({ item }) => (
      <TouchableOpacity style={styles.container}  onPress={() => setSelectedId_(item.id)}>
        <View style={styles.item}  >
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.texts}>{item.name}</Text>
        <Text style={styles.text}>{item.name}</Text>
      </View>              
        </TouchableOpacity>
      );
    
  return (
    <View style={styles.container}>
    
  

    <View style={styles.container}>
    <FlatList
      data={DATAs}
      horizontal={true}
      renderItem={renderItems}
      keyExtractor={item => item.id}
    />
        <FlatList
        data={DATA}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
  </View>
  </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    paddingTop: 1,
    },
    item: {
      flex: 1,
      flexDirection: 'column',
      margin: 1,
      height: 200,
    },
    
    image: {
      flex: 1,
      resizeMode: 'cover',
    },
    texts: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 2,
        color: '#000',
      },
    text: {
        
      textAlign: 'center',
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 10,
    },
  });
  const styless = StyleSheet.create({
    container: {
       marginBottom:2,
      flex: 1,
      height:3,
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    button: {
        marginBottom:10,
      height:40,
      backgroundColor: '#fff',
      padding: 10,
      color:'#000',
      margin: 5,
      borderRadius: 25,
    },
    text: {
      color: '#000',
      fontSize: 14,
      fontWeight: 'bold',
    },
  });
  
export default Promotion