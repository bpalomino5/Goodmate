/* eslint react/no-array-index-key: 0 */
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Icon, Text, Card, ListItem } from 'react-native-elements';
import FireTools from '../../../utils/FireTools';

const DefaultOptions = [
  { title: 'Join a group', screen: 'goodmate.JoinGroupModal' },
  { title: 'Create a group', screen: 'goodmate.OnlyCreateGroupModal' },
];
const UserOptions = [{ title: 'Leave Group', screen: 'goodmate.LeaveGroupModal' }];
const PrimaryOptions = [
  { title: 'Assign new primary', screen: 'goodmate.NewPrimaryModal' },
  { title: 'Remove roommate', screen: 'goodmate.RemoveMateModal' },
  { title: 'Delete Group', screen: 'goodmate.DeleteGroupModal' },
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

const RoommateView = ({
  groupName, roommates, options, onItemPress,
}) => (
  <View>
    <Card title={`Group: ${groupName}`}>
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
          <Text style={{ fontSize: 20 }}>{member.first}</Text>
          {member.primary && <Icon name="verified-user" />}
        </View>
      ))}
    </Card>
    <Card title="Options">
      {options.map((item, i) => (
        <ListItem
          key={i}
          title={item.title}
          hideChevron
          titleContainerStyle={{ marginLeft: 0 }}
          onPress={() => onItemPress(item.screen)}
        />
      ))}
    </Card>
  </View>
);

export default class RentGroupModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
      roommates: [],
      options: [],
    };
    this.closeModal = this.closeModal.bind(this);
  }

  async componentWillMount() {
    FireTools.init();
    await this.getPrimary();
    const groupName = await FireTools.getGroupName();
    this.setState({ groupName });
  }

  async getPrimary() {
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
  }

  closeModal() {
    this.props.navigator.dismissModal({
      animationType: 'slide-down',
    });
  }

  openOptionModal(screen) {
    this.props.navigator.showModal({
      screen,
      animationType: 'slide-up',
      navigatorStyle: {
        navBarHidden: true,
        statusBarColor: '#546054',
      },
      passProps: {
        onFinish: () => this.getPrimary(),
      },
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <GoodHeader closeModal={this.closeModal} />
        <RoommateView
          groupName={this.state.groupName}
          roommates={this.state.roommates}
          onItemPress={screen => this.openOptionModal(screen)}
          options={this.state.options}
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
