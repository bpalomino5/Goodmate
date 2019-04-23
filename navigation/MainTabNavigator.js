import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";

import Home from "../src/components/home";
import ActivityModal from "../src/components/home/components/activity-modal";

import Rent from "../src/components/rent";
import AddRentModal from "../src/components/rent/components/add-rent-modal";

import Settings from "../src/components/settings";

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: "#385136"
  },
  headerTintColor: "#fff"
};

const HomeStack = createStackNavigator(
  {
    Home,
    ActivityModal
  },
  { defaultNavigationOptions, mode: "modal" }
);

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-home" : "md-home"}
    />
  )
};

const RentStack = createStackNavigator(
  { Rent, AddRentModal },
  { defaultNavigationOptions, mode: "modal" }
);

RentStack.navigationOptions = {
  tabBarLabel: "Rent",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-document" : "md-document"}
    />
  )
};

const SettingsStack = createStackNavigator(
  { Settings },
  { defaultNavigationOptions }
);

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  RentStack,
  SettingsStack
});
