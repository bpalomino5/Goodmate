/* eslint react/no-array-index-key: 0 */
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import {
  Header, Icon, Text, Divider, Card, ListItem,
} from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import { toggleDrawer } from '../../components/navigation';

const profileItems = [
  { title: 'Edit profile', screen: 'EditProfileModal' },
  { title: 'Change Password', screen: 'ChangePasswordModal' },
];
const generalItems = [
  { title: 'Rent Group', screen: 'RentGroupModal' },
  { title: 'Send feedback', screen: 'FeedbackModal' },
];

const GoodHeader = ({ toggleDrawer }) => (
  <Header
    statusBarProps={{ backgroundColor: '#546054' }}
    backgroundColor="#5B725A"
    leftComponent={(
      <Icon
        name="menu"
        type="Feather"
        color="white"
        underlayColor="transparent"
        onPress={toggleDrawer}
      />
)}
    centerComponent={{ text: 'Settings', style: { fontSize: 18, color: '#fff' } }}
  />
);

const SettingsList = ({ onItemPress }) => (
  <View>
    <SettingSection
      sectionName="Profile"
      items={profileItems}
      onItemPress={screen => onItemPress(screen)}
    />
    <SettingSection
      style={{ marginTop: 40 }}
      sectionName="General"
      items={generalItems}
      onItemPress={screen => onItemPress(screen)}
    />
  </View>
);

const SelectableItemRow = ({ onPress, children }) => (
  <TouchableOpacity activeOpacity={0.3} onPress={onPress}>
    <View style={{ flex: 0, flexDirection: 'row', padding: 15 }}>{children}</View>
  </TouchableOpacity>
);

const ItemBody = ({ title }) => (
  <View
    style={{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    }}
  >
    <View style={{ flex: 0 }}>
      <Text style={{ fontSize: 17, fontFamily: 'Avenir', marginRight: 15 }}>{title}</Text>
    </View>
    <Icon
      containerStyle={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}
      name="chevron-small-right"
      type="entypo"
    />
  </View>
);

const SectionItem = ({ title, onPress }) => (
  <View>
    <SelectableItemRow onPress={onPress}>
      <ItemBody title={title} />
    </SelectableItemRow>
    <Divider style={{ backgroundColor: 'grey', height: 1 }} />
  </View>
);

const SettingSection = ({
  sectionName, items, onItemPress, style,
}) => (
  <View style={style}>
    <Text
      style={{
        fontSize: 22,
        marginLeft: 10,
        marginTop: 15,
        textDecorationLine: 'underline',
      }}
    >
      {sectionName}
    </Text>
    {items.map((item, i) => (
      <SectionItem key={i} title={item.title} onPress={() => onItemPress(item.screen)} />
    ))}
  </View>
);

// const SettingCard = ({ sectionName, items, onItemPress }) => (
//   <Card>
//     <Text>{sectionName}</Text>
//     {items.map((item, i) => (
//       <ListItem
//         key={i}
//         title={item.title}
//         chevron
//         titleContainerStyle={{ marginLeft: 0 }}
//         onPress={() => onItemPress(item.screen)}
//       />
//     ))}
//   </Card>
// );

export default class Settings extends Component {
  openModal = screen => {
    Navigation.showModal({
      component: {
        name: screen,
        options: {
          animationType: 'slide-up',
        },
      },
    });
    // this.props.navigator.showModal({
    //   screen,
    //   navigatorStyle: {
    //     navBarHidden: true,
    //     statusBarColor: '#546054',
    //   },
    //   animationType: 'slide-up',
    // });
  };

  render() {
    return (
      <View style={styles.container}>
        <GoodHeader toggleDrawer={() => toggleDrawer(this.props.componentId)} />
        <SettingsList onItemPress={screen => this.openModal(screen)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
});
