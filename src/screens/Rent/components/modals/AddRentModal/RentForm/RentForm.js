/* eslint react/no-array-index-key: 0,
   no-param-reassign: 0,
*/
import React from 'react';
import { View, StyleSheet } from 'react-native';

import RentFormCard from './RentFormCard';

const RentForm = ({
  sections, infoPress, base, bills, addItem, removeItem, updateItem,
}) => (
  <View>
    <RentFormCard
      style={styles.mainStyle}
      title="Main"
      rentData={base}
      sections={sections}
      addItem={() => addItem('base')}
      removeItem={i => removeItem('base', i)}
      updateItemType={(i, type) => updateItem('base', i, 'type', type)}
      updateItemValue={(i, value) => updateItem('base', i, 'value', value)}
      updateItemSection={(i, section) => updateItem('base', i, 'section', section)}
      infoPress={() => infoPress('base')}
    />
    <RentFormCard
      style={styles.utilStyle}
      title="Utilities"
      rentData={bills}
      sections={sections}
      addItem={() => addItem('bills')}
      removeItem={i => removeItem('bills', i)}
      updateItemType={(i, type) => updateItem('bills', i, 'type', type)}
      updateItemValue={(i, value) => updateItem('bills', i, 'value', value)}
      updateItemSection={(i, section) => updateItem('bills', i, 'section', section)}
      infoPress={() => infoPress('bill')}
    />
  </View>
);

const styles = StyleSheet.create({
  mainStyle: {
    margin: 0,
  },
  utilStyle: {
    margin: 0,
    marginTop: 5,
  },
});

export default RentForm;
