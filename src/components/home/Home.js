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
    creator: false
  };

  componentDidMount = async () => {
    this.props.navigation.setParams({ modalDismiss: this.onRefresh });
    await this.onRefresh();
  };

  onRefresh = async () => {
    this.setState({ refreshing: true });
    // get data
    await this.updateActivities();
    this.setState({ refreshing: false });
  };

  updateActivities = async () => {
    const activities = await db.getActivities();
    if (activities) {
      this.setState({ activities });
    }
  };

  addLike = async aid => {
    await db.addLikeToActivity(aid);
    await this.updateActivities();
  };

  toggleOverlay = toggle => {
    this.setState({ isVisible: toggle });
  };

  openOverlay = (aid, uid) => {
    LayoutAnimation.easeInEaseOut();
    this.setState({ aid, creator: auth.isAuthUser(uid), isVisible: true });
  };

  removeItem = async () => {
    const { aid } = this.state;
    await db.removeActivity(aid);
    await this.updateActivities();
    this.setState({ isVisible: false });
  };

  render() {
    const { refreshing, activities, creator, isVisible } = this.state;
    return (
      <View style={styles.container}>
        <ActivityList
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
