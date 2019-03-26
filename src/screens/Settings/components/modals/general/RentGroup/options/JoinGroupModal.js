import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";
import { Navigation } from "react-native-navigation";
import { db } from "../../../../../../../firebase";
import GroupOptionModal from "../../../../../../../components/shared/GroupOptionModal";
import ModalHeader from "../../../../../../../components/shared/ModalHeader";

class JoinGroupModal extends Component {
  state = {
    name: "",
    nameError: false,
    errorMessage: null
  };

  closeModal = () => Navigation.dismissModal(this.props.componentId);

  submitUpdate = async () => {
    const { name } = this.state;
    if (name.trim() !== "") {
      const success = await db.addUsertoGroup(name);
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
          text="Join a Group"
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
          header="Goodmate users can organize themselves into groups! Groups are essential for dividing
          monthly rent and chores"
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

export default JoinGroupModal;
