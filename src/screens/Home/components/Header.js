import React from 'react';
import { Header, Icon } from 'react-native-elements';

const HomeHeader = ({ toggleDrawer, openActivityModal }) => (
  <Header
    statusBarProps={{ backgroundColor: '#546054', barStyle: 'light-content' }}
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
    centerComponent={{ text: 'Home', style: { fontSize: 18, color: '#fff' } }}
    rightComponent={(
      <Icon
        name="pencil"
        type="entypo"
        color="white"
        underlayColor="transparent"
        onPress={openActivityModal}
      />
)}
  />
);

export default HomeHeader;
