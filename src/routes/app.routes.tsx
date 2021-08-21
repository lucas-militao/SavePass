import React from "react";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from "../screens/Home";
import { View } from "react-native";


const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {

  return(
    <Navigator>

      {/* <Screen
        name="Listagem"
        component={Dashboard}
      /> */}
      {/* <Screen
        name="Cadastrar"
        component={RegisterLoginData}
      /> */}
      <Screen name="Home" component={Home} />
    </Navigator>
  );
}