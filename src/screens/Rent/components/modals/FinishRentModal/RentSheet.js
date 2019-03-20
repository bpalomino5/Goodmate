import React from 'react';
import { ScrollView, View } from 'react-native';

import SheetItem from './SheetItem';

const RentSheet = ({ base, bills, onItemPress }) => (
  <ScrollView>
    <View style={{ flex: 1 }}>
      {base.map((item, i) => (
        <SheetItem key={i} data={item} onPress={() => onItemPress(i, 'base')} />
      ))}
      {bills.map((item, i) => (
        <SheetItem key={i} data={item} onPress={() => onItemPress(i, 'bills')} />
      ))}
    </View>
  </ScrollView>
);

export default RentSheet;
