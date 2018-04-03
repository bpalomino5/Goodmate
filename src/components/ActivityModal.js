/* eslint react/no-array-index-key: 0 */
import React, { Component } from 'react';
import { Header, Icon, CheckBox, Button } from 'react-native-elements';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

const data = [
  {
    value: 'Cleaned the bathroom',
  },
  {
    value: 'Cleaned the kitchen',
  },
  {
    value: 'Vacuumed the floors',
  },
  {
    value: 'Took out the trash',
  },
  {
    value: 'Bought more dish soap',
  },
  {
    value: 'Washed the dishes',
  },
  {
    value: 'Bought more sponges',
  },
];

const GoodHeader = ({ closeModal }) => (
  <Header
    statusBarProps={{ backgroundColor: '#5B725A' }}
    backgroundColor="#5B725A"
    leftComponent={
      <Icon name="arrow-back" color="white" underlayColor="transparent" onPress={closeModal} />
    }
    centerComponent={{ text: 'Share Activities', style: { fontSize: 18, color: '#fff' } }}
    rightComponent={
      <Button title="Post " buttonStyle={{ backgroundColor: 'grey', borderRadius: 30 }} />
    }
  />
);

const ActivitySelectionList = ({ activities, updateItem }) => (
  activities.map((item, i) => (
    <ActivitySelection
      key={i}
      i={i}
      updateItem={() => updateItem(i)}
      activities={activities}
    />
  ))
);

const ActivitySelection = ({ activities, updateItem, i }) => (
  <View style={styles.SelectionRow}>
    <CheckBox
      containerStyle={{ alignSelf: 'flex-end' }}
      checked={activities[i].checked}
      onIconPress={() => updateItem(i)}
    />
    <View style={{ flex: 1 }}>
      <Dropdown label="Activity" data={data} />
    </View>
  </View>
);

export default class ActivityModal extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    statusBarColor: '#5B725A',
  };

  constructor(props) {
    super(props);
    this.state = {
      activities: [{ checked: false }],
    };

    this.closeModal = this.closeModal.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  closeModal() {
    this.props.navigator.dismissModal({
      animationType: 'slide-down',
    });
  }

  updateItem(i) {
    this.state.activities[i].checked = !this.state.activities[i].checked;
    this.forceUpdate();
  }

  removeItem() {
    this.setState({
      activities: this.state.activities.filter((_, i) => i !== this.state.activities.length - 1),
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <GoodHeader closeModal={this.closeModal} />
        <View style={styles.InputSection}>
          <ScrollView>
            <ActivitySelectionList
              activities={this.state.activities}
              updateItem={(i) => this.updateItem(i)}
            />
          </ScrollView>
        </View>
        <View style={styles.ButtonSection}>
          <Button
            title="Add "
            buttonStyle={{ width: 80, borderRadius: 20 }}
            onPress={() =>
              this.setState({ activities: [...this.state.activities, { checked: false }] })
            }
          />
          <Button
            title="Remove "
            buttonStyle={{ borderRadius: 20, paddingLeft: 2, paddingRight: 2 }}
            onPress={this.removeItem}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3E1DE',
  },
  InputSection: {
    flex: 1,
  },
  SelectionRow: {
    flex: 0,
    flexDirection: 'row',
    padding: 5,
  },
  ButtonSection: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
