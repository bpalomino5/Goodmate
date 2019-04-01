import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";
import { Navigation } from "react-native-navigation";
import { db } from "../../../../firebase";
import GroupOptionModal from "../../../shared/group-option-modal";
import ModalHeader from "../../../shared/modal-header";

class DeleteGroupModal extends Component {
  state = {
    name: "",
    nameError: false,
    errorMessage: null
  };

  closeModal = () => Navigation.dismissModal(this.props.componentId);

  submitUpdate = async () => {
    const { name } = this.state;
    if (name.trim() !== "") {
      const success = await db.DeleteGroup(name);
      if (success) {
        this.props.onFinish();
        this.closeModal();
      } else {
        this.setState({
          nameError: true,
          errorMessage: "Group does not exist"
        });
        this.groupInput.shake();
      }
    }
  };

  render() {
    const { name, nameError, errorMessage } = this.state;
    return (
      <View style={styles.container}>
        <ModalHeader
          text="Delete Group"
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
        <GroupOptionModal
          header="Please confirm by writing your group name and selecting the checkmark"
          text="Group name"
          inputRef={input => {
            this.groupInput = input;
          }}
          name={name}
          nameError={nameError}
          errorMessage={errorMessage}
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

export default DeleteGroupModal;
