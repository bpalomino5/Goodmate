import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
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

const ItemTitle = ({ title }) => <Text style={styles.nameStyle}>{title}</Text>;

const ItemTimeStamp = ({ time }) => (
  <View style={{ marginBottom: 5 }}>
    <Text style={{ fontSize: 13, color: 'grey' }}>{formatTime(time)}</Text>
  </View>
);

const ItemBody = ({ description }) => (
  <>
    {description.map(desc => (
      <Text key={desc}>{desc}</Text>
    ))}
  </>
);

const ItemDetails = ({ name, time, description }) => (
  <View style={{ flex: 1 }}>
    <ItemTitle title={name} />
    <ItemTimeStamp time={time} />
    <ItemBody description={description} />
  </View>
);

const LikesView = ({ likes }) => (
  <>
    {likes > 0 && (
      <Text style={{ marginTop: 5 }}>
        {likes}
        &nbsp;likes
      </Text>
    )}
  </>
);

const LikeButton = ({ likes, addLike }) => (
  <View style={{ alignSelf: 'center' }}>
    <Icon name="thumbs-up" type="feather" onPress={addLike} />
    <LikesView likes={likes} />
  </View>
);

const ActivityItemContainer = ({ children, onLongPress }) => (
  <TouchableOpacity activeOpacity={0.3} onLongPress={onLongPress}>
    <View style={styles.row}>{children}</View>
  </TouchableOpacity>
);

const ActivityItem = ({ item, addLike, onLongPress }) => (
  <ActivityItemContainer onLongPress={onLongPress}>
    <ItemDetails name={item.name} time={item.time} description={item.description} />
    <LikeButton likes={item.likes} addLike={addLike} />
  </ActivityItemContainer>
);

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 1,
  },
  nameStyle: {
    fontSize: 22,
  },
});

export default ActivityItem;
