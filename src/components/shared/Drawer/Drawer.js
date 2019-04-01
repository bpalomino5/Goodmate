/* eslint class-methods-use-this: 0
    react/no-array-index-key: 0
*/
import React, { Component } from "react";
import { Platform, StyleSheet, View } from "react-native";
import firebase from "react-native-firebase";
import { Navigation } from "react-native-navigation";
import { Avatar, Text, ListItem, Button } from "react-native-elements";
import { goToLogin } from "../../navigation";
import { auth } from "../../../firebase";

// Drawer Sections List
const list = [
  {
    title: "Home",
    icon: "home",
    type: "material",
    screen: "Home"
  },
  {
    title: "Rents",
    icon: "file-document-box",
    type: "material-community",
    screen: "Rent"
  },
  {
    title: "Reminders",
    icon: "calendar-clock",
    type: "material-community",
    screen: "Reminders"
  },
  {
    title: "Settings",
    icon: "settings",
    type: "material",
    screen: "Settings"
  }
];

class Drawer extends Component {
  state = { name: "" };

  componentDidMount = () => {
    this.setState({ name: auth.getDisplayName() });
  };

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
          visible: false
        }
      }
    });
  };

  goToScreen = screen => {
    Navigation.setStackRoot("Stack", {
      component: {
        name: screen,
        options: {
          topBar: {
            visible: false,
            height: 0
          }
        }
      }
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
            icon={{ name: "user", type: "font-awesome" }}
            activeOpacity={0.7}
          />
          <Text style={{ paddingLeft: 10, fontSize: 20, color: "white" }}>
            {name}
          </Text>
        </View>
        <View style={{ paddingBottom: 15 }}>
          {list.map((item, i) => (
            <ListItem
              key={i}
              containerStyle={{ backgroundColor: "#1F2D1E" }}
              title={item.title}
              titleStyle={{ color: "white" }}
              leftIcon={{ name: item.icon, type: item.type, color: "white" }}
              hideChevron
              onPress={() => this.openScreen(item.screen)}
            />
          ))}
        </View>
        <View style={styles.logoutContainer}>
          <Button
            buttonStyle={styles.logoutButton}
            onPress={this.logout}
            title="Logout"
            titleStyle={{ color: "black" }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 280,
    backgroundColor: "#1F2D1E",
    paddingTop: Platform.OS === "ios" ? 30 : 15
  },
  profileContainer: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    padding: 10
  },
  logoutButton: {
    height: 40,
    width: 150,
    backgroundColor: "lightgray"
  },
  logoutContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingLeft: 20,
    paddingBottom: 25
  }
});

export default Drawer;
