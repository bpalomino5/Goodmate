/* eslint react/no-array-index-key: 0
 */
import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Header, Icon, Text, Divider } from 'react-native-elements';

const GoodHeader = ({ toggleDrawer, openReminderModal }) => (
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
    centerComponent={{ text: 'Reminders', style: { fontSize: 18, color: '#fff' } }}
    rightComponent={
      <Icon
        name="plus"
        type="feather"
        color="white"
        underlayColor="transparent"
        onPress={openReminderModal}
      />
    }
  />
);

const ReminderList = ({ reminders }) => (
  <ScrollView>
    {reminders.map((item, i) => (
      <ReminderItem
        key={i}
        title={item.type}
        subtitle={item.title}
        isBill={item.type === 'Bill'}
        onPress={() => console.log('i')}
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
  static navigatorStyle = {
    navBarHidden: true,
    statusBarColor: '#5B725A',
  };

  constructor(props) {
    super(props);
    this.state = {
      reminders: [
        { type: 'Bill', title: 'Monthly Rent' },
        { type: 'Bill', title: 'Bryan Payment' },
        { type: 'Chore', title: 'Clean the dishes' },
      ],
    };

    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.openReminderModal = this.openReminderModal.bind(this);
  }

  onNavigatorEvent(event) {
    if (event.type === 'DeepLink') {
      if (event.link !== 'goodmate.Reminders') {
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

  openReminderModal() {
    this.props.navigator.showModal({
      screen: 'goodmate.AddReminderModal',
      animationType: 'slide-up',
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <GoodHeader toggleDrawer={this.toggleDrawer} openReminderModal={this.openReminderModal} />
        <ReminderList reminders={this.state.reminders} />
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
