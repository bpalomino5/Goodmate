import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Icon, Text, Button } from 'react-native-elements';
import { TextField } from 'react-native-material-textfield';
import FireTools from '../../../utils/FireTools';

const GoodHeader = ({ closeModal }) => (
  <Header
    statusBarProps={{ backgroundColor: '#546054' }}
    backgroundColor="#5B725A"
    leftComponent={
      <Icon name="arrow-back" color="white" underlayColor="transparent" onPress={closeModal} />
    }
    centerComponent={{ text: 'Send Feedback', style: { fontSize: 18, color: '#fff' } }}
  />
);

export default class FeedbackModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
    };
    this.closeModal = this.closeModal.bind(this);
    this.submitSuggestion = this.submitSuggestion.bind(this);
  }

  closeModal() {
    this.props.navigator.dismissModal({
      animationType: 'slide-down',
    });
  }

  async submitSuggestion() {
    const { description } = this.state;
    if (description.trim() !== '') {
      await FireTools.submitSuggestion(description);
      this.closeModal();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <GoodHeader closeModal={this.closeModal} />
        <View style={{ flex: 0, alignItems: 'center', padding: 5 }}>
          <Text style={{ fontSize: 22, marginBottom: 10 }}>Thank you for using our services!</Text>
          <Text style={{ textAlign: 'center', fontSize: 18 }}>
            Please help us improve by sending a suggestion or report a bug you found!
          </Text>
        </View>
        <TextField
          containerStyle={{ padding: 18 }}
          label="Write suggestion"
          multiline
          characterRestriction={300}
          maxLength={300}
          value={this.state.description}
          onChangeText={description => this.setState({ description })}
        />
        <Button
          buttonStyle={{
            backgroundColor: 'rgba(92, 99,216, 1)',
            width: 300,
            height: 45,
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 5,
          }}
          title="Submit "
          onPress={this.submitSuggestion}
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
  submitButton: {
    borderRadius: 20,
    height: 40,
    width: 150,
  },
});
