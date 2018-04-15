import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

export default class WelcomeModal extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigator.showModal({
        screen: 'goodmate.UserInfoModal',
        animationType: 'slide-up',
        navigatorStyle: { navBarHidden: true },
      });
    }, 4000);
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'green' }} h4 fontFamily="AvenirNext-Medium">
          Welcome to Goodmate,
        </Text>
        <Text style={{ color: 'green' }} h4 fontFamily="AvenirNext-Medium">
          {"Let's get started..."}
        </Text>
      </View>
    );
  }
}
