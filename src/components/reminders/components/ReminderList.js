import React from "react";
import ReminderItem from "./ReminderItem";
import InfiniteList from "../../shared/infinite-list";

const ReminderList = ({
  reminders,
  onItemPress,
  onRefresh,
  refreshing,
  onLoadMore,
  loadingMore
}) => (
  <InfiniteList
    amount={1}
    threshold={0.01}
    emptyFeedTitle="Upcoming Reminders!"
    onLoadMore={onLoadMore}
    onRefresh={onRefresh}
    refreshing={refreshing}
    data={reminders}
    renderItem={({ item }) => (
      <ReminderItem
        title={item.type}
        subtitle={item.title}
        isBill={item.type === "Bill"}
        onPress={() => onItemPress(item)}
      />
    )}
    loadingMore={loadingMore}
  />
);

export default ReminderList;
