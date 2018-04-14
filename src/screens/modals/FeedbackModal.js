import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Icon, Text, Button } from 'react-native-elements';
import { TextField } from 'react-native-material-textfield';

const GoodHeader = ({ closeModal }) => (
  <Header
    statusBarProps={{ backgroundColor: '#5B725A' }}
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
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.props.navigator.dismissModal({
      animationType: 'slide-down',
    });
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
        />
        <Button
          buttonStyle={styles.submitButton}
          title="Submit "
          onPress={() => console.log('hi')}
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
