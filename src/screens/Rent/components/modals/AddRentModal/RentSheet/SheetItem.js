import 'intl';
import 'intl/locale-data/jsonp/en';
import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Text, Divider } from 'react-native-elements';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

const ItemSection = ({ section }) => (
  <View style={styles.itemSection}>
    {section === '' ? (
      <Text style={[styles.sectionText, styles.preview]}>Section</Text>
    ) : (
      <Text style={styles.sectionText}>{section}</Text>
    )}
  </View>
);

const ItemDetails = ({ type, group }) => (
  <View style={styles.itemDetails}>
    {type === '' ? (
      <Text style={[styles.itemType, styles.preview]}>Bill Name</Text>
    ) : (
      <Text style={styles.itemType}>{type}</Text>
    )}
    <Text style={styles.detailText}>{group}</Text>
  </View>
);

const ItemValue = ({ value }) => (
  <View style={styles.itemValue}>
    <Text style={styles.valueText}>{formatter.format(value)}</Text>
  </View>
);

const ItemContainer = ({ onPress, children }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.ItemContainer}>{children}</View>
    <Divider style={styles.divider} />
  </TouchableOpacity>
);

const SheetItem = ({ data, onPress, group }) => (
  <ItemContainer onPress={onPress}>
    <ItemSection section={data.section} />
    <ItemDetails uids={data.uids} type={data.type} group={group} />
    <ItemValue value={data.value} />
  </ItemContainer>
);

const styles = StyleSheet.create({
  ItemContainer: { padding: 5, flexDirection: 'row' },
  divider: { backgroundColor: 'grey' },
  itemValue: {
    flex: 0,
    marginRight: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: 90,
  },
  valueText: { fontSize: 18 },
  itemDetails: { marginLeft: 12, flex: 1 },
  itemType: { fontSize: 20, marginBottom: 4 },
  detailView: { flexDirection: 'row' },
  detailText: { fontSize: 14, color: 'grey' },
  preview: { color: 'grey' },
  itemSection: {
    marginLeft: 10,
    width: 100,
  },
  sectionText: { fontSize: 20 },
});

export default SheetItem;
