/* eslint class-methods-use-this: 0 */
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import firebase from 'react-native-firebase';
import { Navigation } from 'react-native-navigation';
import { Header } from 'react-native-elements';

export default class Home extends Component {
  constructor() {
    super();
    this.unsubscriber = null;
    this.ref = firebase.firestore().collection('users');
    this.state = {
      name: '',
      displayName: '',
    };
    this.logout = this.logout.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  componentWillMount() {
    const user = firebase.auth().currentUser;
    this.setState({ displayName: user.displayName });
  }

  logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // console.log('Signed out successfully');
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

  addUser() {
    this.ref.add({
      username: this.state.name,
    });

    this.setState({ name: '' });
  }

  render() {
    return (
      <View>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
        <View style={styles.container}>
          <Text>Hello {this.state.displayName}</Text>
          <Button onPress={this.logout} title="Logout" />
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
          />
          <Button onPress={this.addUser} title="Add User" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    padding: 5,
  },
});
