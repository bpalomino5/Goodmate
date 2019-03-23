import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Icon, Input } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import { db, auth } from '../../../../../firebase';

const GoodHeader = ({ closeModal, submitUpdates }) => (
  <Header
    statusBarProps={{ backgroundColor: '#546054' }}
    backgroundColor="#5B725A"
    leftComponent={
      <Icon name="close" color="white" underlayColor="transparent" onPress={closeModal} />
    }
    centerComponent={{ text: 'Edit Profile', style: { fontSize: 18, color: '#fff' } }}
    rightComponent={
      <Icon name="check" color="white" underlayColor="transparent" onPress={submitUpdates} />
    }
  />
);

const ProfileItems = ({ name, onChangeText }) => (
  <View style={{ padding: 15 }}>
    <Input
      label="Update Username"
      placeholder="Username"
      value={name}
      onChangeText={onChangeText}
    />
  </View>
);

class EditProfileModal extends Component {
  state = { name: '' };

  closeModal = () => Navigation.dismissModal(this.props.componentId);

  submitUpdates = async () => {
    const { name } = this.state;
    if (name.trim() !== '') {
      await db.updateUserName(name);
      await auth.updateUserName(name);
      this.closeModal();
    }
  };

  render() {
    const { name } = this.state;
    return (
      <View style={styles.container}>
        <GoodHeader closeModal={this.closeModal} submitUpdates={this.submitUpdates} />
        <ProfileItems name={name} onChangeText={name => this.setState({ name })} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default EditProfileModal;
