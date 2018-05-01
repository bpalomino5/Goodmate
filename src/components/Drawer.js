/* eslint class-methods-use-this: 0
    react/no-array-index-key: 0
*/
import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import firebase from 'react-native-firebase';
import { Navigation } from 'react-native-navigation';
import { Avatar, Text, ListItem, Button } from 'react-native-elements';
import FireTools from '../utils/FireTools';

// Drawer Sections List
const list = [
  {
    title: 'Home',
    icon: 'home',
    type: 'material',
    screen: 'goodmate.Home',
  },
  {
    title: 'Rents',
    icon: 'file-document-box',
    type: 'material-community',
    screen: 'goodmate.Rent',
  },
  {
    title: 'Reminders',
    icon: 'calendar-clock',
    type: 'material-community',
    screen: 'goodmate.Reminders',
  },
  {
    title: 'Settings',
    icon: 'settings',
    type: 'material',
    screen: 'goodmate.Settings',
  },
];

export default class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    this.logout = this.logout.bind(this);
    this.openScreen = this.openScreen.bind(this);
  }

  componentWillMount() {
    FireTools.init();
    this.setState({ name: FireTools.user.displayName });
  }

  logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        Navigation.startSingleScreenApp({
          screen: {
            screen: 'goodmate.Login',
            title: 'Login',
            navigatorStyle: {
              navBarHidden: true,
            },
          },
        });
      })
      .catch(error => {
        console.log(error.code, error.message);
      });
  }

  toggleDrawer() {
    this.props.navigator.toggleDrawer({
      side: 'left',
      animated: true,
    });
  }

  openScreen(s) {
    this.toggleDrawer();
    this.props.navigator.handleDeepLink({
      link: s,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Avatar
            medium
            rounded
            icon={{ name: 'user', type: 'font-awesome' }}
            activeOpacity={0.7}
          />
          <Text style={{ paddingLeft: 10, fontSize: 20, color: 'white' }}>{this.state.name}</Text>
        </View>
        <View style={{ paddingBottom: 15 }}>
          {list.map((item, i) => (
            <ListItem
              key={i}
              containerStyle={{ backgroundColor: '#3A3837' }}
              title={item.title}
              topDivider
              bottomDivider
              titleStyle={{ color: 'white' }}
              leftIcon={{ name: item.icon, type: item.type, color: 'white' }}
              hideChevron
              onPress={() => this.openScreen(item.screen)}
            />
          ))}
        </View>
        <Button
          containerStyle={{ flex: 0, alignItems: 'center' }}
          buttonStyle={styles.logoutButton}
          onPress={this.logout}
          title="Logout "
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 280,
    backgroundColor: '#3A3837',
    paddingTop: Platform.OS === 'ios' ? 30 : 15,
  },
  profileContainer: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  logoutButton: {
    borderRadius: 20,
    height: 40,
    width: 150,
    backgroundColor: 'rgba(92, 99,216, 1)',
  },
});
