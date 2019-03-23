import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import {
  Header, Input, Button, Icon,
} from 'react-native-elements';
import { auth } from '../../../../firebase';

const ForgotView = ({ onSubmit, onChangeText }) => (
  <View style={styles.forgetView}>
    <Text> Forgot your password? </Text>
    <Text>Please enter your email to reset your password</Text>
    <Input
      inputStyle={{ textAlign: 'center' }}
      containerStyle={styles.inputStyle}
      placeholder="Email"
      onChangeText={onChangeText}
    />
    <Button
      containerStyle={{ marginTop: 30 }}
      title="Submit "
      buttonStyle={styles.submitButton}
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

  resetPassword = async () => {
    const { email } = this.state;
    if (email.length !== 0) {
      this.setState({ submitted: true });
      await auth.resetPassword(email);
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
  inputStyle: {
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  submitButton: {
    backgroundColor: 'rgba(92, 99,216, 1)',
    width: 300,
    height: 45,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
  },
});
