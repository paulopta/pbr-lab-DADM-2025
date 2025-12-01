import React, { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './src/navigation/MainTabs';
import { registerForPushNotificationsAsync } from './src/services/notifications';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    // Register for notifications (best-effort)
    registerForPushNotificationsAsync();
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
