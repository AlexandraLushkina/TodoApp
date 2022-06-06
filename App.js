import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './components/Header';
import ListItem from './components/ListItem';
import Form from './components/Form';

export default function App() {
  const [listOfItems, setListOfItems] = useState([
    { header: 'Купить молоко', description: 'В пакете', key: '1' },
    { header: 'Купить яиц', description: '10 шт', key: '2' },
    { header: 'Вымыть пол', description: 'кухня\nспальня\nгостиная\nванная', key: '3' },
    { header: 'Постирать акулу', description: 'Деликатный режим', key: '4' },
    { header: 'Выбросить мусор', key: '5' },
  ]);

  useEffect(() => {
    getItemsListFromStorage();
  }, []);

  const addHandler = async (task) => {
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
      try {
        await AsyncStorage.setItem('@listOfItems', JSON.stringify(listOfItems));
      } catch (e) {
        console.error('ERROR WHILE WRITING TO ASYNC STORAGE', e);
      }
    }
  };

  const deleteHandler = (key) => {
    setListOfItems((list) => {
      return list.filter((e) => e.key !== key);
    });
  };

  const getItemsListFromStorage = async () => {
    try {
      let listFromStorage = await AsyncStorage.getItem('@listOfItems');
      listFromStorage = listFromStorage != null ? JSON.parse(listFromStorage) : null;
      setListOfItems(listFromStorage);
    } catch (e) {
      console.error('ERROR WHILE READING FROM ASYNC STORAGE', e);
    }
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
