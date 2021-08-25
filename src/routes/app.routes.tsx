import React from "react";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard } from "../screens/Dashboard";
import { RegisterLoginData } from "../screens/RegisterLoginData";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {

  return(
    <Navigator>
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