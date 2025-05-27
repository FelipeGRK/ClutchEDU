// src/navigation/Stacks.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import ChatScreen from '../screens/ChatScreen';
import DiscoverySettingsScreen from '../screens/DiscoverySettings';
import MatchesScreen from '../screens/MatchesScreen';
import SwipeScreen from '../screens/SwipeScreen';

export type RootStackParamList = {
  DiscoverySettings: undefined;
  Swipe: {
    radiusKm: number;
    course: string;
    scholarship: boolean;
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
    <Stack.Navigator initialRouteName="DiscoverySettings"
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen
        name="DiscoverySettings"
        component={DiscoverySettingsScreen}
        options={{ title: 'Discovery Settings' }}
      />
      <Stack.Screen
        name="Swipe"
        component={SwipeScreen}
        options={{ title: 'Swipe Colleges' }}
      />
      <Stack.Screen
        name="Matches"
        component={MatchesScreen}
        options={{ title: 'Matches' }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={({ route }) => ({ title: route.params.collegeName })}
      />
    </Stack.Navigator>
  );
}
