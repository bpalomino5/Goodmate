import React, { Component } from "react";
import { ActivityIndicator, View } from "react-native";
import { firebase } from "../../firebase";

export default class AuthLoading extends Component {
  componentDidMount = () => {
    this.init();
  };

  init = () => {
    const { navigation } = this.props;
    this.unsubscriber = firebase.auth.onAuthStateChanged(user => {
      navigation.navigate(user != null ? "Main" : "Auth");
    });
  };

  componentWillUnmount = () => {
    this.unsubscriber();
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
