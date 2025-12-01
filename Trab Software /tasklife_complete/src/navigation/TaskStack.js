import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskListScreen from '../screens/TaskListScreen';
import TaskFormScreen from '../screens/TaskFormScreen';

const Stack = createNativeStackNavigator();

export default function TaskStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TaskList" component={TaskListScreen} options={{ title: 'TaskLife' }} />
      <Stack.Screen name="TaskForm" component={TaskFormScreen} options={{ title: 'Task' }} />
    </Stack.Navigator>
  );
}
