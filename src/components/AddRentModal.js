import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Icon, Button } from 'react-native-elements';
import RentForm from './RentForm';

const GoodHeader = ({ closeModal }) => (
  <Header
    statusBarProps={{ backgroundColor: '#5B725A' }}
    backgroundColor="#5B725A"
    leftComponent={
      <Icon name="arrow-back" color="white" underlayColor="transparent" onPress={closeModal} />
    }
    centerComponent={{ text: 'Create Rent Sheet', style: { fontSize: 18, color: '#fff' } }}
  />
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
        <Button
          containerStyle={{ marginTop: 20 }}
          title="Submit "
          buttonStyle={{ borderRadius: 30 }}
        />
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
