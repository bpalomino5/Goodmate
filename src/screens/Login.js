import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import firebase from 'react-native-firebase';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.login = this.login.bind(this);
  }

  login() {
    firebase
      .auth()
      .signInAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
      .then(response => {
        if (response) {
          console.log('Signed in succesfully');
          // go to Home
          this.props.navigator.resetTo({
            screen: 'goodmate.Home',
            title: 'Home',
          });
        }
      })
      .catch(error => {
        console.log(error.code, error.message);
      });
  }

  render() {
    return (
      <View style={styles.tcontainer}>
        <Text>Testing Login</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button onPress={this.login} title="Login" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tcontainer: {
    flex: 0,
    justifyContent: 'center',
    padding: 5,
  },
});
