import React, { Component } from "react";
import { ActivityIndicator, View } from "react-native";
import { firebase } from "../../firebase";

export default class AuthLoading extends Component {
  constructor(props) {
    super(props);
    this.init();
  }

  init = () => {
    firebase.auth.onAuthStateChanged(user => {
      this.props.navigation.navigate(user != null ? "Main" : "Auth");
    });
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
