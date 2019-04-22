import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation";

import Login from "../src/components/login";

const LoginStack = createStackNavigator({
  Login: Login
});

export default LoginStack;
