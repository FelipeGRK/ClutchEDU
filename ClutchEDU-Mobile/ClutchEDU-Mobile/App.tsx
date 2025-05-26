// App.tsx
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler'; // 👈 importante
import StackNavigator from './src/navigation/Stacks.tsx'; // ajuste o nome se for Stack.tsx

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

