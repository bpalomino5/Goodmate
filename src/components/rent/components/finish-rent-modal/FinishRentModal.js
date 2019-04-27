import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Button, Icon } from "react-native-elements";
import { auth, db } from "../../../../firebase";

import RentSheet from "./RentSheet";
import InfoOverlay from "./InfoOverlay";
import AssignmentOverlay from "./AssignmentOverlay";

const SubmitButton = ({ onPress }) => (
  <View style={styles.SubmitSection}>
    <Button title="Submit " onPress={onPress} />
  </View>
);

class FinishRentModal extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Assign & Finish    ",
      headerBackTitle: null,
      headerRight: (
        <Icon
          containerStyle={{ marginRight: 10 }}
          name="info"
          type="feather"
          color="white"
          underlayColor="transparent"
          onPress={navigation.getParam("openInfoOverlay")}
        />
      )
    };
  };

  state = {
    main: [],
    utilities: [],
    isVisible: false,
    roommates: [],
    dataItem: {},
    infoVisible: false
  };

  componentDidMount = async () => {
    const { navigation } = this.props;
    let { main, utilities } = navigation.state.params.getBills();
    const roommates = await db.getRoommates();
    this.setState({ main, utilities, roommates });

    navigation.setParams({
      openInfoOverlay: () => this.displayInfoOverlay(true)
    });
  };

  onCheckPress = item => {
    const { dataItem } = this.state;
    // check if uids is already assigned
    if (item.name in dataItem.uids) {
      delete dataItem.uids[item.name];
    } else {
      dataItem.uids[item.name] = item.uid;
    }

    this.setState({ dataItem });
  };

  submitRent = async () => {
    const { main, utilities } = this.state;
    const { navigation } = this.props;
    const date = navigation.state.params.getDate();

    let _main = [];
    let _utilities = [];
    const totals = [];

    // strip removables from data and calc totals
    _main = main.map(item => {
      const value = parseFloat(item.value);
      const index = totals.findIndex(t => t.section === item.section);
      if (index === -1) {
        // not in totals, add to totals
        if (Object.keys(item.uids).length > 0) {
          // assigned, add to totals
          totals.push({ value, section: item.section });
        }
      } else {
        // in totals, update totals
        totals[index].value += value;
      }
      return { ...item, value };
    });

    _utilities = utilities.map(item => {
      const value = parseFloat(item.value);
      const index = totals.findIndex(t => t.section === item.section);
      if (index === -1) {
        if (Object.keys(item.uids).length > 0) {
          // assigned, add to totals
          totals.push({ value, section: item.section });
        }
      } else {
        totals[index].value += value;
      }
      return { ...item, value };
    });

    await db.submitRent({
      base: _main,
      bills: _utilities,
      totals,
      date
    });
    // post activity
    const editing = navigation.state.params.editing;
    const timestamp = new Date().getTime();
    const name = auth.getDisplayName().split(" ")[0];
    let detail = "";
    if (editing) {
      detail = `Edited Rent Sheet: ${date.month} ${date.year}`;
    } else {
      detail = `Added Rent Sheet: ${date.month} ${date.year}`;
    }
    await db.addActivity({
      description: [detail],
      likes: 0,
      name,
      time: timestamp
    });

    navigation.state.params.finishRent();
    navigation.popToTop();
  };

  openOverlay = (i, name) => {
    const { main, utilities } = this.state;
    if (name === "main") {
      this.setState({ dataItem: main[i] });
    } else {
      this.setState({ dataItem: utilities[i] });
    }
    this.setState({ isVisible: true });
  };

  toggleOverlay = toggle => this.setState({ isVisible: toggle });

  displayInfoOverlay = toggle => this.setState({ infoVisible: toggle });

  render() {
    const {
      isVisible,
      main,
      utilities,
      roommates,
      dataItem,
      infoVisible
    } = this.state;
    if (main.length === 0 && utilities.length === 0) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <RentSheet
          main={main}
          utilities={utilities}
          onItemPress={this.openOverlay}
        />
        <SubmitButton onPress={this.submitRent} />
        <AssignmentOverlay
          isVisible={isVisible}
          toggleOverlay={this.toggleOverlay}
          roommates={roommates}
          dataItem={dataItem}
          onCheckPress={this.onCheckPress}
        />
        <InfoOverlay
          isVisible={infoVisible}
          toggleOverlay={this.displayInfoOverlay}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  SubmitSection: {
    padding: 10
  }
});

export default FinishRentModal;
