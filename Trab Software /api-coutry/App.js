import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import menu from './pages/menu';
import splash from './pages/splash';
import search from './pages/search';
import about from './pages/about'

export default function App() {
  
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={splash}
          options={{ headerShown: false }} // Oculta o cabeçalho de navegação nesta tela
        />
        <Stack.Screen
          name="Home"
          component={menu}
          options={{ title: 'Página Principal' }} // Título do cabeçalho
        />
        <Stack.Screen
          name="Search"
          component={search}
          options={{ title: 'Voltar menu' }}
        />
        <Stack.Screen
          name="About"
          component={about}
          options={{ title: 'Voltar' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

