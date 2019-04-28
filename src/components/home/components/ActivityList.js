import React from "react";
import InfiniteList from "../../shared/infinite-list";
import ActivityItem from "./ActivityItem";

const ActivityList = ({
  refreshing,
  activities,
  onRefresh,
  addLike,
  openOverlay,
  onLoadMore,
  loadingMore
}) => (
  <InfiniteList
    amount={5}
    threshold={0.01}
    emptyFeedTitle="Upcoming Activities!"
    onLoadMore={onLoadMore}
    onRefresh={onRefresh}
    refreshing={refreshing}
    data={activities}
    renderItem={({ item, index }) => (
      <ActivityItem
        item={item}
        addLike={() => addLike(index, item.key)}
        onLongPress={() => openOverlay(index, item.key, item.created_by)}
      />
    )}
    loadingMore={loadingMore}
  />
);

export default ActivityList;
