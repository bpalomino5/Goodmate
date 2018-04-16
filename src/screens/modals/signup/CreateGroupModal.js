import React, { Component } from 'react';
import { View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { Text, Input, Button } from 'react-native-elements';

const options = [{ value: 'Create a roommate group' }, { value: 'Join a group' }];

export default class CreateGroupModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameError: false,
      errorMessage: '',
    };
  }

  createGroup() {
    if (this.state.name.length === 0) {
      this.setState({ errorMessage: 'Please enter a group name', nameError: true });
      this.groupInput.shake();
    } else {
      this.props.navigator.dismissAllModals({
        animationType: 'slide-down',
      });
    }
  }

  handleSelection(i) {
    this.setState({ nameError: false });
    if (i === 0) {
      this.setState({ errorMessage: 'Group name taken' });
    } else {
      this.setState({ errorMessage: 'Group does not exist' });
    }
  }

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
              displayError={this.state.nameError}
              placeholder="Anonymous Llamas"
              errorMessage={this.state.errorMessage}
            />
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 20 }}>
          <Button
            title="DONE  "
            buttonStyle={{
              backgroundColor: 'rgba(92, 99,216, 1)',
              width: 300,
              height: 45,
              borderColor: 'transparent',
              borderWidth: 0,
              borderRadius: 5,
            }}
            onPress={() => this.createGroup()}
          />
        </View>
      </View>
    );
  }
}
