// src/navigation/Tabs.tsx
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import ChatScreen from '../screens/ChatScreen';
import MatchesScreen from '../screens/MatchesScreen';
import SwipeScreen from '../screens/SwipeScreen';
import { RootStackParamList } from './Stacks'; // ajuste o caminho se necessário

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Swipe"
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: '#6A0DAD',
        },
        headerTintColor: '#fff',
        tabBarActiveTintColor: '#6A0DAD',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#fff' },
        tabBarIcon: ({ color, size }) => {
          let iconName: React.ComponentProps<typeof Ionicons>['name'];
          if (route.name === 'Swipe') iconName = 'heart-outline';
          else if (route.name === 'Matches') iconName = 'chatbubble-ellipses-outline';
          else iconName = 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      {/* Swipe recebe params, então definimos valores iniciais */}
      <Tab.Screen
        name="Swipe"
        component={SwipeScreen}
        options={{ title: '' }}
        initialParams={{ radiusKm: 10, course: '', scholarship: false }}
      />

      <Tab.Screen
        name="Matches"
        component={MatchesScreen}
        options={{ title: '' }}
      />

      {/* Chat também recebe params, então damos initialParams vazios */}
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={({ route }) => ({
          title: route.params.collegeName,
        })}
        initialParams={{ matchId: 0, collegeName: '' }}
      />
    </Tab.Navigator>
  );
}
