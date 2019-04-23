import React, { Component } from "react";
import { StyleSheet, View, LayoutAnimation } from "react-native";
import { Icon, Button } from "react-native-elements";
// import { Navigation } from "react-native-navigation";

import RentSheet from "./RentSheet";
import AddOverlay from "./AddOverlay";
// import ModalHeader from "../../../shared/modal-header";

const NextButton = ({ onPress }) => (
  <View style={styles.SubmitSection}>
    <Button
      containerStyle={{ alignSelf: "center" }}
      title="Next "
      buttonStyle={styles.nextButton}
      onPress={onPress}
    />
  </View>
);

class AddRentModal extends Component {
  state = {
    isAddOverlay: false,
    main: [],
    utilities: [],
    dataItem: {},
    group: "main",
    isEditing: false
  };

  componentDidMount = () => {
    // const { main, utilities } = this.props;
    // this.setState({ main, utilities });
  };

  //   closeModal = () => Navigation.dismissModal(this.props.componentId);

  toggleOverlay = open => {
    this.setState({ isAddOverlay: open });
  };

  openFinishModal = () => {
    const { main, utilities } = this.state;
    const { date, editing, onFinish } = this.props;

    Navigation.showModal({
      component: {
        name: "FinishRentModal",
        passProps: {
          main,
          utilities,
          date,
          editing,
          onFinish
        },
        options: {
          animationType: "slide-up"
        }
      }
    });
  };

  addItem = () => {
    const {
      dataItem: { section, value, type },
      group
    } = this.state;

    LayoutAnimation.easeInEaseOut();
    this.setState(prevState => ({
      [group]: [
        ...prevState[group],
        {
          section,
          type,
          value,
          uids: {}
        }
      ]
    }));

    this.toggleOverlay(false);
  };

  removeItem = () => {
    const { index, group } = this.state;
    LayoutAnimation.easeInEaseOut();
    this.setState(prevState => ({
      [group]: prevState[group].filter((_, i) => i !== index),
      isAddOverlay: false
    }));
  };

  openAddOverlay = () => {
    this.toggleOverlay(true);
    this.setState({
      dataItem: {
        section: "",
        type: "",
        value: "",
        uids: {}
      },
      isEditing: false
    });
  };

  openEditOverlay = (index, name) => {
    const { main, utilities } = this.state;
    if (name === "main") {
      this.setState({ dataItem: main[index], index, group: "main" });
    } else {
      this.setState({ dataItem: utilities[index], index, group: "utilities" });
    }
    this.setState({ isEditing: true, isAddOverlay: true });
  };

  onChangeText = (text, type) => {
    const { dataItem } = this.state;
    if (type === "group") {
      this.setState({ group: text });
    } else {
      dataItem[type] = text;
      this.setState({ dataItem });
    }
  };

  render() {
    const {
      isAddOverlay,
      main,
      utilities,
      dataItem,
      isEditing,
      group
    } = this.state;
    return (
      <View style={styles.container}>
        {/* <ModalHeader
          text="Create Rent Sheet"
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
              name="add"
              color="white"
              underlayColor="transparent"
              onPress={this.openAddOverlay}
            />
          }
        /> */}
        <RentSheet
          main={main}
          utilities={utilities}
          onItemPress={this.openEditOverlay}
        />
        <NextButton onPress={this.openFinishModal} />
        <AddOverlay
          isEditing={isEditing}
          isVisible={isAddOverlay}
          group={group}
          onAdd={this.addItem}
          onRemove={this.removeItem}
          onClose={() => this.toggleOverlay(false)}
          dataItem={dataItem}
          onChangeText={this.onChangeText}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  InputSection: {
    flex: 1
  },
  SubmitSection: {
    flex: 0,
    padding: 10,
    marginTop: 0,
    backgroundColor: "white"
  },
  nextButton: {
    width: 300,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  }
});

export default AddRentModal;
