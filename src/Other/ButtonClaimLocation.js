import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions, View } from 'react-native';

const { width } = Dimensions.get('window');
const isSmallScreen = width <= 375;
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#DCDCDC',
    borderRadius: 5,
    padding: 8,
    marginLeft: '2%',
    marginRight: '2%',
  },
  buttonText: {
    color: '#444444',
    fontSize: isSmallScreen ? 12 : 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: '#F6F6F6',
    paddingBottom: 5,
  },
});

const ButtonClaimLocation = ({ onPress, title }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  </View>
);

export default ButtonClaimLocation;
