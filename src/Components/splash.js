import { View, Text , Image } from 'react-native'
import React from 'react'

const Splash = () => {
  return (
    <View
      style={{
        flexDirection: 'column',
        height: "100%",
      }}>
      <View style={{backgroundColor: 'yellow', flex: 0.10}} >
     
      </View>
      <View style={{backgroundColor: 'blue', flex: 0.80 , height: "100%",justifyContent:"center"}} >
      </View>
      <View style={{backgroundColor: 'red', flex: 0.10}} >
      <Text>Hello World!</Text>
      </View>
     
    </View>
  )
}

export default Splash