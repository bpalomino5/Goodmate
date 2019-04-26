import React, { Component } from "react";
import { Text, CheckBox, Input } from "react-native-elements";
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import { auth, db } from "../../../../firebase";
import { Header } from "react-navigation";

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

const PostButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ marginRight: 10 }}>
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
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Share Activities      ",
      headerRight: <PostButton onPress={navigation.getParam("post")} />
    };
  };

  state = {
    options: [],
    first: "",
    customValue: ""
  };

  componentDidMount = () => {
    const name = auth.getDisplayName().split(" ");
    const options = data.map(item => ({ ...item, checked: false }));
    this.setState({ first: name[0], options });

    this.props.navigation.setParams({ post: this.postActivities });
  };

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

    this.props.navigation.state.params.onModalDismiss();
    this.props.navigation.goBack();
  };

  onActivitySelect = index => {
    const options = [...this.state.options];
    options[index].checked = !options[index].checked;
    this.setState({ options });
  };

  render() {
    const { options, customValue } = this.state;
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={Header.HEIGHT + 64}
      >
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
      </KeyboardAvoidingView>
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
    marginTop: 10,
    flex: 1
  }
});

export default ActivityModal;
