import React from "react";
import { ScrollView, View, StyleSheet, RefreshControl } from "react-native";
import { Text, Divider } from "react-native-elements";
import ReminderItem from "./ReminderItem";

const ReminderFeed = ({ reminders, onItemPress }) =>
  reminders.map((item, i) => (
    <ReminderItem
      key={i}
      title={item.type}
      subtitle={item.title}
      isBill={item.type === "Bill"}
      onPress={() => onItemPress(item)}
    />
  ));

const EmptyFeed = () => (
  <View>
    <View style={styles.emptyfeed}>
      <Text h4>Upcoming Reminders!</Text>
    </View>
    <Divider style={styles.divider} />
  </View>
);

const ReminderList = ({ reminders, onItemPress, onRefresh, refreshing }) => (
  <ScrollView
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
  >
    {reminders.length > 0 ? (
      <ReminderFeed reminders={reminders} onItemPress={onItemPress} />
    ) : (
      <EmptyFeed />
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
  },
  divider: { backgroundColor: "grey", height: 1 }
});

export default ReminderList;
