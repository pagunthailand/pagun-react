import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions, View } from 'react-native';

const { width } = Dimensions.get('window');
const isSmallScreen = width <= 375;
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#66CC00',
    borderRadius: 5,
    padding: 8,
    marginLeft: '2%',
    marginRight: '2%',

  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: isSmallScreen ? 12 : 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: '#F6F6F6',
    paddingBottom: 5,
  },
});

const ButtonClaimUpload = ({ onPress, title }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  </View>
);

export default ButtonClaimUpload;
