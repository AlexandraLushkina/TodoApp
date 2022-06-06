import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import Header from './components/Header';
import ListItem from './components/ListItem';
import Form from './components/Form';

export default function App() {
  const [listOfItems, setListOfItems] = useState([
    { header: 'Купить молоко', key: '1' },
    { header: 'Купить яиц', key: '2' },
    { header: 'Вымыть пол', key: '3' },
    { header: 'Постирать акулу', key: '4' },
    { header: 'Выбросить мусор', key: '5' },
  ]);

  const addHandler = (task) => {
    if (task && task.header) {
      setListOfItems((list) => {
        return [
          {
            header: task.header,
            description: task.description,
            key: Math.random().toString(36).substring(7),
          },
          ...list,
        ];
      });
    }
  };

  const deleteHandler = (key) => {
    setListOfItems((list) => {
      return list.filter((e) => e.key !== key);
    });
  };

  return (
    <View style={styles.main}>
      <Header />
      <Form addHandler={addHandler} />
      <View>
        <FlatList
          data={listOfItems}
          renderItem={({ item }) => <ListItem el={item} deleteHandler={deleteHandler} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    // backgroundColor: '#BFC9CA',
  },
});
