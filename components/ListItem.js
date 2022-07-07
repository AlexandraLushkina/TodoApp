import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default function ListItem({ el, deleteHandler, editHandler, completedHandler }) {
  const [isEditable, setEditable] = useState(false);
  const [header, setHeader] = useState(el.header);
  const [description, setDescription] = useState(el.description);
  const [isCompleted, setCompleted] = useState(el.completed);

  return (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => {
          completedHandler(el.key);
          setCompleted(!isCompleted);
        }}
      >
        <Icon style={styles.completeIcon} name={isCompleted ? 'checkcircle' : 'checkcircleo'} />
      </TouchableOpacity>
      <View style={styles.card}>
        <View style={styles.header}>
          {isEditable ? (
            <TextInput
              style={[styles.headerText, isCompleted ? styles.completed : styles.uncompleted]}
              placeholder={el.header}
              onChangeText={(text) => {
                setHeader(text);
              }}
            />
          ) : (
            <Text style={[styles.headerText, isCompleted ? styles.completed : styles.uncompleted]}>
              {el.header}
            </Text>
          )}
          <View style={styles.controls}>
            <TouchableOpacity onPress={() => deleteHandler(el.key)}>
              <Icon style={styles.icon} name="delete" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setEditable((isEditable) => !isEditable);
                if (isEditable) {
                  editHandler(el.key, header, description);
                }
              }}
            >
              {isEditable ? (
                <Icon style={styles.icon} name="save" />
              ) : (
                <Icon style={styles.icon} name="edit" />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => editHandler(el.key)}>
              <Icon style={styles.icon} name="calendar" />
            </TouchableOpacity>
          </View>
        </View>
        {isEditable ? (
          <TextInput
            style={[styles.description, isCompleted ? styles.completed : styles.uncompleted]}
            placeholder={el.description}
            onChangeText={(text) => {
              setDescription(text);
            }}
          />
        ) : (
          <Text style={[styles.description, isCompleted ? styles.completed : styles.uncompleted]}>
            {el.description}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    marginTop: 20,
  },
  completeIcon: {
    paddingVertical: 10,
    paddingLeft: 10,
    color: '#D17F98',
    fontSize: 25,
  },
  card: {
    borderRadius: 5,
    backgroundColor: '#fafafa',
    paddingVertical: 10,
    borderColor: '#445C4C',
    borderWidth: 1,
    width: '80%',
    marginLeft: 20,
  },
  header: {
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'flex-start',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: '5%',
    color: '#508068',
    flex: 2,
  },
  controls: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 5,
  },
  icon: {
    color: '#508068',
    fontSize: 20,
    marginHorizontal: 3,
  },
  description: {
    fontSize: 12,
    marginHorizontal: '9%',
    marginTop: 5,
    color: '#9C9E93',
  },
  completed: {
    textDecorationLine: 'line-through',
  },
  uncompleted: {
    textDecorationLine: 'none',
  },
});
