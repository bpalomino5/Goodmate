import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import AuthLoading from "../src/components/authentication/AuthLoading";

import MainTabNavigator from "./MainTabNavigator";
import AuthNavigator from "./AuthNavigator";

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading,
      Auth: AuthNavigator,
      Main: MainTabNavigator
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
