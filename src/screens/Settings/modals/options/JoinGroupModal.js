import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Header, Icon, Text, Input,
} from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import FireTools from '../../../../utils/FireTools';

const GoodHeader = ({ closeModal, submitUpdate }) => (
  <Header
    statusBarProps={{ backgroundColor: '#546054' }}
    backgroundColor="#5B725A"
    leftComponent={
      <Icon name="close" color="white" underlayColor="transparent" onPress={closeModal} />
    }
    centerComponent={{ text: 'Join a Group', style: { fontSize: 18, color: '#fff' } }}
    rightComponent={
      <Icon name="check" color="white" underlayColor="transparent" onPress={submitUpdate} />
    }
  />
);

export default class JoinGroupModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameError: false,
      errorMessage: null,
    };
    this.submitUpdate = this.submitUpdate.bind(this);
  }

  async componentDidMount() {
    FireTools.init();
  }

  closeModal = () => Navigation.dismissModal(this.props.componentId);

  async submitUpdate() {
    const { name } = this.state;
    if (name.trim() !== '') {
      const success = await FireTools.addUsertoGroup(name);
      if (success) {
        this.props.onFinish();
        this.closeModal();
      } else {
        this.setState({ nameError: true, errorMessage: 'Group does not exist' });
        this.groupInput.shake();
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <GoodHeader closeModal={this.closeModal} submitUpdate={this.submitUpdate} />
        <View style={{ flex: 0, padding: 15, marginTop: 30 }}>
          <Text style={{ fontSize: 18, marginBottom: 30 }}>
            Goodmate users can organize themselves into groups! Groups are essential for dividing
            monthly rent and chores
          </Text>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
