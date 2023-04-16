import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';


const DetailPromotion = ({ navigation }) => {

    const [product, setProduct] = useState({
        image: 'https://fastly.picsum.photos/id/480/200/200.jpg?hmac=q_kzh_8Ih85_5t_jN3rcD3npeNBLA41oDGtQZVkmmYs' ,
        details: 'ทดสอบ' ,
        title: 'ทดสอบ',
        description: 'ทดสอบ',
        price: '5000'
      });
      //setProduct(null);
  return (
    <View style={styles.container}>
           <View style={styles.detailss}>
      <Image style={styles.image} source={{ uri: product.image }} /></View>
      <View style={styles.details}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>{product.price} </Text>
        <Text style={styles.description}>{product.description}</Text>
     
      </View>
    </View>
  )
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginTop: 8,
        backgroundColor: 'aliceblue',
      
  
    },
    image: {
        flex: 1,
        
      width: '100%',
      height: '100%',
      borderRadius: 10,
    },
    detailss: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
      },
    details: {
      flex: 1,
      marginLeft: 16,
      marginRight: 10,
     
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    description: {
      fontSize: 14,
      marginVertical: 5,
    },
    price: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'green',
    },
  });
  
export default DetailPromotion