import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Header, Icon, Text, Button,
} from 'react-native-elements';
import { TextField } from 'react-native-material-textfield';
import { Navigation } from 'react-native-navigation';
import { db } from '../../../../../firebase';

const GoodHeader = ({ closeModal }) => (
  <Header
    statusBarProps={{ backgroundColor: '#546054', barStyle: 'light-content' }}
    backgroundColor="#5B725A"
    leftComponent={
      <Icon name="arrow-back" color="white" underlayColor="transparent" onPress={closeModal} />
    }
    centerComponent={{ text: 'Send Feedback', style: { fontSize: 18, color: '#fff' } }}
  />
);

export default class FeedbackModal extends Component {
  state = {
    description: '',
  };

  closeModal = () => Navigation.dismissModal(this.props.componentId);

  submitSuggestion = async () => {
    const { description } = this.state;
    if (description.trim() !== '') {
      await db.submitSuggestion(description);
      this.closeModal();
    }
  };

  render() {
    const { description } = this.state;
    return (
      <View style={styles.container}>
        <GoodHeader closeModal={this.closeModal} />
        <View style={styles.textBox}>
          <Text style={styles.titleText}>Thank you for using our services!</Text>
          <Text style={styles.description}>
            Please help us improve by sending a suggestion or report a bug you found!
          </Text>
        </View>
        <TextField
          containerStyle={{ padding: 18 }}
          baseColor="grey"
          tintColor="grey"
          label="Write suggestion"
          multiline
          characterRestriction={300}
          maxLength={300}
          value={description}
          onChangeText={description => this.setState({ description })}
        />
        <Button
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.submitButton}
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
  textBox: { flex: 0, alignItems: 'center', padding: 5 },
  titleText: { fontSize: 22, marginBottom: 10 },
  description: { textAlign: 'center', fontSize: 18 },
  buttonContainer: { flex: 0, alignSelf: 'center' },
  submitButton: {
    backgroundColor: 'rgba(92, 99,216, 1)',
    width: 300,
    height: 45,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
  },
});
