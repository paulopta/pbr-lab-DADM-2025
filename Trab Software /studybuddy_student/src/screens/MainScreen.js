import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function MainScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>StudyBuddy</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Tasks')}>
        <Text style={styles.btnText}>Minhas Tarefas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('About')}>
        <Text style={styles.btnText}>Sobre</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20, alignItems:'center', justifyContent:'center' },
  title: { fontSize:28, fontWeight:'700', marginBottom:20 },
  button: { backgroundColor:'#2e86de', padding:14, width:'80%', alignItems:'center', borderRadius:8, marginTop:12 },
  btnText: { color:'#fff', fontWeight:'600' }
});
