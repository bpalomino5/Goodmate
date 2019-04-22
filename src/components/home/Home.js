import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
// components
import ItemOverlay from "./components/ItemOverlay";
import ActivityList from "./components/ActivityList";
// import { auth, db } from "../../firebase";
import { Icon } from "react-native-elements";

class Home extends Component {
  static navigationOptions = {
    title: "Home   ",
    headerRight: (
      <Icon
        name="pencil"
        type="entypo"
        color="white"
        underlayColor="transparent"
        onPress={this.openActivityModal}
      />
    )
  };

  state = {
    activities: [],
    isVisible: false,
    aid: null,
    refreshing: false,
    creator: false
  };

  componentDidMount = async () => {
    // await this.onRefresh();
  };

  onRefresh = async () => {
    // this.setState({ refreshing: true });
    // // get data
    // await this.updateActivities();
    // this.setState({ refreshing: false });
  };

  updateActivities = async () => {
    // const activities = await db.getActivities();
    // if (activities) {
    //   this.setState({ activities });
    // }
  };

  openActivityModal = () => {
    // Navigation.showModal({
    //   component: {
    //     name: "ActivityModal",
    //     options: {
    //       animationType: "slide-up"
    //     },
    //     passProps: {
    //       onFinish: () => this.onRefresh()
    //     }
    //   }
    // });
  };

  addLike = async aid => {
    // await db.addLikeToActivity(aid);
    // await this.updateActivities();
  };

  toggleOverlay = toggle => {
    this.setState({ isVisible: toggle });
  };

  openOverlay = (aid, uid) => {
    // this.setState({ aid, creator: auth.isAuthUser(uid), isVisible: true });
  };

  removeItem = async () => {
    // const { aid } = this.state;
    // await db.removeActivity(aid);
    // await this.updateActivities();
    // this.setState({ isVisible: false });
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
  }
});

export default Home;
