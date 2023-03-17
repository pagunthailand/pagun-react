import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'green',
    borderRadius: 15,
    padding: 10,
    marginTop:5,
    marginBottom:5,
    marginLeft: '10%',
    marginRight: '10%',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

const ButtonRegisPhone = ({ onPress, title  }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default ButtonRegisPhone;
