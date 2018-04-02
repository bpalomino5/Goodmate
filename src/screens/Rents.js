import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Icon, Text } from 'react-native-elements';

export default class Rents extends Component {
  static navigatorStyle = {
    navBarHidden: true,
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
        <Header
          statusBarProps={{ backgroundColor: '#5B725A' }}
          backgroundColor="#5B725A"
          leftComponent={
            <Icon
              name="menu"
              type="Feather"
              color="white"
              underlayColor="transparent"
              onPress={this.toggleDrawer}
            />
          }
          centerComponent={{ text: 'Rents', style: { fontSize: 18, color: '#fff' } }}
        />
        <Text> textInComponent </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
