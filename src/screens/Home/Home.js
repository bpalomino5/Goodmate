/* eslint class-methods-use-this:0 */
import React, { Component } from 'react';
import { StyleSheet, View, YellowBox } from 'react-native';
// tools
import { Navigation } from 'react-native-navigation';
import { toggleDrawer } from '../../components/navigation';
// components
import Header from './components/Header';
import ItemOverlay from './components/ItemOverlay';
import ActivityList from './components/Activity/ActivityList';
import { auth, db } from '../../firebase';

YellowBox.ignoreWarnings(['relay:check']);

class Home extends Component {
  state = {
    activities: [],
    isVisible: false,
    aid: null,
    refreshing: false,
    creator: false,
  };

  componentDidMount = async () => {
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

  openActivityModal = () => {
    Navigation.showModal({
      component: {
        name: 'ActivityModal',
        options: {
          animationType: 'slide-up',
        },
        passProps: {
          onFinish: () => this.onRefresh(),
        },
      },
    });
  };

  addLike = async aid => {
    await db.addLikeToActivity(aid);
    await this.updateActivities();
  };

  openOverlay = (aid, uid) => {
    this.setState({ aid, creator: auth.isAuthUser(uid), isVisible: true });
  };

  removeItem = async () => {
    const { aid } = this.state;
    await db.removeActivity(aid);
    await this.updateActivities();
    this.setState({ isVisible: false });
  };

  render() {
    const { componentId } = this.props;
    const {
      refreshing, activities, creator, isVisible, headerVisible,
    } = this.state;
    return (
      <View style={styles.container}>
        <Header
          toggleDrawer={() => toggleDrawer(componentId)}
          openActivityModal={this.openActivityModal}
          isVisible={headerVisible}
        />
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
          closeOverlay={() => this.setState({ isVisible: false })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#E3E1DE',
  },
});

export default Home;
