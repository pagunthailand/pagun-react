import { View, Text ,Button} from 'react-native'
import React from 'react'
import Navi from './Navi'

const HomeScreen = ({navigation}) => {
  return (
          <View style={{backgroundColor: '#F6F6F6'}}>
                    <Text>รายการสินค้า</Text>
                    
                    {/* <Button
          title="รายการสินค้า"
          onPress={() =>
            navigation.navigate('Profile', {name: 'Jane'})
          }
          /> */}
          <Navi></Navi>
          </View>
        
  )
}

export default HomeScreen 