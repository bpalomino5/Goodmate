import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

import SelectMenu from "../shared/select-menu";
import { Button } from "react-native-elements";
import { auth } from "../../firebase";

const profileItems = [
  { title: "Edit profile", screen: "EditProfileModal" },
  { title: "Change Password", screen: "ChangePasswordModal" }
];
const generalItems = [
  { title: "Rent Group", screen: "RentGroupModal" },
  { title: "Send feedback", screen: "FeedbackModal" }
];

class Settings extends Component {
  static navigationOptions = {
    title: "Settings   ",
    headerBackTitle: null
  };

  state = {
    displayName: ""
  };

  componentDidMount = () => {
    this.setState({ displayName: auth.getDisplayName() });
  };

  openModal = screen => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };

  onSignOut = async () => {
    await auth.signOut();
    this.props.navigation.navigate("Auth");
  };

  render() {
    const { displayName } = this.state;
    return (
      <View style={styles.container}>
        <SelectMenu
          title="Profile"
          subtitle={displayName}
          options={profileItems}
          onItemPress={this.openModal}
        />
        <SelectMenu
          title="General"
          options={generalItems}
          onItemPress={this.openModal}
        />
        <View style={styles.signout}>
          <Button title="Sign Out" onPress={this.onSignOut} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  signout: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  }
});

export default Settings;
