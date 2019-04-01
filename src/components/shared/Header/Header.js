import React from "react";
import { Platform, StyleSheet } from "react-native";
import { Header as ElementHeader, Icon } from "react-native-elements";

const Header = ({ toggleDrawer, text, rightComponent }) => (
  <ElementHeader
    containerStyle={Platform.OS === "android" && styles.header}
    statusBarProps={{ backgroundColor: "black", barStyle: "light-content" }}
    backgroundColor="#385136"
    leftComponent={
      <Icon
        name="menu"
        type="feather"
        color="white"
        underlayColor="transparent"
        onPress={toggleDrawer}
      />
    }
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

export default Header;
