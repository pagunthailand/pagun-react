import * as React from 'react';
import {View, Image,Pressable, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './splash';
import ProfileScreen from './ProfileScreen';
import { Text } from 'react-native/types';
import HomeScreen from './HomeScreen';
import ActionBarOption from './ActionBarOption';
import ActionBarLogo from './ActionBarLogo';
import Setting from './Setting';
import Product from './Product';
import History from './History';
import Notication from './Notication';
import User from './User';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
// const MainMenu = () => {
//   return (
//         //   <NavigationContainer>
//         //   <Stack.Navigator>
//         //     <Stack.Screen
//         //       name="Home"
//         //       component={HomeScreen}
//         //       options={{
//         //             title: '',
//         //             headerStyle: {
//         //                       backgroundColor: '#F6F6F6', //Set Header color
//         //                     },
                           
//         //                     headerTitleStyle: {
//         //                       fontWeight: 'bold',
//         //                       alignItems: 'flex-start',
//         //                     },
//         //                     headerLeft: () => <ActionBarLogo />,
//         //                     headerRight: () => <ActionBarOption />,
                          
//         //   }}
//         //     ></Stack.Screen>
//         //     <Stack.Screen name="Profile" component={ProfileScreen} />
//         //     <Stack.Screen name="Setting" component={Setting} />
//         //   </Stack.Navigator>
//         // </NavigationContainer>

//       //   <NavigationContainer>
//       //   <Tab.Navigator screenOptions={{ headerShown: false }}>
//       //     <Tab.Screen name="Product" component={ProductStackScreen} />
//       //     <Tab.Screen name="History" component={HistoryStackScreen} />
//       //     <Tab.Screen name="Notication" component={NoticationStackScreen} />
//       //     <Tab.Screen name="User" component={UserStackScreen} />
//       //   </Tab.Navigator>
//       // </NavigationContainer>

//       <></>

//   )
// }

const ProductStack = createNativeStackNavigator();
function ProductStackScreen() {
  return (
    <ProductStack.Navigator>
      <ProductStack.Screen name="Product" component={Product}
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
                              headerRight: () => <ActionBarOption /> 
                            }}
        ></ProductStack.Screen>
    </ProductStack.Navigator>
  );
}

const HistoryStack = createNativeStackNavigator();
function HistoryStackScreen() {
  return (
    <HistoryStack.Navigator>
      <HistoryStack.Screen name="History" component={History} />
    </HistoryStack.Navigator>
  );
}

const NoticationStack = createNativeStackNavigator();
function NoticationStackScreen() {
  return (
    <NoticationStack.Navigator>
      <NoticationStack.Screen name="Notication" component={Notication} />
    </NoticationStack.Navigator>
  );
}

const UserStack = createNativeStackNavigator();
function UserStackScreen() {
  return (
    <UserStack.Navigator>
      <UserStack.Screen name="User" component={User} />
    </UserStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
export default function MainMenu() {
  return (
         <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          headerShown: false ,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            var path_ = "../assets/Logo/Option.png"
            if (route.name === 'สินค้า') {
             if(!focused) {
              return  <Image source={require('../assets/Logo/Option.png')} style={{width: 10,height: 20,}}/>;
             }else{
              return  <Image source={require('../assets/Logo/BG.png')} style={{width: 10,height: 20,}}/>;
             }
            } else {
              return  <Image source={require('../assets/Logo/Option.png')} style={{width: 10,height: 20,}}/>;
            }
           
            // You can return any component that you like here!
            
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
          <Tab.Screen name="Product" component={ProductStackScreen} />
          <Tab.Screen name="ประวัติ" component={HistoryStackScreen} />
          <Tab.Screen name="แจ้งเตือน" component={NoticationStackScreen} />
          <Tab.Screen name="ผู้ใช้" component={UserStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}