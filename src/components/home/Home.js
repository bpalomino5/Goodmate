/* eslint class-methods-use-this:0 */
import React, { Component } from "react";
import { StyleSheet, View, YellowBox } from "react-native";
// tools
import { Navigation } from "react-native-navigation";
import { toggleDrawer } from "../navigation";
// components
import Header from "../shared/header";
import ItemOverlay from "./components/ItemOverlay";
import ActivityList from "./components/ActivityList";
import { auth, db } from "../../firebase";
import { Icon } from "react-native-elements";

YellowBox.ignoreWarnings(["relay:check"]);

class Home extends Component {
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

  componentDidMount = () => {
    this.onLoadMore();
  };

  onRefresh = () => {
    this.setState({ refreshing: true, pastFirstLoad: false }, () =>
      this.onLoadMore()
    );
    this.setState({ refreshing: false });
  };

  onLoadMore = async () => {
    this.setState({ loadingMore: true });
    const { lastVisible, pastFirstLoad, activities } = this.state;
    let nextActivities = [];

    if (!pastFirstLoad) {
      nextActivities = await db.getActivities();
      this.setState({ pastFirstLoad: true });
    } else {
      nextActivities = await db.getActivities(lastVisible);
      const acts = [...activities, ...nextActivities];
      nextActivities = acts;
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

  openActivityModal = () => {
    Navigation.showModal({
      component: {
        name: "ActivityModal",
        options: {
          animationType: "slide-up"
        },
        passProps: {
          onFinish: () => this.onRefresh()
        }
      }
    });
  };

  addLike = async (index, aid) => {
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
    const { componentId } = this.props;
    const {
      refreshing,
      activities,
      creator,
      isVisible,
      loadingMore
    } = this.state;
    return (
      <View style={styles.container}>
        <Header
          toggleDrawer={() => toggleDrawer(componentId)}
          text="Home"
          rightComponent={
            <Icon
              name="pencil"
              type="entypo"
              color="white"
              underlayColor="transparent"
              onPress={this.openActivityModal}
            />
          }
        />
        <ActivityList
          loadingMore={loadingMore}
          onLoadMore={() => this.onLoadMore()}
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
  }
});

export default Home;
