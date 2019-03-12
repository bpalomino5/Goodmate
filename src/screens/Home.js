/* eslint class-methods-use-this:0 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  RefreshControl,
} from 'react-native';
import { Header, Icon, Text, Overlay, Button } from 'react-native-elements';
import FireTools from '../utils/FireTools';
import { Navigation } from 'react-native-navigation';
import { toggleDrawer } from '../components/navigation'

function formatTime(t) {
  const today = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });
  const date = new Date(t).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });
  const time = new Date(t).toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  let formatted = `${date} at `;
  if (today === date) {
    formatted = 'Today at ';
  }
  return `${formatted}${time}`;
}

const GoodHeader = ({ toggleDrawer, openActivityModal }) => (
  <Header
    statusBarProps={{ backgroundColor: '#546054' }}
    backgroundColor="#5B725A"
    leftComponent={
      <Icon
        name="menu"
        type="Feather"
        color="white"
        underlayColor="transparent"
        onPress={toggleDrawer}
      />
    }
    centerComponent={{ text: 'Home', style: { fontSize: 18, color: '#fff' } }}
    rightComponent={
      <Icon
        name="pencil"
        type="entypo"
        color="white"
        underlayColor="transparent"
        onPress={openActivityModal}
      />
    }
  />
);

const ItemOverlay = ({
  isVisible, closeOverlay, deleteItem, isCreator,
}) => (
  <Overlay
    borderRadius={5}
    overlayStyle={{ margin: 20 }}
    isVisible={isVisible}
    width="auto"
    height="auto"
  >
    <View>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Options</Text>
      <View style={{ flexDirection: 'row' }}>
        {isCreator && (
          <Button
            title="Delete "
            onPress={deleteItem}
            containerStyle={{ marginRight: 10 }}
            buttonStyle={{
              backgroundColor: 'rgba(92, 99,216, 1)',
            }}
          />
        )}
        <Button
          title="Close "
          onPress={closeOverlay}
          buttonStyle={{
            backgroundColor: 'rgba(92, 99,216, 1)',
          }}
        />
      </View>
    </View>
  </Overlay>
);

const ActivityFeed = ({ activities, addLike, onItemSelect }) =>
  activities.map(item => (
    <ActivityItem
      key={item.key}
      item={item}
      addLike={() => addLike(item.key)}
      onLongPress={() => onItemSelect(item.key, item.created_by)}
    />
  ));

const ActivityItem = ({ item, addLike, onLongPress }) => (
  <TouchableWithoutFeedback onLongPress={onLongPress}>
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={styles.nameStyle}>{item.name}</Text>
        <View style={{ marginBottom: 5 }}>
          <Text style={{ fontSize: 13, color: 'grey' }}>{formatTime(item.time)}</Text>
        </View>
        {item.description.map(desc => <Text key={desc}>{desc}</Text>)}
      </View>
      <View style={{ alignSelf: 'center' }}>
        <Icon name="thumbs-up" type="feather" onPress={addLike} />
        {item.likes > 0 && <Text style={{ marginTop: 5 }}>{item.likes} likes</Text>}
      </View>
    </View>
  </TouchableWithoutFeedback>
);

const EmptyActivityFeed = () => (
  <View style={styles.emptyfeed}>
    <Text h4>Upcoming activities!</Text>
  </View>
);

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      isVisible: false,
      aid: null,
      refreshing: false,
      creator: false,
    };

    this.openActivityModal = this.openActivityModal.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    FireTools.init();
    this.onRefresh()
  }

  onRefresh() {
    this.setState({ refreshing: true });
    // get data
    this.updateActivities().then(() => {
      this.setState({ refreshing: false });
    });
  }

  async updateActivities() {
    const activities = await FireTools.getActivities();
    if (activities) {
      this.setState({ activities });
    }
  }

  openActivityModal() {
    Navigation.showModal({
      component: {
        name: 'goodmate.ActivityModal',
        options: {
          animationType: 'slide-up',
        },
      },
    });
  }

  async addLike(aid) {
    await FireTools.addLikeToActivity(aid);
    await this.updateActivities();
  }

  openOverlay(aid, uid) {
    this.setState({ aid, creator: uid === FireTools.user.uid, isVisible: true });
  }

  async removeItem() {
    const { aid } = this.state;
    await FireTools.removeActivity(aid);
    await this.updateActivities();
    this.setState({ isVisible: false });
  }

  render() {
    return (
      <View style={styles.container}>
        <GoodHeader
          toggleDrawer={() => toggleDrawer(this.props.componentId)}
          openActivityModal={this.openActivityModal}
          isVisible={this.state.headerVisible}
        />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
          }
        >
          {this.state.activities.length > 0 ? (
            <ActivityFeed
              activities={this.state.activities}
              addLike={key => this.addLike(key)}
              onItemSelect={(aid, uid) => this.openOverlay(aid, uid)}
            />
          ) : (
            <EmptyActivityFeed />
          )}
        </ScrollView>
        <ItemOverlay
          isCreator={this.state.creator}
          isVisible={this.state.isVisible}
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
    backgroundColor: '#E3E1DE',
  },
  row: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
  },
  emptyfeed: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 15,
  },
  nameStyle: {
    fontSize: 22,
  },
});
