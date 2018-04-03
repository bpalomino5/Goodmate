import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';

const GoodHeader = ({ toggleDrawer }) => (
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
    centerComponent={{ text: 'Rents', style: { fontSize: 18, color: '#fff' } }}
  />
);

export default class Rents extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    statusBarColor: '#5B725A',
  };

  constructor(props) {
    super(props);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.type === 'DeepLink') {
      if (event.link !== 'goodmate.Rents') {
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

  render() {
    return (
      <View style={styles.container}>
        <GoodHeader toggleDrawer={this.toggleDrawer} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
