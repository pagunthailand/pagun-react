import { View, Text, FlatList, StyleSheet, Image,TouchableOpacity  } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetEqType, GetProductAll } from '../Model/Action';

const Promotion = ({ navigation }) => {

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      GetEqTypes();
     GetEqProductAll(1,6,0,"");
    });
    return unsubscribe;
  }, [navigation]);

  let [DATAs, setData] = useState([]);
  setSelectedId_s = (ids) => {
    GetEqProductAll(1,6,ids,"")
   // updateReadNotication(id);
  }
  let [DATA, setDatad] = useState([]);
  
  const GetEqProductAll = async (nPage,nItemPerPage,nType,tName) => {
    
     GetProductAll(nPage,nItemPerPage,nType,tName)
    .then(response => response.Result)
    .then(json => setDatad(json))
    .catch(error => console.error(error))

    console.log('response.Result ', DATA);
   //console.log('response.Result ', response);
  };

  const GetEqTypes = async () => {
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
  
   
  
  };
setSelectedId_ = (id_) => {

   
  navigation.navigate('รายละเอียดสินค้า', { id: id_ });
  }


 
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      GetEqTypes();
    });
    return unsubscribe;
  }, [navigation]);

  
    const renderItems = ({ item }) => (
        <TouchableOpacity style={styless.button} onPress={() => setSelectedId_s(item.value)} >
          <Text style={styless.text}>{item.label}</Text>
        </TouchableOpacity> 
      ); 
    const renderItem = ({ item }) => (
      <TouchableOpacity style={styles.container}  onPress={() => setSelectedId_(item.id)}>
        <View style={styles.item}  >
        <Image source={{ uri: item.productImage }} style={styles.image} />
      
        <View  style={styles.itemds}   >
        <Text style={styles.textr}>{item.priceSale} ฿</Text>
        <Text style={styles.texttyg}>{item.price} ฿</Text>
        </View>   
        <Text style={styles.textnb}>{item.productName}</Text>
        <Text style={styles.text}>{item.productBy}</Text> 
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
  itemds: {

    flexDirection: 'row',
  
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
    marginRight:10,
   
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  
  },
  textnb: {
    marginRight:10,
   
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  
  },
  textty: {
    marginRight:10,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',

  },
  texttyg: {
    marginRight:10,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',

    textDecorationLine: 'line-through', textDecorationStyle: 'solid',
  },
  textr: {
    marginRight:10,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF0000',
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