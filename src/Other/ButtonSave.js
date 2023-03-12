import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#E8E8E9',
    borderRadius: 15,
    padding: 10,
    marginTop:45,
    marginBottom:45,
    marginLeft: '10%',
    marginRight: '10%',
    
  },
  buttonText: {
    color: '#444444',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

const ButtonSave = ({ onPress, title  }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default ButtonSave;
