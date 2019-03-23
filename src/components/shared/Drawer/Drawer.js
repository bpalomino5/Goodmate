/* eslint class-methods-use-this: 0
    react/no-array-index-key: 0
*/
import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import firebase from 'react-native-firebase';
import { Navigation } from 'react-native-navigation';
import {
  Avatar, Text, ListItem, Button,
} from 'react-native-elements';
import { goToLogin } from '../../navigation';
import { auth } from '../../../firebase';

// Drawer Sections List
const list = [
  {
    title: 'Home',
    icon: 'home',
    type: 'material',
    screen: 'Home',
  },
  {
    title: 'Rents',
    icon: 'file-document-box',
    type: 'material-community',
    screen: 'Rent',
  },
  {
    title: 'Reminders',
    icon: 'calendar-clock',
    type: 'material-community',
    screen: 'Reminders',
  },
  {
    title: 'Settings',
    icon: 'settings',
    type: 'material',
    screen: 'Settings',
  },
];

export default class Drawer extends Component {
  state = { name: '' };

  componentDidMount() {
    this.setState({ name: auth.getDisplayName() });
  }

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        goToLogin();
      })
      .catch(error => {
        console.log(error.code, error.message);
      });
  };

  toggleDrawer = () => {
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        left: {
          visible: false,
        },
      },
    });
  };

  goToScreen = screen => {
    Navigation.setStackRoot('Stack', {
      component: {
        name: screen,
        options: {
          topBar: {
            visible: false,
            height: 0,
          },
        },
      },
    });
  };

  openScreen = screen => {
    this.toggleDrawer();
    this.goToScreen(screen);
  };

  render() {
    const { name } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Avatar
            medium
            rounded
            icon={{ name: 'user', type: 'font-awesome' }}
            activeOpacity={0.7}
          />
          <Text style={{ paddingLeft: 10, fontSize: 20, color: 'white' }}>{name}</Text>
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
