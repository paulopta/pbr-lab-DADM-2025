import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import logo from '../assets/logo.png'

export default function SplashScreen({ navigation }) {
  const handlePress = () => {
    // Navega para a tela 'Home'
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress}>
        <Image
          source={require('../assets/logo.png')} 
          style={styles.logo}
        />
      <Text style={styles.text}>Toque para entrar</Text>
      </Pressable>
      <Text style={styles.version}>Versão 1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  text: {
    marginTop: 30,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  version: {
    position: 'absolute', 
    bottom: 30,          
    color: '#888',
  },
});