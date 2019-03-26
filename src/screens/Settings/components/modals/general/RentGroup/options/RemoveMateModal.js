import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";
import { Dropdown } from "react-native-material-dropdown";
import { Navigation } from "react-native-navigation";
import { db, auth } from "../../../../../../../firebase";
import ModalHeader from "../../../../../../../components/shared/ModalHeader";

const MateSelect = ({ names, onSelect }) => (
  <View>
    <Dropdown
      label="Select roommate"
      data={names}
      containerStyle={{ padding: 10 }}
      onChangeText={onSelect}
    />
  </View>
);

export default class RemoveMateModal extends Component {
  state = {
    roommates: [],
    names: [],
    selected: ""
  };

  componentDidMount = async () => {
    const roommates = await db.getRoommates();
    const data = [];
    roommates.forEach(mate => {
      if (!auth.isAuthUser(mate.uid)) {
        data.push({ value: mate.name });
      }
    });
    this.setState({ roommates, names: data });
  };

  closeModal = () => Navigation.dismissModal(this.props.componentId);

  submitUpdate = async () => {
    const { roommates, selected } = this.state;
    let roommate = null;
    if (selected.trim() !== "") {
      roommates.forEach(mate => {
        if (selected === mate.name) {
          roommate = mate;
        }
      });

      if (roommate) {
        await db.removeRoommate(roommate.uid);
        this.props.onFinish();
        this.closeModal();
      }
    }
  };

  render() {
    const { names } = this.state;
    return (
      <View style={styles.container}>
        <ModalHeader
          text="Remove Roommate"
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
        <MateSelect
          names={names}
          onSelect={selected => this.setState({ selected })}
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
