import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0C590A',
    borderRadius: 15,
    padding: 10,
    marginTop:45,
    marginLeft: '30%',
    marginRight: '30%',
    
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

const ButtonRegister = ({ onPress, title  }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default ButtonRegister;
