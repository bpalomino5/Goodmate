import React, { Component } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { auth } from "../../../../firebase";

const ForgotView = ({ onSubmit, onChangeText }) => (
  <View style={styles.forgetView}>
    <Text> Forgot your password? </Text>
    <Text>Please enter your email to reset your password</Text>
    <Input
      inputStyle={{ textAlign: "center" }}
      containerStyle={styles.inputStyle}
      placeholder="Email"
      onChangeText={onChangeText}
    />
    <Button
      containerStyle={{ marginTop: 30 }}
      title="Submit "
      buttonStyle={styles.submitButton}
      onPress={onSubmit}
    />
  </View>
);

const SubmitView = () => (
  <View style={styles.submitView}>
    <Text> Thank you for your dedication to Goodmate </Text>
    <Text>An email will arrive shortly</Text>
  </View>
);

export default class HelpModal extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Icon
          containerStyle={{ marginLeft: 10 }}
          name="close"
          underlayColor="transparent"
          onPress={() => navigation.goBack()}
        />
      )
    };
  };

  state = { submitted: false, email: "" };

  resetPassword = async () => {
    const { navigation } = this.props;
    const { email } = this.state;
    if (email.length !== 0) {
      this.setState({ submitted: true });
      await auth.resetPassword(email);
      navigation.goBack();
    }
  };

  render() {
    const { submitted } = this.state;
    return (
      <View style={styles.container}>
        {submitted === false ? (
          <ForgotView
            onSubmit={this.resetPassword}
            onChangeText={email => this.setState({ email })}
          />
        ) : (
          <SubmitView />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  forgetView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  submitView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputStyle: {
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  submitButton: {
    width: 300,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  }
});
