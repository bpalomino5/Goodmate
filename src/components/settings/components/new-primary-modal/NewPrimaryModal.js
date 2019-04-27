import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";
import { Dropdown } from "react-native-material-dropdown";
import { db, auth } from "../../../../firebase";

const MateSelect = ({ names, onSelect }) => (
  <View>
    <Dropdown
      label="Select new primary"
      data={names}
      containerStyle={{ padding: 10 }}
      onChangeText={onSelect}
    />
  </View>
);

export default class NewPrimaryModal extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Assign New Primary        ",
      headerRight: (
        <Icon
          containerStyle={{ marginRight: 10 }}
          name="check"
          color="white"
          underlayColor="transparent"
          onPress={navigation.getParam("submitUpdate")}
        />
      )
    };
  };
  state = {
    roommates: [],
    names: [],
    selected: ""
  };

  componentDidMount = async () => {
    const { navigation } = this.props;
    const roommates = await db.getRoommates();
    const data = [];
    roommates.forEach(mate => {
      if (!auth.isAuthUser(mate.uid)) {
        data.push({ value: mate.name });
      }
    });
    this.setState({ roommates, names: data });

    navigation.setParams({
      submitUpdate: this.submitUpdate
    });
  };

  submitUpdate = async () => {
    const { navigation } = this.props;
    const { roommates, selected } = this.state;
    let roommate = null;
    if (selected.trim() !== "") {
      roommates.forEach(mate => {
        if (selected === mate.name) {
          roommate = mate;
        }
      });

      if (roommate) {
        await db.updatePrimary(roommate.uid);
        navigation.state.params.onFinish();
        navigation.goBack();
      }
    }
  };

  render() {
    const { names } = this.state;
    return (
      <View style={styles.container}>
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
