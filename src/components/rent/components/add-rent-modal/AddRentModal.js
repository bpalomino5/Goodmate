import React, { Component } from "react";
import { StyleSheet, View, LayoutAnimation } from "react-native";
import { Icon, Button } from "react-native-elements";

import RentSheet from "./RentSheet";
import AddOverlay from "./AddOverlay";

const NextButton = ({ onPress }) => (
  <View style={styles.SubmitSection}>
    <Button title="Next " onPress={onPress} />
  </View>
);

class AddRentModal extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Create Rent Sheet     ",
      headerBackTitle: null,
      headerRight: (
        <Icon
          containerStyle={{ marginRight: 10 }}
          name="add"
          color="white"
          underlayColor="transparent"
          onPress={navigation.getParam("openAddOverlay")}
        />
      )
    };
  };

  state = {
    isAddOverlay: false,
    main: [],
    utilities: [],
    dataItem: {},
    group: "main",
    isEditing: false
  };

  componentDidMount = () => {
    const { navigation } = this.props;
    let { main, utilities } = navigation.state.params.getBills();
    let editing = true;
    if (main.length === 0 && utilities.length === 0) {
      main.push({
        section: "",
        type: "",
        value: "",
        uids: {}
      });

      utilities.push({
        section: "",
        type: "",
        value: "",
        uids: {}
      });

      editing = false;
    }

    this.setState({ main, utilities });
    navigation.setParams({
      openAddOverlay: this.openAddOverlay,
      getBills: this.getBills,
      editing
    });
  };

  /**
   * Helper Function for Passing State to Modal
   */
  getBills = () => {
    const { main, utilities } = this.state;
    return { main, utilities };
  };

  toggleOverlay = open => {
    this.setState({ isAddOverlay: open });
  };

  openFinishModal = () => {
    const { navigation } = this.props;
    navigation.navigate("FinishRentModal", {
      getBills: navigation.getParam("getBills"),
      getDate: () => navigation.state.params.getDate(),
      editing: navigation.getParam("editing"),
      finishRent: () => navigation.state.params.finishRent()
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
  SubmitSection: {
    padding: 10
  }
});

export default AddRentModal;
