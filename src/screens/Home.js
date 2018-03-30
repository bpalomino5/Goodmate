import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import firebase from 'react-native-firebase';
import { Header, Icon, Text } from 'react-native-elements';

const list = [
  {
    name: 'Brandon',
    description: 'Cleaned the dishes',
  },
  {
    name: 'Bryan',
    description: 'Watched youtube while doing homework',
  },
  {
    name: 'CJ',
    description: 'Took out the trash',
  },
];

export default class Home extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  constructor(props) {
    super(props);
    this.unsubscriber = null;
    this.ref = firebase.firestore().collection('users');
    this.state = {
      name: '',
    };

    this.addUser = this.addUser.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentWillMount() {
    // const user = firebase.auth().currentUser;
    // this.setState({ displayName: user.displayName });
  }

  onNavigatorEvent(event) {
    if (event.type === 'DeepLink') {
      if (event.link !== 'goodmate.Home') {
        this.props.navigator.push({
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

  addUser() {
    this.ref.add({
      username: this.state.name,
    });

    this.setState({ name: '' });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          statusBarProps={{ backgroundColor: '#5B725A' }}
          backgroundColor="#5B725A"
          leftComponent={
            <Icon
              name="menu"
              type="Feather"
              color="white"
              underlayColor="lightblue"
              onPress={this.toggleDrawer}
            />
          }
          centerComponent={{ text: 'Home', style: { fontSize: 18, color: '#fff' } }}
        />
        {list.length > 0 ? (
          list.map(item => (
            <View style={styles.row}>
              <View style={{ flex: 0 }}>
                <Text style={styles.nameStyle}>{item.name}</Text>
                <Text>{item.description}</Text>
              </View>
              <Icon
                name="thumbs-up"
                type="feather"
              />
            </View>
          ))
        ) : (
          <View style={styles.row}>
            <Text>Nothing yet</Text>
          </View>
        )}
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
    backgroundColor: '#F5FCFF',
    padding: 15,
    marginBottom: 10,
  },
  nameStyle: {
    fontSize: 22,
  },
});
