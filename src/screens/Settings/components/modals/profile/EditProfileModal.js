import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { TextField } from 'react-native-material-textfield';
import { Navigation } from 'react-native-navigation';
import FireTools from '../../../../../utils/FireTools';

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
    <TextField
      label="Update Username"
      baseColor="grey"
      tintColor="grey"
      value={name}
      onChangeText={onChangeText}
    />
  </View>
);

export default class EditProfileModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    this.submitUpdates = this.submitUpdates.bind(this);
  }

  componentDidMount() {
    FireTools.init();
  }

  closeModal = () => Navigation.dismissModal(this.props.componentId);

  async submitUpdates() {
    const { name } = this.state;
    if (name.trim() !== '') {
      await FireTools.updateUserName(name);
      this.closeModal();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <GoodHeader closeModal={this.closeModal} submitUpdates={this.submitUpdates} />
        <ProfileItems name={this.state.name} onChangeText={name => this.setState({ name })} />
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
