import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function ListItem({ el, deleteHandler }) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => deleteHandler(el.key)}>
      <Text style={styles.header}>{el.header}</Text>
      <Text style={styles.description}>{el.description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    backgroundColor: '#fafafa',
    paddingVertical: 10,
    borderColor: '#445C4C',
    borderWidth: 1,
    width: '80%',
    marginLeft: '10%',
    marginTop: 20,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: '5%',
    color: '#508068',
  },

  description: {
    fontSize: 12,
    marginHorizontal: '9%',
    marginTop: 5,
    color: '#9C9E93',
  },
});
