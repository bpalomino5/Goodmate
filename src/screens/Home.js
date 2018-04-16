import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';
import { Header, Icon, Text } from 'react-native-elements';

const list = [
  {
    name: 'Brandon',
    description: 'Cleaned the dishes',
    key: 'blah',
  },
  {
    name: 'Bryan',
    description: 'Watched youtube while doing homework',
    key: 'heyyah',
  },
  {
    name: 'CJ',
    description: 'Took out the trash',
    key: 'yesman',
  },
];

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

const ActivityFeed = () => list.map(item => <ActivityItem key={item.key} item={item} />);

const ActivityItem = ({ item }) => (
  <View style={styles.row}>
    <View style={{ flex: 1 }}>
      <Text style={styles.nameStyle}>{item.name}</Text>
      <Text>{item.description}</Text>
    </View>
    <Icon name="thumbs-up" type="feather" onPress={() => console.log('hi')} />
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
    this.unsubscriber = null;
    this.ref = firebase.firestore().collection('users');

    // this.addUser = this.addUser.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.openActivityModal = this.openActivityModal.bind(this);
  }

  onNavigatorEvent(event) {
    if (event.type === 'DeepLink') {
      if (event.link !== 'goodmate.Home') {
        this.props.navigator.resetTo({
          screen: event.link,
        });
      }
    }
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
    });
  }

  // addUser() {
  //   this.ref.add({
  //     username: this.state.name,
  //   });

  //   this.setState({ name: '' });
  // }

  render() {
    return (
      <View style={styles.container}>
        <GoodHeader toggleDrawer={this.toggleDrawer} openActivityModal={this.openActivityModal} />
        <ScrollView>{list.length > 0 ? <ActivityFeed /> : <EmptyActivityFeed />}</ScrollView>
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
