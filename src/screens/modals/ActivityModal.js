/* eslint react/no-array-index-key: 0 */
import React, { Component } from 'react';
import { Header, Icon, CheckBox, Button, Text } from 'react-native-elements';
import { StyleSheet, View, ScrollView, LayoutAnimation, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import FireTools from '../../utils/FireTools';

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

const GoodHeader = ({ closeModal, onPost }) => (
  <Header
    statusBarProps={{ backgroundColor: '#5B725A' }}
    backgroundColor="#5B725A"
    leftComponent={
      <Icon name="arrow-back" color="white" underlayColor="transparent" onPress={closeModal} />
    }
    centerComponent={{ text: 'Share Activities', style: { fontSize: 18, color: '#fff' } }}
    rightComponent={<GoodButton onPress={onPost} />}
  />
);

const GoodButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View>
      <Text style={{ fontSize: 18, color: 'white' }}>Post</Text>
    </View>
  </TouchableOpacity>
);

const ActivitySelectionList = ({ activities, updateItem, updateValue }) =>
  activities.map((item, i) => (
    <ActivitySelection
      key={i}
      i={i}
      updateItem={() => updateItem(i)}
      activities={activities}
      updateValue={value => updateValue(i, value)}
    />
  ));

const ActivitySelection = ({
  activities, updateItem, i, updateValue,
}) => (
  <View style={styles.SelectionRow}>
    <CheckBox
      containerStyle={{ alignSelf: 'flex-end' }}
      checked={activities[i].checked}
      onIconPress={() => updateItem(i)}
    />
    <View style={{ flex: 1 }}>
      <Dropdown
        label="Activity"
        data={data}
        animationDuration={150}
        onChangeText={value => updateValue(value)}
      />
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
      activities: [{ checked: false, description: '' }],
      first: '',
    };

    this.closeModal = this.closeModal.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.postActivities = this.postActivities.bind(this);
  }

  componentWillMount() {
    FireTools.init();
    const name = FireTools.user.displayName.split(' ');
    this.setState({ first: name[0] });
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

  updateValue(i, value) {
    this.state.activities[i].description = value;
    this.forceUpdate();
  }

  addItem() {
    LayoutAnimation.easeInEaseOut();
    this.setState({ activities: [...this.state.activities, { checked: false, description: '' }] });
  }

  removeItem() {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      activities: this.state.activities.filter((_, i) => i !== this.state.activities.length - 1),
    });
  }

  async postActivities() {
    const { activities, first } = this.state;
    const selections = [];
    activities.forEach(item => {
      if (item.checked) {
        selections.push(item.description);
      }
    });

    // get time
    const date = new Date();
    const time = date.getTime();

    const activity = {
      name: first,
      description: selections,
      likes: 0,
      time,
    };
    await FireTools.addActivity(activity);
    this.closeModal();
  }

  render() {
    return (
      <View style={styles.container}>
        <GoodHeader closeModal={this.closeModal} onPost={this.postActivities} />
        <View style={styles.InputSection}>
          <ScrollView>
            <ActivitySelectionList
              activities={this.state.activities}
              updateItem={i => this.updateItem(i)}
              updateValue={(i, v) => this.updateValue(i, v)}
            />
          </ScrollView>
        </View>
        <View style={styles.ButtonSection}>
          <Button
            title="Add "
            buttonStyle={{ width: 100, borderRadius: 30, height: 40 }}
            onPress={this.addItem}
          />
          <Button
            title="Remove "
            buttonStyle={{ borderRadius: 30, width: 100, height: 40 }}
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
    backgroundColor: 'white',
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
