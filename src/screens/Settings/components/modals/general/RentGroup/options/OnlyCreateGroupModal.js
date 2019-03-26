import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Text, Input } from "react-native-elements";
import { Navigation } from "react-native-navigation";
import { db } from "../../../../../../../firebase";
import ModalHeader from "../../../../../../../components/shared/ModalHeader";

export default class OnlyCreateGroupModal extends Component {
  state = {
    name: "",
    nameError: false,
    errorMessage: null
  };

  closeModal = () => Navigation.dismissModal(this.props.componentId);

  submitUpdate = async () => {
    const { name } = this.state;
    if (name.trim() !== "") {
      const success = await db.createGroup(name);
      if (success) {
        this.props.onFinish();
        this.closeModal();
      } else {
        this.setState({ nameError: true, errorMessage: "Group name taken" });
        this.groupInput.shake();
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ModalHeader
          text="Create a Group"
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
              onPress={this.submitUpdate}
            />
          }
        />
        <View style={{ flex: 0, padding: 15, marginTop: 30 }}>
          <Text style={{ fontSize: 18, marginBottom: 30 }}>
            Goodmate users can organize themselves into groups! Groups are
            essential for dividing monthly rent and chores
          </Text>
          <View style={{ marginTop: 10 }}>
            <Text>Group name</Text>
            <Input
              ref={input => {
                this.groupInput = input;
              }}
              value={this.state.name}
              onChangeText={name => this.setState({ name })}
              displayError={this.state.nameError}
              placeholder="Anonymous Llamas"
              errorMessage={this.state.errorMessage}
            />
          </View>
        </View>
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
