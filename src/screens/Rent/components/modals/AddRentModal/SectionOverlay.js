import React from 'react';
import { View, Platform } from 'react-native';
import {
  Overlay, Text, Button, Input,
} from 'react-native-elements';

const SectionOverlay = ({
  isVisible, sectionValue, onChangeText, onAdd, onClose,
}) => (
  <Overlay
    borderRadius={5}
    containerStyle={{ justifyContent: 'flex-start', marginTop: Platform.OS === 'ios' ? 70 : 45 }}
    overlayStyle={{ padding: 15 }}
    isVisible={isVisible}
    width="auto"
    height="auto"
  >
    <>
      <View>
        <Text style={{ fontSize: 24, marginBottom: 5 }}>Sections</Text>
        <Text style={{ fontSize: 16, color: 'gray', marginBottom: 10 }}>
          Sections are used for grouping individual base & bill items into added totals. Create at
          least one section to group all your items under one total payment. Assign that section to
          each row under the section dropdown.
        </Text>
        <Text style={{ fontSize: 16, color: 'gray', marginBottom: 10 }}>
          i.e. Apartment Total, Utilities Total
        </Text>
        <Input
          label="Add new section"
          placeholder="Section Name"
          containerStyle={{ marginBottom: 10, marginTop: 15 }}
          value={sectionValue}
          onChangeText={text => onChangeText(text)}
        />
      </View>
      <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Button
          title="Add "
          containerStyle={{ marginRight: 5 }}
          onPress={onAdd}
          buttonStyle={{
            backgroundColor: 'rgba(92, 99,216, 1)',
          }}
        />
        <Button
          title="Close "
          onPress={onClose}
          buttonStyle={{
            backgroundColor: 'rgba(92, 99,216, 1)',
          }}
        />
      </View>
    </>
  </Overlay>
);

export default SectionOverlay;
