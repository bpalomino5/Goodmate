import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Icon, Button, Input } from 'react-native-elements';

const GoodHeader = ({ closeModal }) => (
  <Header
    statusBarProps={{ backgroundColor: '#5B725A' }}
    backgroundColor="#5B725A"
    leftComponent={
      <Icon name="arrow-back" color="white" underlayColor="transparent" onPress={closeModal} />
    }
    centerComponent={{ text: 'Create Rent Sheet', style: { fontSize: 18, color: '#fff' } }}
    rightComponent={
      <Button title="Done " buttonStyle={{ backgroundColor: 'grey', borderRadius: 30 }} />
    }
  />
);

const RentForm = () => (
  <View style={{ flex: 1, alignItems: 'center' }}>
    <Input placeholder="Monthly Rent" leftIcon={<Icon name="attach-money" size={24} color="black" />} />
    <Input placeholder="Monthly Rent" leftIcon={<Icon name="attach-money" size={24} color="black" />} />
  </View>
);

export default class AddRentModal extends Component {
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
        <RentForm />
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
