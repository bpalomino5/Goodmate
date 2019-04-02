import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import { Icon, Divider, Text } from "react-native-elements";

const IconSelector = ({ isBill }) => (
  <View style={{ marginRight: 10 }}>
    {isBill ? (
      <Icon
        name="dollar"
        type="font-awesome"
        size={22}
        containerStyle={{ marginLeft: 5, marginRight: 7 }}
      />
    ) : (
      <Icon name="broom" type="material-community" size={25} />
    )}
  </View>
);

const ItemBody = ({ title, subtitle }) => (
  <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
    <View style={{ width: 70, marginRight: 40 }}>
      <Text style={{ fontSize: 17, fontFamily: "Avenir", marginRight: 15 }}>
        {title}
      </Text>
    </View>
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 15, color: "gray" }}>{subtitle}</Text>
    </View>
    <Icon name="chevron-small-right" type="entypo" />
  </View>
);

const SelectableItemRow = ({ onPress, children }) => (
  <TouchableOpacity activeOpacity={0.3} onPress={onPress}>
    <View style={{ flex: 0, flexDirection: "row", padding: 15 }}>
      {children}
    </View>
  </TouchableOpacity>
);

const ReminderItem = ({ title, subtitle, isBill, onPress }) => (
  <View>
    <SelectableItemRow onPress={onPress}>
      <IconSelector isBill={isBill} />
      <ItemBody title={title} subtitle={subtitle} />
    </SelectableItemRow>
    <Divider style={{ backgroundColor: "grey", height: 1 }} />
  </View>
);

export default memo(ReminderItem);
