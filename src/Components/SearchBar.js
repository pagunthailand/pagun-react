import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Dimensions } from 'react-native';

const SearchBar = ({ searchValue, setSearchValue }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="ค้นหารายการ..."
        value={searchValue}
        onChangeText={setSearchValue}
      />
    </View>
  );
};

const { width } = Dimensions.get('window');
const isSmallScreen = width <= 375;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F6',
    paddingTop: 0,
    paddingRight: 10,
    paddingLeft:10,
    paddingBottom: 5,
  },
  input: {
    backgroundColor: '#000000',
    color: '#000000',
    fontWeight: '700',
    fontSize:isSmallScreen ? 12 : 15,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    height: isSmallScreen ? 35 : 45,
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#F6F6F6',
  },
});

export default SearchBar;
