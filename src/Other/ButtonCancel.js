import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const isSmallScreen = width <= 375;
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#E8E8E9',
    borderRadius: 15,
    padding: 10,
    marginTop:45,
    marginBottom:45,
    marginLeft: '5%',
    marginRight: '5%',
    
  },
  buttonText: {
    color: 'red',
    fontSize: isSmallScreen ? 12 : 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

const ButtonCancel = ({ onPress, title  }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default ButtonCancel;
