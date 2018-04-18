import React, { Component } from 'react';
import { View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { Text, Input, Button } from 'react-native-elements';
import firebase from 'react-native-firebase';

const options = [{ value: 'Create a roommate group' }, { value: 'Join a group' }];

export default class CreateGroupModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameError: false,
      errorMessage: '',
      user: firebase.auth().currentUser,
      selection: 0,
    };
    this.groupRef = firebase.firestore().collection('groups');
    this.usersRef = firebase.firestore().collection('users');
  }

  createGroup() {
    const { name } = this.state;
    if (name.length === 0) {
      this.setState({ errorMessage: 'Please enter a group name', nameError: true });
      this.groupInput.shake();
    } else {
      // create new group
      const ref = this.groupRef.doc(name);
      ref.set();

      // add user to users group, group creator thus primary
      this.addtoUserGroup(true, ref);

      // add user to roommate group
      this.addtoRoommateGroup(name);

      // close modal
      this.props.navigator.dismissAllModals({
        animationType: 'slide-down',
      });
    }
  }

  joinGroup() {
    const { name } = this.state;
    if (name.length === 0) {
      this.setState({ errorMessage: 'Please enter a group name', nameError: true });
      this.groupInput.shake();
    } else {
      // join group
      this.groupRef
        .doc(name)
        .get()
        .then(doc => {
          if (doc.exists) {
            // add to users group in firestore
            this.addtoUserGroup(false, doc.ref);
            this.addtoRoommateGroup(doc.id);
            // close modal
            this.props.navigator.dismissAllModals({
              animationType: 'slide-down',
            });
          } else {
            // did not join group
            this.setState({ nameError: true });
            this.groupInput.shake();
          }
        });
    }
  }

  addtoUserGroup(primary, ref) {
    const { user } = this.state;
    const name = user.displayName.split(' ');

    this.usersRef.doc(user.uid).set({
      first: name[0],
      last: name[1],
      primary,
      groupRef: ref,
    });
  }

  addtoRoommateGroup(groupId) {
    // get ref to user from firestore
    const ref = this.usersRef.doc(this.state.user.uid);

    // add roommate ref to new roommate group
    const path = `groups/${groupId}/roommates`;
    firebase
      .firestore()
      .collection(path)
      .add({
        roommate: ref,
      });
  }

  handleSelection(i) {
    this.setState({ nameError: false, selection: i });
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
            onPress={this.state.selection === 0 ? () => this.createGroup() : () => this.joinGroup()}
          />
        </View>
      </View>
    );
  }
}
