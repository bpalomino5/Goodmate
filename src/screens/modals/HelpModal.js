import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Header, Input, Button, Icon } from 'react-native-elements';

export default class HelpModal extends Component {
  closeModal = () => {
    this.props.navigator.dismissModal({
      animationType: 'slide-up',
    });
  };

  resetPassword() {
    this.props.navigator.dismissModal({
      animationType: 'slide-up',
    });
  }
  render() {
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text> Forgot your password? </Text>
          <Text>Please enter your email to reset your password</Text>
          <Input containerStyle={{ marginTop: 10 }} placeholder="Email" />
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
            onPress={() => this.resetPassword()}
          />
        </View>
      </View>
    );
  }
}
