/* eslint react/no-array-index-key: 0 */
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Header, Icon, Text, Card, ListItem,
} from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import { toggleDrawer } from '../../components/navigation';

const profileItems = [
  { title: 'Edit profile', screen: 'EditProfileModal' },
  { title: 'Change Password', screen: 'ChangePasswordModal' },
];
const generalItems = [
  { title: 'Rent Group', screen: 'RentGroupModal' },
  { title: 'Send feedback', screen: 'FeedbackModal' },
];

const GoodHeader = ({ toggleDrawer }) => (
  <Header
    statusBarProps={{ backgroundColor: '#546054' }}
    backgroundColor="#5B725A"
    leftComponent={(
      <Icon
        name="menu"
        type="Feather"
        color="white"
        underlayColor="transparent"
        onPress={toggleDrawer}
      />
)}
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
        chevron
        titleContainerStyle={{ marginLeft: 0 }}
        onPress={() => onItemPress(item.screen)}
      />
    ))}
  </Card>
);

export default class Settings extends Component {
  openModal = screen => {
    Navigation.showModal({
      component: {
        name: screen,
        options: {
          animationType: 'slide-up',
        },
      },
    });
    // this.props.navigator.showModal({
    //   screen,
    //   navigatorStyle: {
    //     navBarHidden: true,
    //     statusBarColor: '#546054',
    //   },
    //   animationType: 'slide-up',
    // });
  };

  render() {
    return (
      <View style={styles.container}>
        <GoodHeader toggleDrawer={() => toggleDrawer(this.props.componentId)} />
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
