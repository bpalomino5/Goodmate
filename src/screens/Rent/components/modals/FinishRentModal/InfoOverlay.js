import React from 'react';
import { View } from 'react-native';
import { Button, Text, Overlay } from 'react-native-elements';

const InfoOverlay = ({ toggleOverlay, isVisible }) => (
  <Overlay
    borderRadius={5}
    overlayStyle={{ padding: 15 }}
    isVisible={isVisible}
    width="auto"
    height="auto"
  >
    <>
      <View>
        <Text style={{ fontSize: 24, marginBottom: 5 }}>About Assign</Text>
        <Text style={{ fontSize: 16, color: 'gray', marginBottom: 10 }}>
          Rent items can be divided evenly in price amongst specific roommates. If no assignment is
          made the item will be displayed to all but not included in totals. Select an item to get
          started.
        </Text>
      </View>
      <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Button
          title="Close "
          onPress={() => toggleOverlay(false)}
          buttonStyle={{
            backgroundColor: 'rgba(92, 99,216, 1)',
          }}
        />
      </View>
    </>
  </Overlay>
);

export default InfoOverlay;
