import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={onToggle} style={{flex:1}}>
        <Text style={[styles.title, task.done ? styles.done : null]}>{task.title}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete} style={styles.del}>
        <Text style={{color:'#fff'}}>X</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection:'row', alignItems:'center', padding:10, borderBottomWidth:1, borderColor:'#eee' },
  title: { fontSize:16 },
  done: { textDecorationLine:'line-through', color:'#999' },
  del: { backgroundColor:'#c0392b', padding:8, borderRadius:6 }
});
