/* eslint react/no-array-index-key: 0
 */
import React, { Component } from 'react';
import {
  ScrollView, StyleSheet, View, TouchableOpacity,
} from 'react-native';
import {
  Header, Icon, Text, Divider,
} from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import FireTools from '../../utils/FireTools';
import { toggleDrawer } from '../../components/navigation';

const GoodHeader = ({ toggleDrawer, openReminderModal }) => (
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
    centerComponent={{ text: 'Reminders', style: { fontSize: 18, color: '#fff' } }}
    rightComponent={(
      <Icon
        name="calendar-plus"
        type="material-community"
        color="white"
        underlayColor="transparent"
        onPress={openReminderModal}
      />
)}
  />
);

const ReminderList = ({ reminders, onItemPress }) => (
  <ScrollView>
    {reminders.map((item, i) => (
      <ReminderItem
        key={i}
        title={item.type}
        subtitle={item.title}
        isBill={item.type === 'Bill'}
        onPress={() => onItemPress(item)}
      />
    ))}
  </ScrollView>
);

const ReminderItem = ({
  title, subtitle, isBill, onPress,
}) => (
  <View>
    <TouchableOpacity activeOpacity={0.3} onPress={onPress}>
      <View style={{ flex: 0, flexDirection: 'row', padding: 15 }}>
        <View style={{ marginRight: 10 }}>
          {isBill ? (
            <Icon
              name="dollar"
              type="font-awesome"
              size={22}
              containerStyle={{ marginLeft: 5, marginRight: 7 }}
            />
          ) : (
            <Icon name="broom" type="material-community" size={25} />
          )}
        </View>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 70, marginRight: 40 }}>
            <Text style={{ fontSize: 17, fontFamily: 'Avenir', marginRight: 15 }}>{title}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 15, color: 'gray' }}>{subtitle}</Text>
          </View>
          <Icon name="chevron-small-right" type="entypo" />
        </View>
      </View>
      <Divider style={{ backgroundColor: 'grey', height: 1 }} />
    </TouchableOpacity>
  </View>
);

export default class Reminders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reminders: [],
    };

    this.openReminderModal = this.openReminderModal.bind(this);
  }

  async componentDidMount() {
    FireTools.init();
    await this.getReminders();
  }

  async getReminders() {
    const reminders = await FireTools.getReminders();
    if (reminders) {
      this.setState({ reminders });
    }
  }

  openReminderModal() {
    Navigation.showModal({
      component: {
        name: 'goodmate.AddReminderModal',
        passProps: {
          onFinish: () => this.getReminders(),
        },
        options: {
          animationType: 'slide-up',
        },
      },
    });
  }

  handleItemPress = item => {
    Navigation.showModal({
      component: {
        name: 'goodmate.AddReminderModal',
        passProps: {
          item,
          onFinish: () => this.getReminders(),
        },
        options: {
          animationType: 'slide-up',
        },
      },
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <GoodHeader
          toggleDrawer={() => toggleDrawer(this.props.componentId)}
          openReminderModal={this.openReminderModal}
        />
        <ReminderList reminders={this.state.reminders} onItemPress={this.handleItemPress} />
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
