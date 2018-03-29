/* eslint class-methods-use-this: 0 */
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import firebase from 'react-native-firebase';
import { Navigation } from 'react-native-navigation';

export default class Drawer extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        Navigation.startSingleScreenApp({
          screen: {
            screen: 'goodmate.Login',
            title: 'Login',
            navigatorStyle: {
              navBarHidden: true,
            },
          },
        });
      })
      .catch(error => {
        console.log(error.code, error.message);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> textInComponent </Text>
        <Button onPress={this.logout} title="Logout" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#3A3837',
    padding: 5,
  },
});
