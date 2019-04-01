import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text, Divider } from "react-native-elements";

import ActivityItem from "./ActivityItem";

const ItemFlatList = ({
  activities,
  addLike,
  onItemSelect,
  onRefresh,
  refreshing,
  onLoadMore
}) => (
  <FlatList
    windowSize={10}
    ListEmptyComponent={<EmptyActivityFeed />}
    initialNumToRender={5}
    onEndReached={onLoadMore}
    onEndReachedThreshold={0.2}
    onRefresh={onRefresh}
    refreshing={refreshing}
    data={activities}
    renderItem={({ item, index }) => (
      <ActivityItem
        item={item}
        addLike={() => addLike(index, item.key)}
        onLongPress={() => onItemSelect(index, item.key, item.created_by)}
      />
    )}
  />
);

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
  openOverlay,
  onLoadMore
}) => (
  <ItemFlatList
    onLoadMore={onLoadMore}
    onRefresh={onRefresh}
    refreshing={refreshing}
    activities={activities}
    addLike={addLike}
    onItemSelect={openOverlay}
  />
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
