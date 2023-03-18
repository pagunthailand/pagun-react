import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F6',
    padding: 10,
  },
  input: {
    backgroundColor: '#000000',
    color: '#000000',
    fontWeight: '700',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    height: 45,
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#F6F6F6',
  },
});

export default SearchBar;
