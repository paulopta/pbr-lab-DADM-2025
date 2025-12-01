import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TaskStack from './TaskStack';
import StatisticsScreen from '../screens/StatisticsScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Tasks" component={TaskStack} options={{
        tabBarIcon: ({color, size}) => <MaterialCommunityIcons name="format-list-bulleted" size={size} color={color} />
      }} />
      <Tab.Screen name="Statistics" component={StatisticsScreen} options={{
        tabBarIcon: ({color, size}) => <MaterialCommunityIcons name="chart-line" size={size} color={color} />
      }} />
    </Tab.Navigator>
  );
}
