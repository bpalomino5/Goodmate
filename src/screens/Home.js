import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import firebase from 'react-native-firebase';

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
        this.props.navigator.resetTo({
          screen: 'goodmate.Login',
          title: 'Login',
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    padding: 5,
  },
});
