import React from "react";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { Text, Divider } from "react-native-elements";

const RenderFooter = loadingMore => {
  if (!loadingMore) return null;
  return (
    <View
      style={{
        position: "relative",
        marginTop: 10,
        marginBottom: 10
      }}
    >
      <ActivityIndicator animating size="large" />
    </View>
  );
};

const EmptyFeed = ({ title }) => (
  <View>
    <View style={styles.emptyfeed}>
      <Text h4>{title}</Text>
    </View>
    <Divider style={styles.divider} />
  </View>
);

const InfiniteList = ({
  emptyFeedTitle,
  renderItem,
  data,
  refreshing,
  onRefresh,
  onLoadMore,
  loadingMore,
  amount,
  threshold
}) => {
  return (
    <FlatList
      // bounces={false}
      windowSize={10}
      ListEmptyComponent={<EmptyFeed title={emptyFeedTitle} />}
      initialNumToRender={amount}
      onEndReached={onLoadMore}
      onEndReachedThreshold={threshold}
      onRefresh={onRefresh}
      refreshing={refreshing}
      data={data}
      renderItem={renderItem}
      ListFooterComponent={() => RenderFooter(loadingMore)}
    />
  );
};

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

export default InfiniteList;
