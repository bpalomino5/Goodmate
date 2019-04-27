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
import FinishRentModal from "../src/components/rent/components/finish-rent-modal";

import Settings from "../src/components/settings";
import EditProfileModal from "../src/components/settings/components/edit-profile-modal";
import ChangePasswordModal from "../src/components/settings/components/change-password-modal";
import FeedbackModal from "../src/components/settings/components/feedback-modal";
import RentGroupModal from "../src/components/settings/components/rent-group-modal";

import NewPrimaryModal from "../src/components/settings/components/new-primary-modal";
import RemoveMateModal from "../src/components/settings/components/remove-mate-modal";
import DeleteGroupModal from "../src/components/settings/components/delete-group-modal";
import JoinGroupModal from "../src/components/settings/components/join-group-modal";
import LeaveGroupModal from "../src/components/settings/components/leave-group-modal";
import OnlyCreateGroupModal from "../src/components/settings/components/only-create-group-modal.js";

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
  { Rent, AddRentModal, FinishRentModal },
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
  {
    Settings,
    ChangePasswordModal,
    EditProfileModal,
    FeedbackModal,
    RentGroupModal,
    NewPrimaryModal,
    RemoveMateModal,
    DeleteGroupModal,
    JoinGroupModal,
    LeaveGroupModal,
    OnlyCreateGroupModal
  },
  { defaultNavigationOptions, mode: "modal" }
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
