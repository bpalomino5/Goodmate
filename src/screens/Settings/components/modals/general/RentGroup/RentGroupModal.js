/* eslint react/no-array-index-key: 0 */
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Header, Icon, Text, Card,
} from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import FireTools from '../../../../../../utils/FireTools';
import SelectMenu from '../../../../../../components/shared/SelectMenu';

const DefaultOptions = [
  { title: 'Join a group', screen: 'JoinGroupModal' },
  { title: 'Create a group', screen: 'OnlyCreateGroupModal' },
];
const UserOptions = [{ title: 'Leave Group', screen: 'LeaveGroupModal' }];
const PrimaryOptions = [
  { title: 'Assign new primary', screen: 'NewPrimaryModal' },
  { title: 'Remove roommate', screen: 'RemoveMateModal' },
  { title: 'Delete Group', screen: 'DeleteGroupModal' },
];

const GoodHeader = ({ closeModal }) => (
  <Header
    statusBarProps={{ backgroundColor: '#546054' }}
    backgroundColor="#5B725A"
    leftComponent={
      <Icon name="arrow-back" color="white" underlayColor="transparent" onPress={closeModal} />
    }
    centerComponent={{ text: 'Rent Group', style: { fontSize: 18, color: '#fff' } }}
  />
);

const RoommateView = ({ groupName, roommates }) => (
  <View>
    <Card title={`Group: ${groupName}`}>
      {roommates.map((member, i) => (
        <View style={styles.cardStyle} key={i}>
          <Text style={styles.memberText}>{member.first}</Text>
          {member.primary && <Icon name="verified-user" />}
        </View>
      ))}
    </Card>
  </View>
);

class RentGroupModal extends Component {
  state = {
    groupName: '',
    roommates: [],
    options: [],
  };

  componentDidMount = async () => {
    FireTools.init();
    await this.getPrimary();
    const groupName = await FireTools.getGroupName();
    this.setState({ groupName });
  };

  getPrimary = async () => {
    const roommates = await FireTools.getRoommates();
    if (roommates.length > 0) {
      let isPrimary = false;
      roommates.forEach(mate => {
        if (mate.uid === FireTools.user.uid) {
          isPrimary = mate.primary;
        }
      });

      if (isPrimary) {
        this.setState({ options: PrimaryOptions });
      } else {
        this.setState({ options: UserOptions });
      }
    } else {
      this.setState({ options: DefaultOptions });
    }
    this.setState({ roommates });
  };

  closeModal = () => Navigation.dismissModal(this.props.componentId);

  openOptionModal = screen => {
    Navigation.showModal({
      component: {
        name: screen,
        passProps: {
          onFinish: () => this.getPrimary(),
        },
        options: {
          animationType: 'slide-up',
        },
      },
    });
  };

  render() {
    const { groupName, roommates, options } = this.state;
    return (
      <View style={styles.container}>
        <GoodHeader closeModal={this.closeModal} />
        <RoommateView groupName={groupName} roommates={roommates} />
        <SelectMenu title="Options" onItemPress={this.openOptionModal} options={options} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cardStyle: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  memberText: { fontSize: 20 },
});

export default RentGroupModal;
