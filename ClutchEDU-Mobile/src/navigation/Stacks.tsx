import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import ChatScreen from '../screens/ChatScreen';
import DiscoverySettingsScreen from '../screens/DiscoverySettingsScreen';
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
    <Stack.Navigator
      initialRouteName="DiscoverySettings"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="DiscoverySettings"
        component={DiscoverySettingsScreen}
      />
      <Stack.Screen
        name="Swipe"
        component={SwipeScreen}
      />
      <Stack.Screen
        name="Matches"
        component={MatchesScreen}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={({ route }) => ({
          headerShown: true,
          headerTitle: route.params.collegeName,
        })}
      />
    </Stack.Navigator>
  );
}
