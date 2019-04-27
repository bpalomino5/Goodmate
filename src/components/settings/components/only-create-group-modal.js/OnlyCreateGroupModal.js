import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Text, Input } from "react-native-elements";
import { db } from "../../../../firebase";

export default class OnlyCreateGroupModal extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Create a Group     ",
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
      const success = await db.createGroup(name);
      if (success) {
        navigation.state.params.onFinish();
        navigation.goBack();
      } else {
        this.setState({ nameError: true, errorMessage: "Group name taken" });
        this.groupInput.shake();
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
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
