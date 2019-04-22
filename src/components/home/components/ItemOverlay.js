import React from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform
} from "react-native";
import { Text, Overlay, Button } from "react-native-elements";
import Layout from "../../../../constants/Layout";

const ItemOverlay = ({ isVisible, closeOverlay, deleteItem, isCreator }) => (
  <Modal
    animationType="slide"
    onRequestClose={closeOverlay}
    visible={isVisible}
    transparent
  >
    <TouchableWithoutFeedback onPress={closeOverlay}>
      <View
        style={StyleSheet.flatten([
          styles.backdrop,
          { backgroundColor: "rgba(0, 0, 0, 0.4)" }
        ])}
      />
    </TouchableWithoutFeedback>

    <View style={styles.container} pointerEvents="box-none">
      <View
        style={StyleSheet.flatten([
          styles.overlay,
          {
            borderRadius: 3,
            backgroundColor: "white",
            // width: Layout.window.width - 80,
            height: 180
          }
        ])}
      >
        <View>
          <Text style={{ fontSize: 22, marginBottom: 20 }}>Options</Text>
          <View style={{ flexDirection: "row" }}>
            {isCreator && (
              <Button
                title="Delete"
                onPress={deleteItem}
                containerStyle={{ marginRight: 10 }}
              />
            )}
            <Button title="Close" onPress={closeOverlay} />
          </View>
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flex: 1,
    // alignItems: " ",
    justifyContent: "flex-end"
  },
  fullscreen: {
    width: "100%",
    height: "100%"
  },
  overlay: {
    borderRadius: 5,
    padding: 10,
    ...Platform.select({
      android: {
        elevation: 2
      },
      default: {
        shadowColor: "rgba(0, 0, 0, .3)",
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4
      }
    })
  }
});

export default ItemOverlay;
