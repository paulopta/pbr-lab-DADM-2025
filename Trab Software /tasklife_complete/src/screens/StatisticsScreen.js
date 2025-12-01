import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import storage from '../services/storage';

export default function StatisticsScreen() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    (async () => {
      const tasks = await storage.getTasks();
      setTotal(tasks.length);
    })();
  }, []);

  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text style={{fontSize:20}}>Estatísticas</Text>
      <Text style={{marginTop:10}}>Total de tarefas: {total}</Text>
    </View>
  );
}
