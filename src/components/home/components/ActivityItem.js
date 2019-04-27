import React from "react";
import { View, TouchableHighlight, StyleSheet, Platform } from "react-native";
import { Icon, Text, Divider } from "react-native-elements";

import "intl";
import "intl/locale-data/jsonp/en";

if (Platform.OS === "android") {
  Intl.__disableRegExpRestore();
}

const formatTime = t => {
  const today = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "short"
  });
  const date = new Date(t).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short"
  });

  const time = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(t);

  let formatted = `${date} at`;
  if (today === date) {
    formatted = `Today at`;
  }
  return `${formatted} ${time}`;
};

const ItemTitle = ({ title }) => <Text style={styles.nameStyle}>{title}</Text>;

const ItemTimeStamp = ({ time }) => {
  const formattedTime = formatTime(time);
  return (
    <View style={{ marginBottom: 5 }}>
      <Text style={{ fontSize: 13, color: "grey" }}>{formattedTime}</Text>
    </View>
  );
};

const ItemBody = ({ description }) => (
  <>
    {description.map(desc => (
      <Text style={styles.bodyText} key={desc}>
        {desc}
      </Text>
    ))}
  </>
);

const ItemDetails = ({ name, time, description }) => {
  return (
    <View style={{ flex: 3 }}>
      <ItemTitle title={name} />
      <ItemTimeStamp time={time} />
      <ItemBody description={description} />
    </View>
  );
};

const LikesView = ({ likes }) => (
  <View
    style={{
      flex: 1,
      justifyContent: "flex-start"
    }}
  >
    {likes > 0 && (
      <Text style={{ marginTop: 5 }}>
        {likes}
        &nbsp;likes
      </Text>
    )}
  </View>
);

const LikeButton = ({ likes, addLike }) => (
  <View
    style={{
      flex: 0,
      width: 60,
      alignItems: "center"
    }}
  >
    <Icon
      containerStyle={{
        flex: 1,
        justifyContent: "flex-end"
      }}
      name="thumbs-up"
      type="feather"
      onPress={addLike}
    />
    <LikesView likes={likes} />
  </View>
);

const ActivityItemContainer = ({ children, onLongPress }) => (
  <TouchableHighlight
    style={{ borderRadius: 10 }}
    activeOpacity={0.3}
    onLongPress={onLongPress}
    underlayColor="lightgray"
  >
    <View style={styles.row}>{children}</View>
  </TouchableHighlight>
);

const ActivityItem = ({ item, addLike, onLongPress }) => (
  <View>
    <ActivityItemContainer onLongPress={onLongPress}>
      <ItemDetails
        name={item.name}
        time={item.time}
        description={item.description}
      />
      <LikeButton likes={item.likes} addLike={addLike} />
    </ActivityItemContainer>
    <Divider
      style={{
        backgroundColor: "grey",
        height: 1,
        marginLeft: 10,
        marginRight: 10
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 15,
    marginBottom: 1
  },
  nameStyle: {
    fontSize: 22,
    color: "black"
  },
  bodyText: {
    color: "black"
  }
});

export default ActivityItem;
