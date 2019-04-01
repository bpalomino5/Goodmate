import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Input } from "react-native-elements";
import { Navigation } from "react-native-navigation";
import { db, auth } from "../../../../firebase";
import ModalHeader from "../../../shared/modal-header";

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
  state = { name: "" };

  closeModal = () => Navigation.dismissModal(this.props.componentId);

  submitUpdates = async () => {
    const { name } = this.state;
    if (name.trim() !== "") {
      await db.updateUserName(name);
      await auth.updateUserName(name);
      this.closeModal();
    }
  };

  render() {
    const { name } = this.state;
    return (
      <View style={styles.container}>
        <ModalHeader
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
        />
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
