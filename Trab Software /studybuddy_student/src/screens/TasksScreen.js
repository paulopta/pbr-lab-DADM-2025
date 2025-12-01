import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { fetchTasks, insertTask, markDone, deleteTask } from '../services/db';
import TaskItem from '../components/TaskItem';

export default function TasksScreen() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  const load = () => {
    fetchTasks().then(rows => setTasks(rows)).catch(e => console.log(e));
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!title.trim()) { Alert.alert('Erro', 'Escreva um título'); return; }
    await insertTask(title, '');
    setTitle('');
    load();
  };

  const toggleDone = async (id, done) => {
    await markDone(id, done ? 0 : 1);
    load();
  };

  const remove = async (id) => {
    await deleteTask(id);
    load();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tarefas</Text>
      <View style={styles.inputRow}>
        <TextInput value={title} onChangeText={setTitle} placeholder="Nova tarefa" style={styles.input} />
        <TouchableOpacity onPress={add} style={styles.addBtn}><Text style={{color:'#fff'}}>Adicionar</Text></TouchableOpacity>
      </View>
      <FlatList data={tasks} keyExtractor={item => String(item.id)} renderItem={({item}) => (
        <TaskItem task={item} onToggle={() => toggleDone(item.id, item.done)} onDelete={() => remove(item.id)} />
      )} ListEmptyComponent={<Text style={{textAlign:'center', marginTop:20}}>Sem tarefas</Text>} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16 },
  header: { fontSize:22, fontWeight:'700', marginBottom:12 },
  inputRow: { flexDirection:'row', marginBottom:12 },
  input: { flex:1, borderWidth:1, borderColor:'#ddd', padding:8, borderRadius:6 },
  addBtn: { marginLeft:8, backgroundColor:'#27ae60', padding:10, borderRadius:6, justifyContent:'center', alignItems:'center' }
});
