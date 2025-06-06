// src/navigation/Tabs.tsx
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import ChatScreen from '../screens/ChatScreen';
import MatchesScreen from '../screens/MatchesScreen';
import SwipeScreen from '../screens/SwipeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { RootStackParamList } from './Stacks'; // ajuste o caminho se necessário

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Swipe"
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: '#1c1c1e',
        },
        headerTintColor: '#fff',
        tabBarActiveTintColor: '#6A0DAD',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#fff' },
        tabBarIcon: ({ color, size }) => {
          let iconName: React.ComponentProps<typeof Ionicons>['name'];

          switch (route.name) {
            case 'Swipe':
              iconName = 'heart-outline';
              break;
            case 'Matches':
              iconName = 'game-controller-outline'; // more esports-focused
              break;
            case 'Profile':
              iconName = 'person-circle-outline';
              break;
            case 'Chat':
              iconName = 'chatbox-ellipses-outline';
              break;
            default:
              iconName = 'apps-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
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
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: '' }}
      />
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
