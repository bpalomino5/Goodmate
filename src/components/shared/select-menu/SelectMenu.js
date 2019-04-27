import React from "react";
import { StyleSheet, View, TouchableHighlight } from "react-native";
import { Icon, Text, Divider } from "react-native-elements";

const ItemBody = ({ title }) => (
  <View style={styles.itemBody}>
    <View style={styles.title}>
      <Text style={styles.titleText}>{title}</Text>
    </View>
    <Icon
      containerStyle={styles.iconStyle}
      name="chevron-small-right"
      type="entypo"
    />
  </View>
);

const SelectableItemRow = ({ onPress, children }) => (
  <TouchableHighlight
    activeOpacity={0.3}
    onPress={onPress}
    underlayColor="lightgray"
  >
    <View style={styles.rowContainer}>{children}</View>
  </TouchableHighlight>
);

const SectionItem = ({ title, onPress }) => (
  <View>
    <SelectableItemRow onPress={onPress}>
      <ItemBody title={title} />
    </SelectableItemRow>
    <Divider style={styles.divider} />
  </View>
);

const SelectMenu = ({ title, options, onItemPress }) => (
  <View>
    <Text style={styles.sectionText}>{title}</Text>
    {options.map((item, i) => (
      <SectionItem
        key={i}
        title={item.title}
        onPress={() => onItemPress(item.screen)}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  sectionText: {
    // fontWeight: "bold",
    fontSize: 22,
    marginLeft: 10,
    marginTop: 25,
    textDecorationLine: "underline"
  },
  divider: { backgroundColor: "grey", height: 1 },
  rowContainer: { flex: 0, flexDirection: "row", padding: 15 },
  itemBody: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  title: { flex: 0 },
  titleText: { fontSize: 17, marginRight: 15 },
  iconStyle: { flex: 1, justifyContent: "flex-end", alignItems: "flex-end" }
});

export default SelectMenu;
