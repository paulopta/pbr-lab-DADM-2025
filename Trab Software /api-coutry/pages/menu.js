import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function HomeScreen({ navigation }) {

  const handlePressSearch = () => {
    // Navega para a tela 'Home'
    navigation.navigate('Search');
  };

  const handlePressAbout = () => {
    // Navega para a tela 'Home'
    navigation.navigate('About');
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Button
        style={styles.buttons}
        title='Procurar o País'
        onPress={handlePressSearch}
      />
      <br/>
      <Button
        style={styles.buttons}
        onPress={handlePressAbout}
        title='          Sobre          '
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttons: {
    height: 50,
    width: 20,
  }
});