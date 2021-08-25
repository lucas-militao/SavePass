import React from "react";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard } from "../screens/Dashboard";
import { RegisterLoginData } from "../screens/RegisterLoginData";
import { useTheme } from "styled-components";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {

  const theme = useTheme();

  return(
    <Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.primary,
        inactiveTintColor: theme.colors.secondary
      }}
    >
      <Screen
        name="Principal"
        component={Dashboard}
      />
      <Screen
        name="Registrar"
        component={RegisterLoginData}
      />
    </Navigator>
  )
}