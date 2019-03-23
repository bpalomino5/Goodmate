import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import { Navigation } from 'react-native-navigation';
import { db, auth } from '../../../../../../../firebase';

const GoodHeader = ({ closeModal, submitUpdate }) => (
  <Header
    statusBarProps={{ backgroundColor: '#546054' }}
    backgroundColor="#5B725A"
    leftComponent={
      <Icon name="close" color="white" underlayColor="transparent" onPress={closeModal} />
    }
    centerComponent={{ text: 'Assign New Primary', style: { fontSize: 18, color: '#fff' } }}
    rightComponent={
      <Icon name="check" color="white" underlayColor="transparent" onPress={submitUpdate} />
    }
  />
);

const MateSelect = ({ names, onSelect }) => (
  <View>
    <Dropdown
      label="Select new primary"
      data={names}
      containerStyle={{ padding: 10 }}
      onChangeText={onSelect}
    />
  </View>
);

export default class NewPrimaryModal extends Component {
  state = {
    roommates: [],
    names: [],
    selected: '',
  };

  componentDidMount = async () => {
    const roommates = await db.getRoommates();
    const data = [];
    roommates.forEach(mate => {
      if (!auth.isAuthUser(mate.uid)) {
        data.push({ value: mate.first });
      }
    });
    this.setState({ roommates, names: data });
  };

  closeModal = () => Navigation.dismissModal(this.props.componentId);

  submitUpdate = async () => {
    const { roommates, selected } = this.state;
    let roommate = null;
    if (selected.trim() !== '') {
      roommates.forEach(mate => {
        if (selected === mate.first) {
          roommate = mate;
        }
      });

      if (roommate) {
        await db.updatePrimary(roommate.uid);
        this.props.onFinish();
        this.closeModal();
      }
    }
  };

  render() {
    const { names } = this.state;
    return (
      <View style={styles.container}>
        <GoodHeader closeModal={this.closeModal} submitUpdate={this.submitUpdate} />
        <MateSelect names={names} onSelect={selected => this.setState({ selected })} />
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
