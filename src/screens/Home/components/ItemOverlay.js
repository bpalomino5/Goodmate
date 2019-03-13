import React from 'react';
import { View } from 'react-native';
import { Text, Overlay, Button } from 'react-native-elements';

const ItemOverlay = ({
  isVisible, closeOverlay, deleteItem, isCreator,
}) => (
  <Overlay
    borderRadius={5}
    overlayStyle={{ margin: 20 }}
    isVisible={isVisible}
    width="auto"
    height="auto"
  >
    <View>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Options</Text>
      <View style={{ flexDirection: 'row' }}>
        {isCreator && (
          <Button
            title="Delete "
            onPress={deleteItem}
            containerStyle={{ marginRight: 10 }}
            buttonStyle={{
              backgroundColor: 'rgba(92, 99,216, 1)',
            }}
          />
        )}
        <Button
          title="Close "
          onPress={closeOverlay}
          buttonStyle={{
            backgroundColor: 'rgba(92, 99,216, 1)',
          }}
        />
      </View>
    </View>
  </Overlay>
);

export default ItemOverlay;
