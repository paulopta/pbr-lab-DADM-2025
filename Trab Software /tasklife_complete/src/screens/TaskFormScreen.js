import React, { useEffect, useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import storage from '../services/storage';

export default function TaskFormScreen({ navigation, route }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const taskId = route.params?.taskId;

  useEffect(() => {
    if (taskId) {
      (async () => {
        const t = await storage.getTask(taskId);
        if (t) {
          setTitle(t.title);
          setDescription(t.description);
        }
      })();
    }
  }, [taskId]);

  async function save() {
    if (!title.trim()) {
      Alert.alert('Validação', 'Título é obrigatório');
      return;
    }
    await storage.saveTask({ id: taskId, title, description });
    navigation.goBack();
  }

  return (
    <ScrollView contentContainerStyle={{padding:16}}>
      <TextInput label="Título" value={title} onChangeText={setTitle} />
      <TextInput label="Descrição" value={description} onChangeText={setDescription} multiline style={{marginTop:12}} />
      <Button mode="contained" onPress={save} style={{marginTop:16}}>Salvar</Button>
    </ScrollView>
  );
}
