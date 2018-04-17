import React, { Component } from 'react';
import { View, ImageBackground, Dimensions, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const BG_IMAGE = require('../../../assets/bg2.jpg');

export default class WelcomeModal extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigator.showModal({
        screen: 'goodmate.UserInfoModal',
        animationType: 'slide-up',
        passProps: { user: this.props.user },
        navigatorStyle: { navBarHidden: true },
      });
    }, 3000);
  }

  render() {
    return (
      <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white' }} h4 fontFamily="AvenirNext-Medium">
            Welcome to Goodmate,
          </Text>
          <Text style={{ color: 'white' }} h4 fontFamily="AvenirNext-Medium">
            {"Let's get started..."}
          </Text>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
