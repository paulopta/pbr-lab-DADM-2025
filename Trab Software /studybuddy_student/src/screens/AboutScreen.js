import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre</Text>
      <Text>Desenvolvedor: Flavio Siqueira Rodrigues</Text>
      <Text>Instituição: PUC Minas</Text>
      <Text>Versão: 1.0.0</Text>
      <Text style={{marginTop:12}}>App simples feito como atividade prática de React Native. Código com estilo de aluno (comentários e estrutura simples).</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16 },
  title: { fontSize:20, fontWeight:'700', marginBottom:8 }
});
