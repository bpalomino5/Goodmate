import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';

const RentFormItem = ({
  type,
  typeChange,
  addItem,
  removeItem,
  value,
  valueChange,
  removable,
  sections,
  setSection,
  sectionValue,
}) => (
  <View style={styles.container}>
    <Dropdown
      containerStyle={styles.dropdownStyle}
      label="Section"
      data={sections}
      value={sectionValue}
      animationDuration={150}
      onChangeText={setSection}
    />
    <Input
      placeholder="Name"
      value={type}
      onChangeText={typeChange}
      containerStyle={styles.nameStyle}
    />
    <Icon name="attach-money" size={20} color="black" containerStyle={styles.iconMoney} />
    <Input
      placeholder="Value"
      value={value}
      onChangeText={valueChange}
      containerStyle={styles.valueStyle}
    />
    {removable === false ? (
      <Icon
        name="add-circle-outline"
        color="green"
        onPress={addItem}
        containerStyle={styles.iconCircle}
      />
    ) : (
      <Icon
        name="remove-circle-outline"
        color="red"
        onPress={removeItem}
        containerStyle={styles.iconCircle}
      />
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownStyle: {
    width: 85,
    marginRight: 10,
  },
  nameStyle: { flex: 1, marginRight: 5, marginTop: 15 },
  iconMoney: { marginTop: 10 },
  valueStyle: {
    width: 90,
    marginLeft: -15,
    marginRight: 5,
    marginTop: 15,
  },
  iconCircle: { marginRight: 5 },
});

export default RentFormItem;
