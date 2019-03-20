import React from 'react';
import { View } from 'react-native';
import { Overlay, Text, Button } from 'react-native-elements';

const InfoOverlay = ({ isVisible, toggleOverlay, description }) => (
  <Overlay
    borderRadius={5}
    overlayStyle={{ padding: 15 }}
    isVisible={isVisible}
    width="auto"
    height="auto"
  >
    <>
      <View>
        <Text style={{ fontSize: 24, marginBottom: 5 }}>Helpful Tip</Text>
        <Text style={{ fontSize: 16, color: 'gray', marginBottom: 10 }}>{description}</Text>
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
