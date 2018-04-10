/* eslint react/no-array-index-key: 0 */
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Icon, Text, Card, Button } from 'react-native-elements';

const roommates = [
  { name: 'Brandon', primary: false },
  { name: 'Bryan', primary: true },
  { name: 'CJ', primary: false },
  { name: 'Marvin', primary: false },
];

const GoodHeader = ({ closeModal }) => (
  <Header
    statusBarProps={{ backgroundColor: '#5B725A' }}
    backgroundColor="#5B725A"
    leftComponent={
      <Icon name="arrow-back" color="white" underlayColor="transparent" onPress={closeModal} />
    }
    centerComponent={{ text: 'Rent Group', style: { fontSize: 18, color: '#fff' } }}
  />
);

const RoommateView = () => (
  <Card title="Roommates">
    {roommates.map((member, i) => (
      <View
        style={{
          flex: 0,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
        }}
        key={i}
      >
        <Text style={{ fontSize: 20 }}>{member.name}</Text>
        {member.primary && <Icon name="verified-user" />}
      </View>
    ))}
  </Card>
);

export default class RentGroupModal extends Component {
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
        <RoommateView />
        <Button
          containerStyle={{ marginTop: 10 }}
          title="Delete Group "
          buttonStyle={{
            backgroundColor: 'rgba(92, 99,216, 1)',
            width: 300,
            height: 45,
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 5,
          }}
        />
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
