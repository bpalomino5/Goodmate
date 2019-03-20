import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Card, Text, Icon, Divider,
} from 'react-native-elements';
import RentFormItem from './RentFormItem';

const RentFormCard = ({
  title,
  rentData,
  addItem,
  updateItemType,
  updateItemValue,
  removeItem,
  sections,
  updateItemSection,
  infoPress,
  style,
}) => (
  <Card containerStyle={style}>
    <>
      <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', marginLeft: 20 }}>
          <Text style={styles.cardTitle}>{title}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon
            name="info"
            type="feather"
            color="black"
            underlayColor="transparent"
            onPress={infoPress}
          />
        </View>
      </View>
      <Divider />
      {rentData.map((item, i) => (
        <RentFormItem
          key={i}
          i={i}
          addItem={addItem}
          removeItem={() => removeItem(i)}
          type={item.type}
          typeChange={text => updateItemType(i, text)}
          value={item.value}
          valueChange={text => updateItemValue(i, text)}
          removable={item.removable}
          sections={sections}
          sectionValue={item.section}
          setSection={text => updateItemSection(i, text)}
        />
      ))}
    </>
  </Card>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    color: '#3A4451',
    marginBottom: 15,
  },
  iconContainer: {
    flex: 0,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginRight: 5,
  },
});

export default RentFormCard;
