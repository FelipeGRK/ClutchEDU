// src/navigation/Stacks.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ChatScreen from '../screens/ChatScreen';
import FilterScreen from '../screens/FilterScreen';
import MatchesScreen from '../screens/MatchesScreen';
import SwipeScreen from '../screens/SwipeScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Filter" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Filter"  component={FilterScreen} />
      <Stack.Screen name="Swipe"   component={SwipeScreen} />
      <Stack.Screen name="Matches" component={MatchesScreen} />
      <Stack.Screen name="Chat"    component={ChatScreen} />
    </Stack.Navigator>
  );
}
