import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";
import { db } from "../../../../firebase";
import GroupOptionModal from "../../../shared/group-option-modal";

class JoinGroupModal extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Join a Group     ",
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
    name: "",
    nameError: false,
    errorMessage: null
  };

  componentDidMount = () => {
    const { navigation } = this.props;
    navigation.setParams({
      submitUpdate: this.submitUpdate
    });
  };

  submitUpdate = async () => {
    const { navigation } = this.props;

    const { name } = this.state;
    if (name.trim() !== "") {
      const success = await db.addUsertoGroup(name);
      if (success) {
        navigation.state.params.onFinish();
        navigation.goBack();
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
