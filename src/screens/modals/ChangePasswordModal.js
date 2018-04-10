import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { TextField } from 'react-native-material-textfield';

const GoodHeader = ({ closeModal }) => (
  <Header
    statusBarProps={{ backgroundColor: '#5B725A' }}
    backgroundColor="#5B725A"
    leftComponent={
      <Icon name="close" color="white" underlayColor="transparent" onPress={closeModal} />
    }
    centerComponent={{ text: 'Change Password', style: { fontSize: 18, color: '#fff' } }}
    rightComponent={
      <Icon name="check" color="white" underlayColor="transparent" onPress={closeModal} />
    }
  />
);

export default class ChangePasswordModal extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.props.navigator.dismissModal({
      animationType: 'slide-down',
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <GoodHeader closeModal={this.closeModal} />
        <View style={{ padding: 15 }}>
          <TextField label="Current" baseColor="grey" tintColor="grey" />
          <TextField label="New" baseColor="grey" tintColor="grey" />
          <TextField label="Verify" baseColor="grey" tintColor="grey" />
        </View>
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
