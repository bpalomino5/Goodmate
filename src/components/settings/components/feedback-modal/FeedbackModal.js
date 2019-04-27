import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Text, Button } from "react-native-elements";
import { TextField } from "react-native-material-textfield";
import { db } from "../../../../firebase";

export default class FeedbackModal extends Component {
  static navigationOptions = {
    title: "Send Feedback       "
  };

  state = {
    description: ""
  };

  submitSuggestion = async () => {
    const { navigation } = this.props;
    const { description } = this.state;
    if (description.trim() !== "") {
      await db.submitSuggestion(description);
      navigation.goBack();
    }
  };

  render() {
    const { description } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.textBox}>
          <Text style={styles.titleText}>
            Thank you for using our services!
          </Text>
          <Text style={styles.description}>
            Please help us improve by sending a suggestion or report a bug you
            found!
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
        <View style={{ flex: 1, justifyContent: "flex-end", padding: 10 }}>
          <Button title="Submit " onPress={this.submitSuggestion} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  textBox: { flex: 0, alignItems: "center", padding: 5 },
  titleText: { fontSize: 22, marginBottom: 10 },
  description: { textAlign: "center", fontSize: 18 }
  // buttonContainer: { flex: 0, alignSelf: "center" },
  // submitButton: {
  //   width: 300,
  //   height: 45,
  //   borderColor: "transparent",
  //   borderWidth: 0,
  //   borderRadius: 5
  // }
});
