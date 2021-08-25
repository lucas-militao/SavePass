import React from "react";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard } from "../screens/Dashboard";
import { RegisterLoginData } from "../screens/RegisterLoginData";
import { useTheme } from "styled-components";

import { Feather } from '@expo/vector-icons';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {

  const theme = useTheme();

  return(
    <Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.secondary,
        inactiveTintColor: theme.colors.primary,
      }}
    >
      <Screen
        name="Principal"
        component={Dashboard}
        options={{
          tabBarIcon: (({ size, color }) => (
            <Feather
              name="home"
              size={size}
              color={color}
            />
          ))
        }}
      />
      <Screen
        name="Registrar"
        component={RegisterLoginData}
        options={{
          tabBarIcon: (({ size, color }) => (
            <Feather
              name="plus"
              size={size}
              color={color}
            />
          ))
        }}
      />
    </Navigator>
  )
}