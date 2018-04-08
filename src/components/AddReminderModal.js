import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { TextField } from 'react-native-material-textfield';

const GoodHeader = ({ closeModal }) => (
  <Header
    statusBarProps={{ backgroundColor: '#5B725A' }}
    backgroundColor="#5B725A"
    leftComponent={
      <Icon name="arrow-back" color="white" underlayColor="transparent" onPress={closeModal} />
    }
    centerComponent={{ text: 'Create Reminder', style: { fontSize: 18, color: '#fff' } }}
  />
);

export default class AddReminderModal extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    statusBarColor: '#5B725A',
  };

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
        <View style={{ padding: 10, backgroundColor: '#5B725A' }}>
          <TextField label="Title" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3E1DE',
  },
});
