import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';

export default class UserInfoModal extends Component {
  openNextModal() {
    this.props.navigator.showModal({
      screen: 'goodmate.CreateGroupModal',
      animationType: 'slide-up',
      navigatorStyle: { navBarHidden: true },
    });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flex: 0, justifyContent: 'flex-start' }}>
          <Text style={{ marginBottom: 20, marginLeft: 10 }}>YOUR NAME</Text>
          <Input placeholder="First Last" />
        </View>
        <Button
          containerStyle={{ marginTop: 40 }}
          title="CONTINUE "
          buttonStyle={{
            backgroundColor: 'rgba(92, 99,216, 1)',
            width: 300,
            height: 45,
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 5,
          }}
          onPress={() => this.openNextModal()}
        />
      </View>
    );
  }
}
