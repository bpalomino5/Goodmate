import React from 'react';
import { ScrollView } from 'react-native';

import ReminderItem from './ReminderItem';

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

export default ReminderList;
