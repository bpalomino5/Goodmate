import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
// import { Navigation } from 'react-native-navigation';

class HelpButton extends Component {
  openHelpModal = () => {
    const { navigation } = this.props;
    navigation.navigate("HelpModal");
  };

  render() {
    return (
      <TouchableOpacity onPress={this.openHelpModal}>
        <View style={styles.helpContainer}>
          <Text style={{ color: "white", fontSize: 18 }}>Need help?</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  helpContainer: {
    height: 64,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default HelpButton;
