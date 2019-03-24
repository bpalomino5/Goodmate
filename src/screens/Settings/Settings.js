/* eslint react/no-array-index-key: 0 */
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import { toggleDrawer } from '../../components/navigation';
import SelectMenu from '../../components/shared/SelectMenu';

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
    statusBarProps={{ barStyle: 'light-content' }}
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

class Settings extends Component {
  openModal = screen => {
    Navigation.showModal({
      component: {
        name: screen,
        options: {
          animationType: 'slide-up',
        },
      },
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <GoodHeader toggleDrawer={() => toggleDrawer(this.props.componentId)} />
        <SelectMenu title="Profile" options={profileItems} onItemPress={this.openModal} />
        <SelectMenu title="General" options={generalItems} onItemPress={this.openModal} />
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

export default Settings;
