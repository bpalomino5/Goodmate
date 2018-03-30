/* eslint class-methods-use-this: 0
    react/no-array-index-key: 0
*/
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import firebase from 'react-native-firebase';
import { Navigation } from 'react-native-navigation';
import { Avatar, Text, List, ListItem, Button } from 'react-native-elements';

// Drawer Sections List
const list = [
  {
    title: 'Home',
    icon: 'home',
  },
  {
    title: 'Rents',
    icon: 'folder',
  },
  {
    title: 'Reminders',
    icon: 'av-timer',
  },
  {
    title: 'Settings',
    icon: 'settings',
  },
];

export default class Drawer extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Avatar
            medium
            rounded
            icon={{ name: 'user', type: 'font-awesome' }}
            onPress={() => console.log('Works!')}
            activeOpacity={0.7}
          />
          <Text style={{ paddingLeft: 10, fontSize: 20, color: 'white' }}>Name</Text>
        </View>
        <List containerStyle={{ backgroundColor: '#3A3837', paddingBottom: 15 }}>
          {list.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              titleStyle={{ color: 'white' }}
              leftIcon={{ name: item.icon }}
              hideChevron
            />
          ))}
        </List>
        <Button
          buttonStyle={styles.logoutButton}
          onPress={this.logout}
          title="Logout"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3A3837',
    paddingTop: 30,
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
  },
});
