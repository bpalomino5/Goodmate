import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import {
  Header, Input, Button, Icon,
} from 'react-native-elements';
import firebase from 'react-native-firebase';

const ForgotView = ({ onSubmit, onChangeText }) => (
  <View style={styles.forgetView}>
    <Text> Forgot your password? </Text>
    <Text>Please enter your email to reset your password</Text>
    <Input
      containerStyle={{ marginTop: 10, paddingLeft: 20, paddingRight: 20 }}
      placeholder="Email"
      onChangeText={onChangeText}
    />
    <Button
      containerStyle={{ marginTop: 30 }}
      title="Submit "
      buttonStyle={{
        backgroundColor: 'rgba(92, 99,216, 1)',
        width: 300,
        height: 45,
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 5,
      }}
      onPress={onSubmit}
    />
  </View>
);

const SubmitView = () => (
  <View style={styles.submitView}>
    <Text> Thank you for your dedication to Goodmate </Text>
    <Text>An email will arrive shortly</Text>
  </View>
);

export default class HelpModal extends Component {
  state = { submitted: false, email: '' };

  closeModal = () => Navigation.dismissModal(this.props.componentId);

  resetPassword = () => {
    const { email } = this.state;
    if (email.length !== 0) {
      this.setState({ submitted: true });
      firebase.auth().sendPasswordResetEmail(email);
    }
  };

  render() {
    const { submitted } = this.state;
    return (
      <View style={styles.container}>
        <Header
          backgroundColor="white"
          statusBarProps={{ backgroundColor: 'white' }}
          leftComponent={
            <Icon name="close" underlayColor="transparent" onPress={this.closeModal} />
          }
          outerContainerStyles={{ borderBottomWidth: 0 }}
        />
        {submitted === false ? (
          <ForgotView
            onSubmit={this.resetPassword}
            onChangeText={email => this.setState({ email })}
          />
        ) : (
          <SubmitView />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  forgetView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
