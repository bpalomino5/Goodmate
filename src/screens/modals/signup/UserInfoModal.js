import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import firebase from 'react-native-firebase';

export default class UserInfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      user: null,
      isLoading: false,
    };
    this.openNextModal = this.openNextModal.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  openNextModal() {
    this.setState({ isLoading: true });
    const { name, user } = this.state;
    if (name.length !== 0 && user !== null) {
      user.updateProfile({ displayName: name }).then(() => {
        // then move on to next modal
        this.props.navigator.showModal({
          screen: 'goodmate.CreateGroupModal',
          animationType: 'slide-up',
          navigatorStyle: { navBarHidden: true },
        });
      });
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
        <View style={{ flex: 0, justifyContent: 'flex-start' }}>
          <Text style={{ marginBottom: 20, marginLeft: 10 }}>YOUR NAME</Text>
          <Input
            placeholder="First Last"
            value={this.state.name}
            onChangeText={t => this.setState({ name: t })}
            onSubmitEditing={this.openNextModal}
          />
        </View>
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
