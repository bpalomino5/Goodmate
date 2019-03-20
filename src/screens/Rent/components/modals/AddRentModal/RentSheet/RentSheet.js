import React from 'react';
import { ScrollView, View } from 'react-native';

import SheetItem from './SheetItem';

const RentSheet = ({ main, utilities, onItemPress }) => (
  <ScrollView>
    <View style={{ flex: 1 }}>
      {main.map((item, i) => (
        <SheetItem key={i} data={item} onPress={() => onItemPress(i, 'main')} group="Main" />
      ))}
      {utilities.map((item, i) => (
        <SheetItem
          key={i}
          data={item}
          onPress={() => onItemPress(i, 'utilities')}
          group="Utilities"
        />
      ))}
    </View>
  </ScrollView>
);

export default RentSheet;
