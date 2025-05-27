// src/navigation/Stacks.tsx
import Ionicons from '@expo/vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import ChatScreen from '../screens/ChatScreen';
import FilterScreen from '../screens/FilterScreen';
import MatchesScreen from '../screens/MatchesScreen';
import SwipeScreen from '../screens/SwipeScreen';

export type RootStackParamList = {
  Filter: undefined;
  Swipe: {
    radiusKm: number;
    course: string;
    scholarship: boolean;
    region?: string;
    state?: string;
  };
  Matches: undefined;
  Chat: {
    matchId: number;
    collegeName: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Swipe"
      screenOptions={{
        headerStyle: { backgroundColor: '#1c1c1e' },
        headerTintColor: '#fff',
      }}
    >
      {/* Tela de filtros */}
      <Stack.Screen
        name="Filter"
        component={FilterScreen}
        options={{ title: 'Filtros' }}
      />

      {/* Tela principal de swipe */}
      <Stack.Screen
        name="Swipe"
        component={SwipeScreen}
        options={({ navigation }) => ({
          title: 'Discover',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Filter')}
              style={{ marginRight: 16 }}
            >
              <Ionicons name="filter-outline" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        })}
      />

      {/* Lista de matches */}
      <Stack.Screen
        name="Matches"
        component={MatchesScreen}
        options={{ title: 'Matches' }}
      />

      {/* Chat */}
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={({ route }) => ({
          title: route.params.collegeName,
        })}
      />
    </Stack.Navigator>
  );
}
