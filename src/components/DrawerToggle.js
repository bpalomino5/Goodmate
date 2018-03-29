import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';

export default class DrawerToggle extends Component {
  render() {
    return (
      <View>
        <Icon
          name="menu"
          type="Feather"
          onPress={() => Navigation.handleDeepLink({ link: 'DrawerToggle' })}
        />
      </View>
    );
  }
}
