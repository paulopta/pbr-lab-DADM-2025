import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert } from 'react-native';
import { FAB, List, Button } from 'react-native-paper';
import storage from '../services/storage';
import { useIsFocused } from '@react-navigation/native';

export default function TaskListScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const focused = useIsFocused();

  useEffect(() => {
    if (focused) load();
  }, [focused]);

  async function load() {
    const all = await storage.getTasks();
    setTasks(all);
  }

  function confirmDelete(id) {
    Alert.alert('Excluir', 'Deseja excluir esta tarefa?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: async () => {
          await storage.deleteTask(id);
          load();
        } }
    ]);
  }

  return (
    <View style={{flex:1}}>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <List.Item
            title={item.title}
            description={item.description}
            onPress={() => navigation.navigate('TaskForm', { taskId: item.id })}
            right={() => (
              <Button onPress={() => confirmDelete(item.id)}>Excluir</Button>
            )}
          />
        )}
      />
      <FAB icon="plus" onPress={() => navigation.navigate('TaskForm')} style={{position:'absolute', right:16, bottom:16}} />
    </View>
  );
}
