
import React from 'react';

import {View, Image,Text, Dimensions} from 'react-native';
import { useRoute } from '@react-navigation/native';
const ActionBarLogo = () => {
  const route = useRoute();
  const { width } = Dimensions.get('window');
  const isSmallScreen = width <= 375;
  
  return (
    <View style={{flexDirection: 'row'}}>
      <Image
        source={require('../assets/Logo/BG.png')}
        style={{
          width: isSmallScreen ? 80 : 100,
          height: isSmallScreen ? 25 : 30,
          marginLeft: 5,
        }}
       
      />
       <Text style={{
        fontSize:isSmallScreen ? 15 : 20,
      
        marginLeft:15,
        fontWeight:'bold',
        color:'#000000'
       }}>{route.name}</Text>
    </View>
  );
};


export default ActionBarLogo;

