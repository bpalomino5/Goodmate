import React from 'react';
import { Header, Icon } from 'react-native-elements';

const ReminderHeader = ({ toggleDrawer, openReminderModal }) => (
  <Header
    statusBarProps={{ backgroundColor: '#546054', barStyle: 'light-content' }}
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

export default ReminderHeader;
