import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation";

import Login from "../src/components/login";
import HelpModal from "../src/components/login/components/help-modal";
import CreateGroupModal from "../src/components/login/components/create-group-modal";
import UserInfoModal from "../src/components/login/components/user-info-modal";

const LoginStack = createStackNavigator(
  {
    Login,
    HelpModal,
    CreateGroupModal,
    UserInfoModal
  },
  { mode: "modal" }
);

export default LoginStack;
