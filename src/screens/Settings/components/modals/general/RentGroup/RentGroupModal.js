/* eslint react/no-array-index-key: 0 */
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Text, Card } from "react-native-elements";
import { Navigation } from "react-native-navigation";
import { db, auth } from "../../../../../../firebase";
import SelectMenu from "../../../../../../components/shared/SelectMenu";
import ModalHeader from "../../../../../../components/shared/ModalHeader";

const DefaultOptions = [
  { title: "Join a group", screen: "JoinGroupModal" },
  { title: "Create a group", screen: "OnlyCreateGroupModal" }
];
const UserOptions = [{ title: "Leave Group", screen: "LeaveGroupModal" }];
const PrimaryOptions = [
  { title: "Assign new primary", screen: "NewPrimaryModal" },
  { title: "Remove roommate", screen: "RemoveMateModal" },
  { title: "Delete Group", screen: "DeleteGroupModal" }
];

const RoommateView = ({ groupName, roommates }) => (
  <View>
    <Card title={`Group: ${groupName}`}>
      {roommates.map((member, i) => (
        <View style={styles.cardStyle} key={i}>
          <Text style={styles.memberText}>{member.name}</Text>
          {member.primary && <Icon name="verified-user" />}
        </View>
      ))}
    </Card>
  </View>
);

class RentGroupModal extends Component {
  state = {
    groupName: "",
    roommates: [],
    options: []
  };

  componentDidMount = async () => {
    await this.getPrimary();
    const groupName = await db.getGroupName();
    this.setState({ groupName });
  };

  getPrimary = async () => {
    const roommates = await db.getRoommates();
    if (roommates.length > 0) {
      let isPrimary = false;
      roommates.forEach(mate => {
        if (auth.isAuthUser(mate.uid)) {
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
          onFinish: () => this.getPrimary()
        },
        options: {
          animationType: "slide-up"
        }
      }
    });
  };

  render() {
    const { groupName, roommates, options } = this.state;
    return (
      <View style={styles.container}>
        <ModalHeader
          text="Rent Group"
          leftComponent={
            <Icon
              name="arrow-back"
              color="white"
              underlayColor="transparent"
              onPress={this.closeModal}
            />
          }
        />
        <RoommateView groupName={groupName} roommates={roommates} />
        <SelectMenu
          title="Options"
          onItemPress={this.openOptionModal}
          options={options}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  cardStyle: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10
  },
  memberText: { fontSize: 20 }
});

export default RentGroupModal;
