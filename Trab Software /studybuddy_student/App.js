import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import MainScreen from './src/screens/MainScreen';
import TasksScreen from './src/screens/TasksScreen';
import AboutScreen from './src/screens/AboutScreen';
import { initDB } from './src/services/db';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    // inicializa DB
    initDB().catch(err => console.log('DB init error', err));
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Tasks" component={TasksScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
