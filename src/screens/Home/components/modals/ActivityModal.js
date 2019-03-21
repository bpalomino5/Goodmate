/* eslint react/no-array-index-key: 0 */
import React, { Component } from 'react';
import {
  Header, Icon, Text, CheckBox,
} from 'react-native-elements';
import {
  StyleSheet, View, ScrollView, TouchableOpacity,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import FireTools from '../../../../utils/FireTools';

const data = [
  {
    value: 'Cleaned the bathroom',
    checked: false,
  },
  {
    value: 'Cleaned the kitchen',
    checked: false,
  },
  {
    value: 'Vacuumed the floors',
    checked: false,
  },
  {
    value: 'Took out the trash',
    checked: false,
  },
  {
    value: 'Bought more dish soap',
    checked: false,
  },
  {
    value: 'Washed the dishes',
    checked: false,
  },
  {
    value: 'Bought more sponges',
    checked: false,
  },
];

const GoodHeader = ({ closeModal, onPost }) => (
  <Header
    statusBarProps={{ backgroundColor: '#546054' }}
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

const ActivityCheckBox = ({ title, checked, onPress }) => (
  <CheckBox title={title} checked={checked} onPress={onPress} />
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

class ActivityModal extends Component {
  state = {
    options: [],
    first: '',
  };

  componentDidMount = () => {
    FireTools.init();
    const name = FireTools.user.displayName.split(' ');
    this.setState({ first: name[0], options: data });
  };

  closeModal = () => Navigation.dismissModal(this.props.componentId);

  postActivities = async () => {
    const { options, first } = this.state;
    const selections = [];
    options.forEach(item => {
      if (item.checked) {
        selections.push(item.value);
      }
    });

    const activity = {
      name: first,
      description: selections,
      likes: 0,
      time: new Date().getTime(),
      created_by: FireTools.user.uid,
    };
    await FireTools.addActivity(activity);
    this.setState({ options: data });
    this.closeModal();
  };

  onActivitySelect = index => {
    const options = [...this.state.options];
    options[index].checked = !options[index].checked;
    this.setState({ options });
  };

  render() {
    const { options } = this.state;
    return (
      <View style={styles.container}>
        <GoodHeader closeModal={this.closeModal} onPost={this.postActivities} />
        <View style={styles.InputSection}>
          <View style={styles.headerText}>
            <Text h4>Select every activity you did!</Text>
          </View>
          <ScrollView>
            <OptionsSelector options={options} onSelected={this.onActivitySelect} />
          </ScrollView>
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
  headerText: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
    marginTop: 10,
  },
  InputSection: {
    flex: 1,
    padding: 5,
  },
});

export default ActivityModal;
