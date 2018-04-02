/* eslint react/no-array-index-key: 0 */
import React, { Component } from 'react';
import { Header, Icon, CheckBox, Button } from 'react-native-elements';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

const data = [
  {
    value: 'Banana',
  },
  {
    value: 'Mango',
  },
  {
    value: 'Pear',
  },
];

export default class ActivityModal extends Component {
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
        <Header
          statusBarProps={{ backgroundColor: '#5B725A' }}
          backgroundColor="#5B725A"
          leftComponent={
            <Icon
              name="arrow-back"
              color="white"
              underlayColor="transparent"
              onPress={this.closeModal}
            />
          }
          centerComponent={{ text: 'Activity', style: { fontSize: 18, color: '#fff' } }}
          rightComponent={
            <Button
              title="Post"
              buttonStyle={{ backgroundColor: 'transparent' }}
            />
          }
        />
        <View style={styles.InputSection}>
          <ScrollView>
            {this.state.activities.map((item, i) => (
              <View key={i} style={styles.SelectionRow}>
                <CheckBox
                  containerStyle={{ alignSelf: 'flex-end' }}
                  checked={this.state.activities[i].checked}
                  onIconPress={() => this.updateItem(i)}
                />
                <View style={{ flex: 1 }}>
                  <Dropdown label="Favorite Fruit" data={data} />
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.ButtonSection}>
          <Button
            title="Add"
            buttonStyle={{ width: 80, borderRadius: 20 }}
            onPress={() =>
              this.setState({ activities: [...this.state.activities, { checked: false }] })
            }
          />
          <Button
            title="Remove"
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
