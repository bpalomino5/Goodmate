import React, { Component } from "react";
import { Text, View, Button, StyleSheet } from "react-native";

export default class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  };

  goToApp = () => {
    this.props.navigation.navigate("Main");
  };

  render() {
    return (
      <View style={styles.container}>
        <Text> Welcome to Goodmate </Text>
        <Text>You Should Login first</Text>
        <View>
          <Button title="Open" onPress={this.goToApp} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30
  }
});
