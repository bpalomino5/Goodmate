/* eslint react/no-array-index-key: 0
 */
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Navigation } from "react-native-navigation";
import { toggleDrawer } from "../navigation";
import { Icon } from "react-native-elements";

import Header from "../shared/header";
import ReminderList from "./components/ReminderList";
import { db } from "../../firebase";

class Reminders extends Component {
  state = {
    reminders: [],
    refreshing: false,
    loadingMore: false,
    lastVisible: null,
    pastFirstLoad: false
  };

  componentDidMount = () => {
    this.onLoadMore();
  };

  onRefresh = () => {
    this.setState({ refreshing: true, pastFirstLoad: false }, () =>
      this.onLoadMore()
    );
    this.setState({ refreshing: false });
  };

  onLoadMore = async () => {
    console.log("calling ONLOADMORE");
    this.setState({ loadingMore: true });
    const { lastVisible, pastFirstLoad, reminders } = this.state;
    let nextReminders = [];

    if (!pastFirstLoad) {
      nextReminders = await db.getReminders();
      this.setState({ pastFirstLoad: true });
    } else {
      nextReminders = await db.getReminders(lastVisible);
      const rmndrs = [...reminders, ...nextReminders];
      nextReminders = rmndrs;
    }

    if (nextReminders.length > 0) {
      const nextLastVisible = nextReminders[nextReminders.length - 1].date;
      this.setState({
        reminders: nextReminders,
        lastVisible: nextLastVisible
      });
    }
    this.setState({ loadingMore: false });
  };

  openReminderModal = () => {
    this.setState({ pastFirstLoad: false });
    Navigation.showModal({
      component: {
        name: "AddReminderModal",
        passProps: {
          onFinish: this.onLoadMore
        },
        options: {
          animationType: "slide-up"
        }
      }
    });
  };

  handleItemPress = item => {
    this.setState({ pastFirstLoad: false });
    Navigation.showModal({
      component: {
        name: "AddReminderModal",
        passProps: {
          item,
          onFinish: this.onLoadMore
        },
        options: {
          animationType: "slide-up"
        }
      }
    });
  };

  render() {
    const { componentId } = this.props;
    const { reminders, refreshing, loadingMore } = this.state;
    return (
      <View style={styles.container}>
        <Header
          toggleDrawer={() => toggleDrawer(componentId)}
          text="Reminders"
          rightComponent={
            <Icon
              name="calendar-plus"
              type="material-community"
              color="white"
              underlayColor="transparent"
              onPress={this.openReminderModal}
            />
          }
        />
        <ReminderList
          refreshing={refreshing}
          onRefresh={this.onRefresh}
          reminders={reminders}
          onItemPress={this.handleItemPress}
          onLoadMore={this.onLoadMore}
          loadingMore={loadingMore}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});

export default Reminders;
