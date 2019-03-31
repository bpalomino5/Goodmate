import React from "react";
import { ScrollView, View, RefreshControl, StyleSheet } from "react-native";
import { Text, Divider } from "react-native-elements";

import ActivityItem from "./ActivityItem";

const ActivityFeed = ({ activities, addLike, onItemSelect }) =>
  activities.map(item => (
    <ActivityItem
      key={item.key}
      item={item}
      addLike={() => addLike(item.key)}
      onLongPress={() => onItemSelect(item.key, item.created_by)}
    />
  ));

const EmptyActivityFeed = () => (
  <View>
    <View style={styles.emptyfeed}>
      <Text h4>Upcoming activities!</Text>
    </View>
    <Divider style={{ backgroundColor: "grey", height: 1 }} />
  </View>
);

const ActivityList = ({
  refreshing,
  activities,
  onRefresh,
  addLike,
  openOverlay
}) => (
  <ScrollView
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
  >
    {activities.length > 0 ? (
      <ActivityFeed
        activities={activities}
        addLike={key => addLike(key)}
        onItemSelect={(aid, uid) => openOverlay(aid, uid)}
      />
    ) : (
      <EmptyActivityFeed />
    )}
  </ScrollView>
);

const styles = StyleSheet.create({
  emptyfeed: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 15
  }
});

export default ActivityList;
