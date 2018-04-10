/* eslint react/no-array-index-key: 0 */
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Icon, Text, Card, ListItem } from 'react-native-elements';

const profileItems = [
  { title: 'Edit profile', screen: 'goodmate.EditProfileModal' },
  { title: 'Change Password', screen: 'goodmate.ChangePasswordModal' },
];
const generalItems = [
  { title: 'Rent Group', screen: 'goodmate.RentGroupModal' },
  { title: 'Send feedback', screen: 'goodmate.FeedbackModal' },
];

const GoodHeader = ({ toggleDrawer }) => (
  <Header
    statusBarProps={{ backgroundColor: '#5B725A' }}
    backgroundColor="#5B725A"
    leftComponent={
      <Icon
        name="menu"
        type="Feather"
        color="white"
        underlayColor="transparent"
        onPress={toggleDrawer}
      />
    }
    centerComponent={{ text: 'Settings', style: { fontSize: 18, color: '#fff' } }}
  />
);

const SettingsList = ({ onItemPress }) => (
  <View>
    <SettingCard
      sectionName="Profile"
      items={profileItems}
      onItemPress={screen => onItemPress(screen)}
    />
    <SettingCard
      sectionName="General"
      items={generalItems}
      onItemPress={screen => onItemPress(screen)}
    />
  </View>
);

const SettingCard = ({ sectionName, items, onItemPress }) => (
  <Card>
    <Text>{sectionName}</Text>
    {items.map((item, i) => (
      <ListItem
        key={i}
        title={item.title}
        hideChevron
        titleContainerStyle={{ marginLeft: -20 }}
        onPress={() => onItemPress(item.screen)}
      />
    ))}
  </Card>
);

export default class Settings extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    statusBarColor: '#5B725A',
  };

  constructor(props) {
    super(props);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.type === 'DeepLink') {
      if (event.link !== 'goodmate.Settings') {
        this.props.navigator.resetTo({
          screen: event.link,
        });
      }
    }
  }

  toggleDrawer() {
    this.props.navigator.toggleDrawer({
      side: 'left',
      animated: true,
    });
  }

  openModal = screen => {
    this.props.navigator.showModal({
      screen,
      navigatorStyle: {
        navBarHidden: true,
        statusBarColor: '#5B725A',
      },
      animationType: 'slide-up',
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <GoodHeader toggleDrawer={this.toggleDrawer} />
        <SettingsList onItemPress={screen => this.openModal(screen)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
});
