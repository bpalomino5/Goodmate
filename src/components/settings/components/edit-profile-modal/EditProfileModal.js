import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Input } from "react-native-elements";
// import { Navigation } from "react-native-navigation";
import { db, auth } from "../../../../firebase";
// import ModalHeader from "../../../shared/modal-header";

const ProfileItems = ({ name, onChangeText }) => (
  <View style={{ padding: 15 }}>
    <Input
      label="Update Username"
      placeholder="Username"
      value={name}
      onChangeText={onChangeText}
    />
  </View>
);

class EditProfileModal extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Edit Profile    ",
      headerRight: (
        <Icon
          containerStyle={{ marginRight: 10 }}
          name="check"
          color="white"
          underlayColor="transparent"
          onPress={navigation.getParam("submitUpdates")}
        />
      )
    };
  };
  state = { name: "" };

  componentDidMount = () => {
    const { navigation } = this.props;
    navigation.setParams({
      submitUpdates: this.submitUpdates
    });
  };

  submitUpdates = async () => {
    const { navigation } = this.props;
    const { name } = this.state;
    if (name.trim() !== "") {
      await db.updateUserName(name);
      await auth.updateUserName(name);
      navigation.goBack();
    }
  };

  render() {
    const { name } = this.state;
    return (
      <View style={styles.container}>
        {/* <ModalHeader
          text="Edit Profile"
          leftComponent={
            <Icon
              name="close"
              color="white"
              underlayColor="transparent"
              onPress={this.closeModal}
            />
          }
          rightComponent={
            <Icon
              name="check"
              color="white"
              underlayColor="transparent"
              onPress={this.submitUpdates}
            />
          }
        /> */}
        <ProfileItems
          name={name}
          onChangeText={name => this.setState({ name })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});

export default EditProfileModal;
