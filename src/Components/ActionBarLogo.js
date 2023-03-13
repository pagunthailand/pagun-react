
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
          width: 100,
          height: 27,
          marginLeft: 5,
        }}
       
      />
       <Text style={{
        fontSize:isSmallScreen ? 15 : 20,
        marginLeft:15,
        fontWeight:'700',
        color:'#000000'
       }}>{route.name}</Text>
    </View>
  );
};


export default ActionBarLogo;

