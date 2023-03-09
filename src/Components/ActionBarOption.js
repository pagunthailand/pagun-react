
import React from 'react';
import {View, Image,Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const ActionBarOption = ({}) => {
  const navigation = useNavigation();


  return (
    <View style={{flexDirection: 'row'}}>

<Pressable onPress={() => navigation.navigate('Setting', {name: 'PAGUN'})}>
      <Image
        source={require('../assets/Logo/Option.png')}
        style={{
          width: 10,
          height: 20,
          marginLeft: 5,
        }}
      />
      </Pressable>
    </View>
  );
};


export default ActionBarOption;

