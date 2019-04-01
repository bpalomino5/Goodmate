/* eslint react/no-array-index-key:0 */
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Icon } from "react-native-elements";
import { Navigation } from "react-native-navigation";
import { auth, db } from "../../../../firebase";

import RentSheet from "./RentSheet";
import InfoOverlay from "./InfoOverlay";
import AssignmentOverlay from "./AssignmentOverlay";
import ModalHeader from "../../../shared/modal-header";

const SubmitButton = ({ onPress }) => (
  <View style={styles.SubmitSection}>
    <Button
      containerStyle={styles.buttonContainer}
      title="Submit "
      buttonStyle={styles.submitButton}
      onPress={onPress}
    />
  </View>
);

class FinishRentModal extends Component {
  state = {
    main: [],
    utilities: [],
    isVisible: false,
    roommates: [],
    dataItem: {},
    infoVisible: false
  };

  componentDidMount = async () => {
    const { main, utilities } = this.props;
    const roommates = await db.getRoommates();
    this.setState({ main, utilities, roommates });
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

  closeModal = () => Navigation.dismissModal(this.props.componentId);

  submitRent = async () => {
    const { main, utilities } = this.state;
    const { date, onFinish } = this.props;

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
      // delete item.removable;
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

      // delete item.removable;
      return { ...item, value };
    });

    await db.submitRent({
      base: _main,
      bills: _utilities,
      totals,
      date
    });
    // // post activity
    const { editing } = this.props;
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

    onFinish();
    Navigation.dismissAllModals();
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
    return (
      <View style={styles.container}>
        <ModalHeader
          text="Assign & Finish"
          leftComponent={
            <Icon
              name="arrow-back"
              color="white"
              underlayColor="transparent"
              onPress={this.closeModal}
            />
          }
          rightComponent={
            <Icon
              name="info"
              type="feather"
              color="white"
              underlayColor="transparent"
              onPress={() => this.displayInfoOverlay(true)}
            />
          }
        />
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
    flex: 1,
    backgroundColor: "white"
  },
  SubmitSection: {
    flex: 0,
    padding: 10
  },
  buttonContainer: {
    marginTop: 20,
    flex: 0,
    alignSelf: "center"
  },
  submitButton: {
    width: 300,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  }
});

export default FinishRentModal;
