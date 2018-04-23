import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';
import { Header, Icon, Text } from 'react-native-elements';

const GoodHeader = ({ toggleDrawer, openActivityModal }) => (
  <Header
    statusBarProps={{ backgroundColor: '#5B725A' }}
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
        name="plus"
        type="feather"
        color="white"
        underlayColor="transparent"
        onPress={openActivityModal}
      />
    }
  />
);

const ActivityFeed = ({ activities, addLike }) =>
  activities.map(item => (
    <ActivityItem key={item.key} item={item} addLike={() => addLike(item.key)} />
  ));

const ActivityItem = ({ item, addLike }) => (
  <View style={styles.row}>
    <View style={{ flex: 1 }}>
      <Text style={styles.nameStyle}>{item.name}</Text>
      {item.description.map(desc => <Text key={desc}>{desc}</Text>)}
    </View>
    <View style={{ alignSelf: 'center' }}>
      <Icon name="thumbs-up" type="feather" onPress={addLike} />
      {item.likes > 0 && <Text style={{ marginTop: 5 }}>{item.likes} likes</Text>}
    </View>
  </View>
);

const EmptyActivityFeed = () => (
  <View style={styles.emptyfeed}>
    <Text h4>Upcoming activities!</Text>
  </View>
);

export default class Home extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    statusBarColor: '#5B725A',
  };

  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      groupId: '',
    };

    this.usersRef = firebase.firestore().collection('users');
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.openActivityModal = this.openActivityModal.bind(this);
  }

  componentWillMount() {
    this.updateActivities();
  }

  onNavigatorEvent(event) {
    if (event.type === 'DeepLink') {
      if (event.link !== 'goodmate.Home') {
        this.props.navigator.resetTo({
          screen: event.link,
        });
      }
    }
    if (event.id === 'willAppear') {
      this.updateActivities();
    }
  }

  updateActivities() {
    const user = firebase.auth().currentUser;
    const activities = [];
    this.usersRef
      .doc(user.uid)
      .get()
      .then(snapshot => {
        const groupRef = snapshot.get('groupRef');
        if (groupRef) {
          this.setState({ groupId: `groups/${snapshot.get('groupRef').id}` });
          groupRef
            .collection('activities')
            .orderBy('time', 'desc')
            .get()
            .then(snap => {
              snap.forEach(doc => {
                const activity = doc.data();
                activity.key = doc.id;
                activities.push(activity);
              });
              this.setState({ activities });
            });
        }
      });
  }

  toggleDrawer() {
    this.props.navigator.toggleDrawer({
      side: 'left',
      animated: true,
    });
  }

  openActivityModal() {
    this.props.navigator.showModal({
      screen: 'goodmate.ActivityModal',
      animationType: 'slide-up',
      passProps: { groupId: this.state.groupId },
    });
  }

  addLike(key) {
    const user = firebase.auth().currentUser;
    this.usersRef
      .doc(user.uid)
      .get()
      .then(snapshot => {
        const groupRef = snapshot.get('groupRef');
        if (groupRef) {
          const activityRef = groupRef.collection('activities').doc(key);
          activityRef.get().then(doc => {
            let likes = 0;
            likes = doc.get('likes');
            activityRef.update({
              likes: likes + 1,
            });
          });
        }
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <GoodHeader toggleDrawer={this.toggleDrawer} openActivityModal={this.openActivityModal} />
        <ScrollView>
          {this.state.activities.length > 0 ? (
            <ActivityFeed activities={this.state.activities} addLike={key => this.addLike(key)} />
          ) : (
            <EmptyActivityFeed />
          )}
        </ScrollView>
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
    backgroundColor: '#F5FCFF',
    padding: 15,
  },
  nameStyle: {
    fontSize: 22,
  },
});
