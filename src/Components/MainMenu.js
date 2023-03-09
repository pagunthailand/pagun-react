import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './splash';
import ProfileScreen from './ProfileScreen';
import { Text } from 'react-native/types';
import HomeScreen from './HomeScreen';
import ActionBarOption from './ActionBarOption';
import ActionBarLogo from './ActionBarLogo';
import Setting from './Setting';

const Stack = createNativeStackNavigator();
const MainMenu = () => {
  return (
          <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                    title: '',
                    headerStyle: {
                              backgroundColor: '#F6F6F6', //Set Header color
                            },
                           
                            headerTitleStyle: {
                              fontWeight: 'bold',
                              alignItems: 'flex-start',
                            },
                            headerLeft: () => <ActionBarLogo />,
                            headerRight: () => <ActionBarOption />,
                          
          }}
            ></Stack.Screen>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Setting" component={Setting} />
          </Stack.Navigator>
        </NavigationContainer>
  )
}

export default MainMenu