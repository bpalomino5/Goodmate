/* eslint react/no-array-index-key: 0
 */
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import FireTools from '../../utils/FireTools';
import { toggleDrawer } from '../../components/navigation';

import Header from './components/Header';
import ReminderList from './components/reminder/ReminderList';

class Reminders extends Component {
  state = {
    reminders: [],
  };

  componentDidMount = async () => {
    await FireTools.init();
    await this.getReminders();
  };

  getReminders = async () => {
    const reminders = await FireTools.getReminders();
    if (reminders) {
      this.setState({ reminders });
    }
  };

  openReminderModal = () => {
    Navigation.showModal({
      component: {
        name: 'AddReminderModal',
        passProps: {
          onFinish: this.getReminders,
        },
        options: {
          animationType: 'slide-up',
        },
      },
    });
  };

  handleItemPress = item => {
    Navigation.showModal({
      component: {
        name: 'AddReminderModal',
        passProps: {
          item,
          onFinish: this.getReminders,
        },
        options: {
          animationType: 'slide-up',
        },
      },
    });
  };

  render() {
    const { componentId } = this.props;
    const { reminders } = this.state;
    return (
      <View style={styles.container}>
        <Header
          toggleDrawer={() => toggleDrawer(componentId)}
          openReminderModal={this.openReminderModal}
        />
        <ReminderList reminders={reminders} onItemPress={this.handleItemPress} />
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

export default Reminders;
