import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

const types = [{ value: 'Master' }, { value: 'Personal' }];

const months = [
  { value: 'January' },
  { value: 'Feburary' },
  { value: 'March' },
  { value: 'April' },
  { value: 'May' },
  { value: 'June' },
  { value: 'July' },
  { value: 'August' },
  { value: 'September' },
  { value: 'October' },
  { value: 'November' },
  { value: 'December' },
];

const years = [
  { value: '2018' },
  { value: '2019' },
  { value: '2020' },
  { value: '2021' },
  { value: '2022' },
];

const RentFilters = ({
  updateMonth,
  updateYear,
  updateType,
  isGroupPrimary,
  monthVal,
  yearVal,
}) => (
  <View style={styles.dateSelection}>
    {isGroupPrimary && (
      <Dropdown
        containerStyle={{ width: 90, marginRight: 7, marginLeft: 7 }}
        label="Type"
        data={types}
        value="Master"
        onChangeText={updateType}
        animationDuration={180}
      />
    )}
    <Dropdown
      containerStyle={{ width: '30%', marginRight: 3 }}
      label="Month"
      data={months}
      value={monthVal}
      onChangeText={updateMonth}
      animationDuration={180}
    />
    <Dropdown
      containerStyle={{ width: '20%', marginRight: 7 }}
      label="Year"
      data={years}
      value={yearVal}
      onChangeText={updateYear}
      animationDuration={180}
    />
  </View>
);

const styles = StyleSheet.create({
  dateSelection: {
    flex: 0,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default RentFilters;
