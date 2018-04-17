import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Header, Input, Button, Icon } from 'react-native-elements';
import firebase from 'react-native-firebase';

const ForgotView = ({ onSubmit, onChangeText }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text> Forgot your password? </Text>
    <Text>Please enter your email to reset your password</Text>
    <Input containerStyle={{ marginTop: 10 }} placeholder="Email" onChangeText={onChangeText} />
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
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text> Thank you for your dedication to Goodmate </Text>
    <Text>An email will arrive shortly</Text>
  </View>
);

export default class HelpModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      email: '',
    };
    this.resetPassword = this.resetPassword.bind(this);
  }

  closeModal = () => {
    this.props.navigator.dismissModal({
      animationType: 'slide-up',
    });
  };

  resetPassword() {
    const { email } = this.state;
    if (email.length !== 0) {
      this.setState({ submitted: true });
      firebase.auth().sendPasswordResetEmail(email);
    }
  }

  render() {
    const { submitted } = this.state;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
      >
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
