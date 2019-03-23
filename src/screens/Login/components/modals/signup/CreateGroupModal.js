import React, { Component } from 'react';
import { View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { Text, Input, Button } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import { db } from '../../../../../firebase';

const options = [{ value: 'Create a roommate group' }, { value: 'Join a group' }];

export default class CreateGroupModal extends Component {
  state = {
    name: '',
    errorMessage: null,
    selection: 0,
    isLoading: false,
  };

  closeModal = () => Navigation.dismissModal(this.props.componentId);

  createGroup = async () => {
    this.setState({ isLoading: true });
    const { name } = this.state;
    if (name.trim() === '') {
      this.setState({ isLoading: false, errorMessage: 'Please enter a group name' });
      this.groupInput.shake();
    } else {
      // create new group
      await db.createUser();
      await db.createGroup(name);
      // close modal
      this.setState({ isLoading: false });
      this.closeModal();
    }
  };

  joinGroup = async () => {
    this.setState({ isLoading: true });
    const { name } = this.state;
    if (name.trim() === '') {
      this.setState({ isLoading: false, errorMessage: 'Please enter a group name' });
      this.groupInput.shake();
    } else {
      await db.createUser();
      const success = await db.addUsertoGroup(name);
      this.setState({ isLoading: false });
      if (success) {
        this.props.navigator.dismissAllModals({
          animationType: 'slide-down',
        });
      } else {
        // did not join group
        this.groupInput.shake();
      }
    }
  };

  handleSelection = i => {
    this.setState({ errorMessage: null, selection: i });
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
      >
        <View style={{ flex: 0, padding: 15, marginTop: 30 }}>
          <Text style={{ fontSize: 18, marginBottom: 30 }}>
            Goodmate users can organize themselves into groups! Groups are essential for dividing
            monthly rent and chores
          </Text>
          <Text>Please select an option</Text>
          <Dropdown
            label="Options"
            data={options}
            value={options[0].value}
            containerStyle={{ width: 230 }}
            onChangeText={(v, i) => this.handleSelection(i)}
          />
          <View style={{ marginTop: 10 }}>
            <Text>Group name</Text>
            <Input
              ref={input => {
                this.groupInput = input;
              }}
              value={this.state.name}
              onChangeText={name => this.setState({ name })}
              placeholder="Anonymous Llamas"
              errorMessage={this.state.errorMessage}
            />
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 20 }}>
          <Button
            containerStyle={{ flex: 0, alignSelf: 'center' }}
            title="DONE  "
            buttonStyle={{
              backgroundColor: 'rgba(92, 99,216, 1)',
              width: 300,
              height: 45,
              borderColor: 'transparent',
              borderWidth: 0,
              borderRadius: 5,
            }}
            loading={this.state.isLoading}
            disabled={this.state.isLoading}
            onPress={this.state.selection === 0 ? () => this.createGroup() : () => this.joinGroup()}
          />
        </View>
      </View>
    );
  }
}
