/* eslint react/no-array-index-key: 0 */
import React, { Component } from "react";
import { Icon, Text, CheckBox, Input } from "react-native-elements";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { Navigation } from "react-native-navigation";
import { auth, db } from "../../../../firebase";
import ModalHeader from "../../../shared/modal-header";

const data = [
  {
    value: "Cleaned the bathroom"
  },
  {
    value: "Cleaned the kitchen"
  },
  {
    value: "Cleaned the floors"
  },
  {
    value: "Took out the trash"
  },
  {
    value: "Washed the dishes"
  },
  {
    value: "Bought more kitchen items"
  },
  {
    value: "Fed the Dog/Cat/Pet"
  }
];

const GoodButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View>
      <Text style={{ fontSize: 18, color: "white" }}>Post</Text>
    </View>
  </TouchableOpacity>
);

const ActivityCheckBox = ({ title, checked, onPress }) => (
  <CheckBox
    checkedColor="#8E967C"
    title={title}
    checked={checked}
    onPress={onPress}
  />
);

const OptionsSelector = ({ options, onSelected }) => (
  <View>
    {options.map((item, i) => (
      <ActivityCheckBox
        title={item.value}
        key={i}
        checked={item.checked}
        onPress={() => onSelected(i)}
      />
    ))}
  </View>
);

const CustomActivityInput = ({ onChangeText, value }) => (
  <View style={styles.customActivity}>
    <Input
      label="Write your own"
      placeholder="Custom Activity"
      maxLength={30}
      value={value}
      onChangeText={onChangeText}
    />
  </View>
);

class ActivityModal extends Component {
  state = {
    options: [],
    first: "",
    customValue: ""
  };

  componentDidMount = () => {
    const name = auth.getDisplayName().split(" ");
    const options = data.map(item => ({ ...item, checked: false }));
    this.setState({ first: name[0], options });
  };

  closeModal = () => Navigation.dismissModal(this.props.componentId);

  postActivities = async () => {
    const { options, first, customValue } = this.state;
    const selections = [];
    options.forEach(item => {
      if (item.checked) {
        selections.push(item.value);
      }
    });

    if (customValue.trim().length > 0) {
      selections.push(customValue.trim());
    }

    await db.addActivity({
      name: first,
      description: selections,
      likes: 0,
      time: new Date().getTime()
    });

    this.props.onFinish();
    this.closeModal();
  };

  onActivitySelect = index => {
    const options = [...this.state.options];
    options[index].checked = !options[index].checked;
    this.setState({ options });
  };

  render() {
    const { options, customValue } = this.state;
    return (
      <View style={styles.container}>
        <ModalHeader
          text="Share Activities"
          leftComponent={
            <Icon
              name="arrow-back"
              color="white"
              underlayColor="transparent"
              onPress={this.closeModal}
            />
          }
          rightComponent={<GoodButton onPress={this.postActivities} />}
        />
        <View style={styles.InputSection}>
          <View style={styles.headerText}>
            <Text h4>Select all your activities</Text>
          </View>
          <ScrollView>
            <OptionsSelector
              options={options}
              onSelected={this.onActivitySelect}
            />
            <CustomActivityInput
              value={customValue}
              onChangeText={text => this.setState({ customValue: text })}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  headerText: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 10,
    marginTop: 10
  },
  InputSection: {
    flex: 1,
    padding: 5
  },
  customActivity: {
    marginTop: 10
  }
});

export default ActivityModal;
