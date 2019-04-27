import "intl";
import "intl/locale-data/jsonp/en";
import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Text, Divider } from "react-native-elements";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});

const ItemSection = ({ section }) => (
  <View style={styles.itemSection}>
    {section === "" ? (
      <Text style={[styles.sectionText, styles.preview]}>Section</Text>
    ) : (
      <Text style={styles.sectionText}>{section}</Text>
    )}
  </View>
);

const ItemDetails = ({ uids, type }) => (
  <View style={styles.itemDetails}>
    {type === "" ? (
      <Text style={[styles.itemType, styles.preview]}>Bill Name</Text>
    ) : (
      <Text style={styles.itemType}>{type}</Text>
    )}
    <View style={styles.detailView}>
      {Object.keys(uids).map((item, i) => (
        <Text key={i} style={styles.detailText}>
          {item}
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
  <View>
    <TouchableOpacity onPress={onPress}>
      <View style={styles.ItemContainer}>{children}</View>
    </TouchableOpacity>
    <Divider style={styles.divider} />
  </View>
);

const SheetItem = ({ data, onPress }) => (
  <ItemContainer onPress={onPress}>
    <ItemSection section={data.section} />
    <ItemDetails uids={data.uids} type={data.type} />
    <ItemValue value={data.value} />
  </ItemContainer>
);

const styles = StyleSheet.create({
  ItemContainer: { padding: 10, flexDirection: "row" },
  divider: { backgroundColor: "grey", height: 1 },
  itemValue: {
    flex: 0,
    marginRight: 10,
    alignItems: "flex-end",
    justifyContent: "center",
    width: 90
  },
  valueText: { fontSize: 18 },
  itemDetails: { marginLeft: 12, flex: 1 },
  itemType: { fontSize: 20, marginBottom: 4 },
  detailView: { flexDirection: "column" },
  detailText: { fontSize: 14, color: "grey" },
  itemSection: { marginLeft: 10, width: 100 },
  sectionText: { fontSize: 20 },
  preview: { color: "grey" }
});

export default SheetItem;
