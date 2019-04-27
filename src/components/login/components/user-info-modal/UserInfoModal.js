import React, { Component } from "react";
import { Text, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { auth } from "../../../../firebase";

export default class UserInfoModal extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    name: "",
    isLoading: false
  };

  openNextModal = async () => {
    const { navigation } = this.props;
    this.setState({ isLoading: true });
    const { name } = this.state;
    if (name.trim() !== "") {
      await auth.updateUserName(name);
      navigation.navigate("CreateGroupModal");
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white"
        }}
      >
        <Text style={{ marginBottom: 20, marginLeft: 10 }}>YOUR NAME</Text>
        <Input
          inputStyle={{ textAlign: "center" }}
          placeholder="First Last"
          value={this.state.name}
          onChangeText={t => this.setState({ name: t })}
          onSubmitEditing={this.openNextModal}
        />
        <Button
          containerStyle={{ marginTop: 30 }}
          title="CONTINUE  "
          buttonStyle={{
            width: 300,
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5
          }}
          onPress={this.openNextModal}
          loading={this.state.isLoading}
          disabled={this.state.isLoading}
        />
      </View>
    );
  }
}
