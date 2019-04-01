import React from "react";
import { View } from "react-native";
import { Text, Overlay, Button } from "react-native-elements";

const ItemOverlay = ({ isVisible, closeOverlay, deleteItem, isCreator }) => (
  <Overlay
    isVisible={isVisible}
    width="auto"
    height="auto"
    onBackdropPress={closeOverlay}
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
  </Overlay>
);

export default ItemOverlay;
