import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Dashboard } from '../screens/Dashboard';
import { RegisterLoginData } from '../screens/RegisterLoginData';
import { Home } from '../screens/Home';

const {
  Navigator,
  Screen
} = createStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen name="Home" component={Home} />
      <Screen name="Dashboard" component={Dashboard} />
      <Screen name="RegisterLoginData" component={RegisterLoginData} />
    </Navigator>
  );
}