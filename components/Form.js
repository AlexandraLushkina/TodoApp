import React, { useState } from 'react';
import { StyleSheet, View, Pressable, TextInput, Text } from 'react-native';

export default function Form({ addHandler }) {
  const [header, setHeader] = useState('');
  const [description, setDescription] = useState('');

  const onChangeHeader = (text) => {
    setHeader(text);
  };

  const onChangeDescription = (text) => {
    setDescription(text);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeHeader}
        placeholder="Задача"
        ref={(input) => {
          this.textHeader = input;
        }}
      />
      <TextInput
        multiline={true}
        style={styles.input}
        onChangeText={onChangeDescription}
        placeholder="Описание"
        ref={(input) => {
          this.textDescription = input;
        }}
      />
      <Pressable
        style={styles.button}
        onPress={() => {
          this.textHeader.clear();
          this.textDescription.clear();
          onChangeHeader('');
          onChangeDescription('');
          addHandler({ header, description });
        }}
      >
        <Text style={styles.buttonTitle}>Добавить задачу</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: '20%',
    width: '60%',
    borderBottomColor: '#445C4C',
    color: '#445C4C',
  },
  button: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    marginLeft: '30%',
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#D17F98',
    borderColor: '#D17F98',
    borderRadius: 5,
  },
  buttonTitle: {
    color: '#FAFAFA',
  },
});
