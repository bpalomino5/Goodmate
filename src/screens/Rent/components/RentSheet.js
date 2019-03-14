import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Card, Text } from 'react-native-elements';

import 'intl';
import 'intl/locale-data/jsonp/en';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

const RentCardItem = ({ title, value }) => (
  <View style={styles.rentCardItem}>
    <Text>{title}</Text>
    <Text>{value}</Text>
  </View>
);

const RentSheet = ({ base, bills, totals }) => (
  <ScrollView>
    <Card title="Base" titleStyle={{ alignSelf: 'flex-start' }}>
      {base.map((item, i) => (
        <RentCardItem key={i} title={item.type} value={formatter.format(item.value)} />
      ))}
    </Card>
    <Card title="Bills" titleStyle={{ alignSelf: 'flex-start' }}>
      {bills.map((item, i) => (
        <RentCardItem key={i} title={item.type} value={formatter.format(item.value)} />
      ))}
    </Card>
    <Card title="Totals" titleStyle={{ alignSelf: 'flex-start' }}>
      {totals.map((item, i) => (
        <RentCardItem key={i} title={item.section} value={formatter.format(item.value)} />
      ))}
    </Card>
  </ScrollView>
);

const styles = StyleSheet.create({
  rentCardItem: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 2,
  },
});

export default RentSheet;
