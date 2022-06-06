import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Header() {
  return (
    <View style={styles.main}>
      <Text style={styles.text}>Список дел</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    paddingTop: 60,
    height: 100,
    backgroundColor: '#D6E2E0',
  },
  text: {
    fontSize: 18,
    color: '#508068',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
