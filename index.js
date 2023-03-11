/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

// AsyncStorage.getItem('isLoggedIn', 'location_value').then((location) => {
//           this.setState({ location: location })
// })

AppRegistry.registerComponent(appName, () => App);
