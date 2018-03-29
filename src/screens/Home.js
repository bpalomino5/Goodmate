/* eslint class-methods-use-this: 0 */
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import firebase from 'react-native-firebase';
import { Navigation } from 'react-native-navigation';

export default class Home extends Component {
  static navigatorButtons = {
    leftButtons: [
      {
        component: 'goodmate.DrawerToggle',
      },
    ],
  };

  constructor(props) {
    super(props);
    this.unsubscriber = null;
    this.ref = firebase.firestore().collection('users');
    this.state = {
      name: '',
      displayName: '',
    };

    this.addUser = this.addUser.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentWillMount() {
    const user = firebase.auth().currentUser;
    this.setState({ displayName: user.displayName });
  }

  onNavigatorEvent(event) {
    if (event.type === 'DeepLink') {
      console.log(event.link);
      if (event.link === 'DrawerToggle') {
        this.props.navigator.toggleDrawer({
          side: 'left',
          animated: true,
        });
      }
    }
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
