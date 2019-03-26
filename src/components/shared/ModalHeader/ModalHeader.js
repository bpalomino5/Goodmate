import React from "react";
import { Platform, StyleSheet } from "react-native";
import { Header as ElementHeader } from "react-native-elements";

const ModalHeader = ({ leftComponent, text, rightComponent }) => (
  <ElementHeader
    containerStyle={Platform.OS === "android" && styles.header}
    statusBarProps={{ backgroundColor: "#546054", barStyle: "light-content" }}
    backgroundColor="#5B725A"
    leftComponent={leftComponent}
    centerComponent={{
      text,
      style: { fontSize: 20, color: "#fff" }
    }}
    rightComponent={rightComponent}
  />
);

const styles = StyleSheet.create({
  header: {
    height: "auto",
    paddingBottom: 10,
    paddingTop: 10
  },
  title: { fontSize: 20, color: "#fff" }
});

export default ModalHeader;
