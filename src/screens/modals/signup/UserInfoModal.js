import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import FireTools from '../../../utils/FireTools';

export default class UserInfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isLoading: false,
    };
    this.openNextModal = this.openNextModal.bind(this);
  }

  componentDidMount() {
    FireTools.init();
  }

  async openNextModal() {
    this.setState({ isLoading: true });
    const { name } = this.state;
    if (name.trim() !== '') {
      await FireTools.user.updateProfile({ displayName: name });
      // then move on to next modal
      Navigation.showModal({
        component: {
          name: 'goodmate.CreateGroupModal',
          options: {
            animationType: 'slide-up',
          },
        },
      });
      // this.props.navigator.showModal({
      //   screen: 'goodmate.CreateGroupModal',
      //   animationType: 'slide-up',
      //   navigatorStyle: { navBarHidden: true },
      // });
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <Text style={{ marginBottom: 20, marginLeft: 10 }}>YOUR NAME</Text>
        <Input
          placeholder="First Last"
          value={this.state.name}
          onChangeText={t => this.setState({ name: t })}
          onSubmitEditing={this.openNextModal}
        />
        <Button
          containerStyle={{ marginTop: 40 }}
          title="CONTINUE  "
          buttonStyle={{
            backgroundColor: 'rgba(92, 99,216, 1)',
            width: 300,
            height: 45,
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 5,
          }}
          onPress={this.openNextModal}
          loading={this.state.isLoading}
          disabled={this.state.isLoading}
        />
      </View>
    );
  }
}
