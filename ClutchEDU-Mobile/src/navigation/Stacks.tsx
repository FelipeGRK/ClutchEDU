import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import ChatScreen from '../screens/ChatScreen';
import MatchesScreen from '../screens/MatchesScreen';
import SwipeScreen from '../screens/SwipeScreen';
import ProfileScreen from '../screens/ProfileScreen';
export type RootStackParamList = {
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
  Profile: undefined; // ✅ Add this
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Swipe"
      screenOptions={{
        headerShown: false, // a gente desenha o header custom dentro do SwipeScreen
      }}
    >
      <Stack.Screen name="Swipe" component={SwipeScreen} />
      <Stack.Screen name="Matches" component={MatchesScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}
