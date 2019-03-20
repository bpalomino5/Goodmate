import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Overlay, Text, Button, Input,
} from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';

const groups = [{ value: 'main' }, { value: 'utilities' }];

const AddOverlay = ({
  isEditing,
  isVisible,
  onRemove,
  onAdd,
  onClose,
  dataItem,
  onChangeText,
  group,
}) => (
  <Overlay overlayStyle={{ padding: 15 }} isVisible={isVisible} width="auto">
    <>
      <View>
        <Text style={styles.title}>{isEditing ? 'Edit Bill Item' : 'Add Bill Item'}</Text>
        <Text style={styles.subtitle}>
          Either main or utility bills, also create a section to specify group items for payment
          splitting.
        </Text>
        <Input
          label="Section"
          placeholder="Section"
          containerStyle={styles.inputContainer}
          value={dataItem.section}
          onChangeText={text => onChangeText(text, 'section')}
        />
        <Input
          label="Bill Name"
          placeholder="Name"
          containerStyle={styles.inputContainer}
          value={dataItem.type}
          onChangeText={text => onChangeText(text, 'type')}
        />
        <Input
          label="Bill Value"
          placeholder="$Value"
          containerStyle={styles.inputContainer}
          value={dataItem.value}
          onChangeText={text => onChangeText(text, 'value')}
        />
      </View>
      <Dropdown
        containerStyle={styles.dropdownStyle}
        label="Group"
        data={groups}
        value={group}
        animationDuration={150}
        onChangeText={text => onChangeText(text, 'group')}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.buttonBar}>
          <Button
            title={isEditing ? 'Remove' : 'Add'}
            containerStyle={{ marginRight: 5 }}
            onPress={isEditing ? onRemove : onAdd}
            buttonStyle={{
              backgroundColor: 'rgba(92, 99,216, 1)',
            }}
          />
          <Button
            title={isEditing ? 'Done' : 'Close'}
            onPress={onClose}
            buttonStyle={{
              backgroundColor: 'rgba(92, 99,216, 1)',
            }}
          />
        </View>
      </View>
    </>
  </Overlay>
);

const styles = StyleSheet.create({
  dropdownStyle: {
    width: 85,
    marginLeft: 10,
  },
  title: { fontSize: 24, marginBottom: 5 },
  subtitle: { fontSize: 16, color: 'gray', marginBottom: 10 },
  inputContainer: { marginBottom: 10, marginTop: 15 },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  buttonBar: { flex: 0, flexDirection: 'row', justifyContent: 'flex-end' },
});

export default AddOverlay;
