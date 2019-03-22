import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import FireTools from '../../../../../../../utils/FireTools';
import GroupOptionModal from '../../../../../../../components/shared/GroupOptionModal';

const GoodHeader = ({ closeModal, submitUpdate }) => (
  <Header
    statusBarProps={{ backgroundColor: '#546054' }}
    backgroundColor="#5B725A"
    leftComponent={
      <Icon name="close" color="white" underlayColor="transparent" onPress={closeModal} />
    }
    centerComponent={{ text: 'Leave Group', style: { fontSize: 18, color: '#fff' } }}
    rightComponent={
      <Icon name="check" color="white" underlayColor="transparent" onPress={submitUpdate} />
    }
  />
);

export default class LeaveGroupModal extends Component {
  state = {
    name: '',
    nameError: false,
    errorMessage: null,
  };

  componentDidMount = async () => {
    FireTools.init();
  };

  closeModal = () => Navigation.dismissModal(this.props.componentId);

  submitUpdate = async () => {
    const { name } = this.state;
    if (name.trim() !== '') {
      const success = await FireTools.removeUserFromGroup(name);
      if (success) {
        this.props.onFinish();
        this.closeModal();
      } else {
        this.setState({ nameError: true, errorMessage: 'Group does not exist' });
        this.groupInput.shake();
      }
    }
  };

  render() {
    const { name, nameError, errorMessage } = this.state;
    return (
      <View style={styles.container}>
        <GoodHeader closeModal={this.closeModal} submitUpdate={this.submitUpdate} />
        <GroupOptionModal
          header="Please confirm by writing your group name and selecting the checkmark"
          text="Group name"
          inputRef={input => {
            this.groupInput = input;
          }}
          name={name}
          nameError={nameError}
          errorMessage={errorMessage}
          onChangeText={name => this.setState({ name })}
        />
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
