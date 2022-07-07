import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './components/Header';
import ListItem from './components/ListItem';
import Form from './components/Form';

export default function App() {
  const [listOfItems, setListOfItems] = useState([
    // { header: 'Купить молоко', description: 'В пакете', key: '1' },
    // { header: 'Купить яиц', description: '10 шт', key: '2' },
    // { header: 'Вымыть пол', description: 'кухня\nспальня\nгостиная\nванная', key: '3' },
    // { header: 'Постирать акулу', description: 'Деликатный режим', key: '4' },
    // { header: 'Выбросить мусор', key: '5' },
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
            completed: false,
          },
          ...list,
        ];
      });
      try {
        await AsyncStorage.setItem('@listOfItems', JSON.stringify(listOfItems));
      } catch (e) {
        console.error('ERROR WHILE WRITING TO ASYNC STORAGE AFTER ADDING', e);
      }
    }
  };

  const deleteHandler = async (key) => {
    setListOfItems((list) => {
      return list.filter((e) => e.key !== key);
    });
    try {
      await AsyncStorage.setItem('@listOfItems', JSON.stringify(listOfItems));
    } catch (e) {
      console.error('ERROR WHILE WRITING TO ASYNC STORAGE AFTER DELETING', e);
    }
  };

  const editHandler = async (key, header, description) => {
    setListOfItems((list) => {
      const editedIndex = list.findIndex((e) => e.key === key);
      list[editedIndex].header = header;
      list[editedIndex].description = description;
      return list;
    });
    try {
      await AsyncStorage.setItem('@listOfItems', JSON.stringify(listOfItems));
    } catch (e) {
      console.error('ERROR WHILE WRITING TO ASYNC STORAGE AFTER EDIT', e);
    }
  };

  const completedHandler = async (key) => {
    setListOfItems((list) => {
      const completedElement = list.find((e) => e.key === key);
      completedElement.completed = !completedElement.completed;
      const allCompleted = list.filter((e) => e.completed);
      const allUncompleted = list.filter((e) => !e.completed);
      return [...allUncompleted, ...allCompleted];
    });
    try {
      await AsyncStorage.setItem('@listOfItems', JSON.stringify(listOfItems));
    } catch (e) {
      console.error('ERROR WHILE WRITING TO ASYNC STORAGE AFTER COMPLETE', e);
    }
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
          renderItem={({ item }) => (
            <ListItem
              el={item}
              deleteHandler={deleteHandler}
              editHandler={editHandler}
              completedHandler={completedHandler}
            />
          )}
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
