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
    <Text style={styles.sectionText}>{section}</Text>
  </View>
);

const ItemDetails = ({ uids, type }) => (
  <View style={styles.itemDetails}>
    <Text style={styles.itemType}>{type}</Text>
    <View style={styles.detailView}>
      {Object.keys(uids).map((item, i) => (
        <Text key={i} style={styles.detailText}>
          {item}
          {' '}
        </Text>
      ))}
    </View>
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

const SheetItem = ({ data, onPress }) => (
  <ItemContainer onPress={onPress}>
    <ItemSection section={data.section} />
    <ItemDetails uids={data.uids} type={data.type} />
    <ItemValue value={data.value} />
  </ItemContainer>
);

const styles = StyleSheet.create({
  ItemContainer: { padding: 5, flexDirection: 'row' },
  divider: { backgroundColor: 'grey' },
  itemValue: {
    flex: 0,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
  },
  valueText: { fontSize: 18 },
  itemDetails: { marginLeft: 12, flex: 1 },
  itemType: { fontSize: 20, marginBottom: 4 },
  detailView: { flexDirection: 'row' },
  detailText: { fontSize: 14, color: 'grey' },
  itemSection: { alignSelf: 'center', margin: 10, width: 65 },
  sectionText: { fontSize: 20 },
});

export default SheetItem;
