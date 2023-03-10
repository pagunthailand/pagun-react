// 3 Ways to Add Image Icon Inside Navigation Bar in React Native
// https://aboutreact.com/react-native-image-icon-inside-navigation-bar/

import React from 'react';

import {View, Image,Text} from 'react-native';
import { useRoute } from '@react-navigation/native';
const ActionBarLogo = () => {
  const route = useRoute();
  return (
    <View style={{flexDirection: 'row'}}>
      <Image
        source={require('../assets/Logo/BG.png')}
        style={{
          width: 100,
          height: 25,
          marginLeft: 5,
        }}
       
      />
       <Text style={{
        fontSize:20,
        marginLeft:15,
        fontWeight:'700',
        color:'#000000'
       }}>{route.name}</Text>
    </View>
  );
};


export default ActionBarLogo;

