// SobreScreen.js
import React from 'react';
import { View, Text, StyleSheet, Linking, ScrollView } from 'react-native';

export default function SobreScreen() {
  const openLink = (url) => {
    Linking.openURL(url).catch(err => console.error("Não foi possível abrir o link:", err));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.appTitle}>Buscador de Países</Text>
      <Text style={styles.appDescription}>
        Uma solução simples para buscar informações sobre países do mundo.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Desenvolvido por</Text>
        <Text style={styles.devName}>Gabriel Balduíno</Text>
        <Text style={styles.devName}>Cristian Breno</Text>
        <Text style={styles.devName}>Daniel Filipe</Text>
        <Text style={styles.devName}>Murilo Diniz</Text>
        <Text style={styles.devName}>Mauro Lúcio</Text>
        <Text style={styles.devRole}>Desenvolvedor da Aplicação</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tecnologias Utilizadas</Text>
        <Text>• React Native</Text>
        <Text>• React Navigation</Text>
        <Text>• API REST Countries (v3.1)</Text>
      </View>

      <Text style={styles.version}>Versão 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  appDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  section: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  devName: {
    fontSize: 18,
    fontWeight: '600',
  },
  devRole: {
    fontSize: 14,
    color: '#888',
  },
  link: {
    color: '#007BFF',
    textDecorationLine: 'underline',
    fontSize: 16,
    marginTop: 5,
  },
  version: {
    fontSize: 12,
    color: '#999',
    marginTop: 20,
  },
});