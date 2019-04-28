import React, { Component } from "react";
import { StyleSheet, View, LayoutAnimation } from "react-native";
// components
import ItemOverlay from "./components/ItemOverlay";
import ActivityList from "./components/ActivityList";
import { auth, db } from "../../firebase";
import { Icon } from "react-native-elements";
import Layout from "../../../constants/Layout";

class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Home   ",
      headerBackTitle: null,
      headerRight: (
        <Icon
          containerStyle={{ marginRight: 10 }}
          name="pencil"
          type="entypo"
          color="white"
          underlayColor="transparent"
          onPress={() =>
            navigation.navigate("ActivityModal", {
              onModalDismiss: navigation.getParam("modalDismiss")
            })
          }
        />
      )
    };
  };

  state = {
    activities: [],
    isVisible: false,
    aid: null,
    refreshing: false,
    creator: false,
    lastVisible: null,
    pastFirstLoad: false,
    index: null,
    loadingMore: false
  };

  componentDidMount = async () => {
    const { navigation } = this.props;
    navigation.setParams({ modalDismiss: this.onRefresh });
    await this.onLoadMore();
  };

  onLoadMore = async () => {
    this.setState({ loadingMore: true });
    const { lastVisible, pastFirstLoad, activities } = this.state;
    if (activities.length > 0 && activities.length < 15) {
      this.setState({ loadingMore: false });
      return;
    }
    let nextActivities = [];

    if (!pastFirstLoad) {
      nextActivities = await db.getActivities();
      this.setState({ pastFirstLoad: true });
    } else {
      nextActivities = await db.getActivities(lastVisible);
      const totalActivities = [...activities, ...nextActivities];
      nextActivities = totalActivities;
    }

    if (nextActivities.length > 0) {
      const nextLastVisible = nextActivities[nextActivities.length - 1].time;
      this.setState({
        activities: nextActivities,
        lastVisible: nextLastVisible
      });
    }
    this.setState({ loadingMore: false });
  };

  onRefresh = async () => {
    this.setState({ refreshing: true, pastFirstLoad: false }, () =>
      this.onLoadMore()
    );
    this.setState({ refreshing: false });
  };

  addLike = async (aid, index) => {
    await db.addLikeToActivity(aid);
    // add visually
    this.setState(prevState => ({
      activities: prevState.activities.map((activity, i) => {
        if (i === index) {
          activity.likes += 1;
        }
        return activity;
      })
    }));
  };

  toggleOverlay = toggle => {
    this.setState({ isVisible: toggle });
  };

  openOverlay = (index, aid, uid) => {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      index,
      aid,
      creator: auth.isAuthUser(uid),
      isVisible: true
    });
  };

  removeItem = async () => {
    const { aid, index } = this.state;
    await db.removeActivity(aid);
    // remove visually
    this.setState(prevState => ({
      activities: prevState.activities.filter((act, i) => i !== index),
      isVisible: false
    }));
  };

  render() {
    const {
      refreshing,
      activities,
      creator,
      isVisible,
      loadingMore
    } = this.state;
    return (
      <View style={styles.container}>
        <ActivityList
          loadingMore={loadingMore}
          onLoadMore={this.onLoadMore}
          refreshing={refreshing}
          onRefresh={this.onRefresh}
          openOverlay={this.openOverlay}
          activities={activities}
          addLike={this.addLike}
          onItemSelect={this.openOverlay}
        />
        <ItemOverlay
          isCreator={creator}
          isVisible={isVisible}
          deleteItem={this.removeItem}
          closeOverlay={() => this.toggleOverlay(false)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    position: "absolute",
    top: 0,
    left: 0,
    width: Layout.window.width,
    height: Layout.window.height
  }
});

export default Home;
