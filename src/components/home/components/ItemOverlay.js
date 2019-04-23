import React from "react";
import { Modal, View, StyleSheet, Platform } from "react-native";
import { Text, ListItem } from "react-native-elements";
import Layout from "../../../../constants/Layout";

const ItemOverlay = ({ isVisible, closeOverlay, deleteItem, isCreator }) => (
  <>
    {isVisible && <View onPress={closeOverlay} style={styles.backdrop} />}
    <Modal
      hardwareAccelerated
      animationType="slide"
      onRequestClose={closeOverlay}
      visible={isVisible}
      transparent
    >
      <View style={styles.container} pointerEvents="box-none">
        <View style={styles.overlay}>
          <Text style={styles.menuHeader}>Options</Text>
          <View>
            {isCreator && (
              <ListItem
                title="Remove"
                chevron
                onPress={deleteItem}
                bottomDivider
              />
            )}
            <ListItem
              title="Close"
              onPress={closeOverlay}
              chevron
              bottomDivider
            />
          </View>
        </View>
      </View>
    </Modal>
  </>
);

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    position: "absolute",
    top: 0,
    left: 0,
    width: Layout.window.width,
    height: Layout.window.height,
    zIndex: 100
  },
  container: {
    flex: 1,
    justifyContent: "flex-end"
  },
  overlay: {
    paddingBottom: 20,
    backgroundColor: "white",
    borderRadius: 5,
    paddingTop: 10,
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
  },
  menuHeader: {
    fontSize: 22,
    paddingLeft: 10,
    paddingBottom: 5,
    textDecorationLine: "underline"
  }
});

export default ItemOverlay;
