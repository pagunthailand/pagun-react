import * as React from 'react';
import { View, Image, Pressable, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ActionBarOption from './ActionBarOption';
import ActionBarLogo from './ActionBarLogo';
import Setting from './Setting';
import Product from './Product';
import History from './History';
import Notication from './Notication';
import User from './User';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const ProductStack = createNativeStackNavigator();
function ProductStackScreen() {
  return (
    <ProductStack.Navigator>
      <ProductStack.Screen name="สินค้า" component={Product}
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
        }}
      ></ProductStack.Screen>
        
    </ProductStack.Navigator>
  );
}

const HistoryStack = createNativeStackNavigator();
function HistoryStackScreen() {
  return (
    <HistoryStack.Navigator>
      <HistoryStack.Screen name="ประวัติ" component={History} 
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
      }}
      />
    </HistoryStack.Navigator>
  );
}

const NoticationStack = createNativeStackNavigator();
function NoticationStackScreen() {
  return (
    <NoticationStack.Navigator>
      <NoticationStack.Screen name="การแจ้งเตือน" component={Notication} 
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
      }}/>
    </NoticationStack.Navigator>
  );
}

const UserStack = createNativeStackNavigator();
function UserStackScreen() {
  return (
    <UserStack.Navigator>
      <UserStack.Screen name="ผู้ใช้" component={User} 
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
      }}/>
      <ProductStack.Screen  options={{
          title:'ตั้งค่า',
          headerStyle: {
            backgroundColor: '#F6F6F6',
          },
          headerTintColor: '#000000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} name="Setting" component={Setting} />
    </UserStack.Navigator>
  );
}
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export default function MainMenu() {

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          var path_ = "../assets/Logo/Option.png"
          if (route.name === 'สินค้า') {
            if (!focused) {
              
              return <Image source={require('../assets/Navi/Home_inavtive.png')} style={{ width: 30, height: 30, }} />;
            } else {
              return <Image source={require('../assets/Navi/Home_active.png')} style={{ width: 30, height: 30, }} />;
            }
          }
          else if (route.name === 'ประวัติ') {
            if (!focused) {
              return <Image source={require('../assets/Navi/Histy_inactive.png')} style={{ width: 30, height: 30, }} />;
            } else {
              return <Image source={require('../assets/Navi/Histy_active.png')} style={{ width: 30, height: 30, }} />;
            }
          }
          else if (route.name === 'แจ้งเตือน') {
            if (!focused) {
              return <Image source={require('../assets/Navi/Notification_inactive.png')} style={{ width: 30, height: 30, }} />;
            } else {
              return <Image source={require('../assets/Navi/Notification_active.png')} style={{ width: 30, height: 30, }} />;
            }
          }
          else if (route.name === 'ผู้ใช้') {
            if (!focused) {
              return <Image source={require('../assets/Navi/User_inactive.png')} style={{ width: 30, height: 30, }} />;
            } else {
              return <Image source={require('../assets/Navi/User_active.png')} style={{ width: 30, height: 30, }} />;
            }
          }

        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: 'gray',
      })}>
        <Tab.Screen name="สินค้า"  component={ProductStackScreen} />
        <Tab.Screen name="ประวัติ" component={HistoryStackScreen} />
        <Tab.Screen name="แจ้งเตือน" component={NoticationStackScreen} />
        <Tab.Screen name="ผู้ใช้" component={UserStackScreen} />
        
        
   
      </Tab.Navigator>
     
     
     
    </NavigationContainer>
   
  );

  function reset_icon(routename) {

  };
}