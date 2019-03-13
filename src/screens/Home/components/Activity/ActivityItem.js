import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Icon, Text } from 'react-native-elements';

formatTime = t => {
  const today = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });
  const date = new Date(t).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });
  const time = new Date(t).toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  let formatted = `${date} at `;
  if (today === date) {
    formatted = 'Today at ';
  }
  return `${formatted}${time}`;
};

const ActivityItem = ({ item, addLike, onLongPress }) => (
  <TouchableWithoutFeedback onLongPress={onLongPress}>
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={styles.nameStyle}>{item.name}</Text>
        <View style={{ marginBottom: 5 }}>
          <Text style={{ fontSize: 13, color: 'grey' }}>{formatTime(item.time)}</Text>
        </View>
        {item.description.map(desc => (
          <Text key={desc}>{desc}</Text>
        ))}
      </View>
      <View style={{ alignSelf: 'center' }}>
        <Icon name="thumbs-up" type="feather" onPress={addLike} />
        {item.likes > 0 && (
        <Text style={{ marginTop: 5 }}>
          {item.likes}
          {' '}
likes
        </Text>
        )}
      </View>
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
  },
  nameStyle: {
    fontSize: 22,
  },
});

export default ActivityItem;
