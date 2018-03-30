import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import firebase from 'react-native-firebase';
import { Header, Icon } from 'react-native-elements';

export default class Home extends Component {
  static navigatorStyle = {
    navBarHidden: true,
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
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  componentWillMount() {
    const user = firebase.auth().currentUser;
    this.setState({ displayName: user.displayName });
  }

  toggleDrawer() {
    this.props.navigator.toggleDrawer({
      side: 'left',
      animated: true,
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
          statusBarProps={{ backgroundColor: '#5B725A' }}
          backgroundColor="#5B725A"
          leftComponent={
            <Icon name="menu" type="Feather" color="white" underlayColor="lightblue" onPress={this.toggleDrawer} />
          }
          centerComponent={{ text: 'Home', style: { fontSize: 18, color: '#fff' } }}
        />
        <View style={styles.container}>
          <Text>Hello {this.state.displayName}</Text>
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
