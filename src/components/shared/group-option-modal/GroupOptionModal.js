import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Input } from "react-native-elements";

const GroupOptionModal = ({
  name,
  nameError,
  errorMessage,
  header,
  text,
  inputRef,
  onChangeText
}) => (
  <View style={styles.main}>
    <Text style={styles.header}>{header}</Text>
    <Input
      containerStyle={styles.inputBox}
      label={text}
      ref={inputRef}
      value={name}
      onChangeText={onChangeText}
      displayError={nameError}
      placeholder="Anonymous Llamas"
      errorMessage={errorMessage}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  main: { flex: 0, padding: 15, marginTop: 30 },
  header: { fontSize: 18, marginBottom: 30 },
  inputBox: { marginTop: 10 }
});

export default GroupOptionModal;
