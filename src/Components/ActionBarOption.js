
import React from 'react';
import { View, Image, Pressable, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ActionBarOption = ({ }) => {
  const navigation = useNavigation();

  const { width } = Dimensions.get('window');
  const isSmallScreen = width <= 375;

  return (
    <View style={{ flexDirection: 'row' }}>

      <Pressable onPress={() => navigation.navigate('Setting', { name: 'PAGUN' })}>
        <Image
          source={require('../assets/Icon/settings.png')}
          style={{
            width: isSmallScreen ? 20 : 30,
            height: isSmallScreen ? 20 : 30,
            marginLeft: 5,
          }}
        />
      </Pressable>
    </View>
  );
};


export default ActionBarOption;

