/* eslint react/no-array-index-key: 0 */
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Navigation } from "react-native-navigation";
import { toggleDrawer } from "../../components/navigation";

import SelectMenu from "../../components/shared/SelectMenu";
import Header from "../../components/shared/Header";

const profileItems = [
  { title: "Edit profile", screen: "EditProfileModal" },
  { title: "Change Password", screen: "ChangePasswordModal" }
];
const generalItems = [
  { title: "Rent Group", screen: "RentGroupModal" },
  { title: "Send feedback", screen: "FeedbackModal" }
];

class Settings extends Component {
  openModal = screen => {
    Navigation.showModal({
      component: {
        name: screen,
        options: {
          animationType: "slide-up"
        }
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          toggleDrawer={() => toggleDrawer(this.props.componentId)}
          text="Settings"
        />
        <SelectMenu
          title="Profile"
          options={profileItems}
          onItemPress={this.openModal}
        />
        <SelectMenu
          title="General"
          options={generalItems}
          onItemPress={this.openModal}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE"
  }
});

export default Settings;
