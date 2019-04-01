import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

const OptionButton = ({ title, titleStyle, onPress }) => (
  <Button
    type="clear"
    activeOpacity={0.7}
    onPress={onPress}
    containerStyle={{ flex: 1 }}
    titleStyle={[styles.categoryText, { titleStyle } && styles.selectedCategoryText]}
    title={title}
  />
);

const OptionSelector = ({ isLoginPage, isSignUpPage, selectCategory }) => (
  <>
    <View style={{ flexDirection: 'row' }}>
      <OptionButton title="Login " titleStyle={isLoginPage} onPress={() => selectCategory(0)} />
      <OptionButton title="Sign up " titleStyle={isSignUpPage} onPress={() => selectCategory(1)} />
    </View>
    <BubbleArea isLoginPage={isLoginPage} isSignUpPage={isSignUpPage} />
  </>
);

const TabSelector = ({ selected }) => (
  <View style={styles.selectorContainer}>
    <View style={selected && styles.selected} />
  </View>
);

const BubbleArea = ({ isLoginPage, isSignUpPage }) => (
  <View style={styles.rowSelector}>
    <TabSelector selected={isLoginPage} />
    <TabSelector selected={isSignUpPage} />
  </View>
);

const styles = StyleSheet.create({
  rowSelector: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectorContainer: {
    flex: 1,
    alignItems: 'center',
  },
  selected: {
    position: 'absolute',
    borderRadius: 50,
    height: 0,
    width: 0,
    top: -5,
    borderRightWidth: 70,
    borderBottomWidth: 70,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  categoryText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    backgroundColor: 'transparent',
    opacity: 0.54,
  },
  selectedCategoryText: {
    opacity: 1,
  },
});

export default OptionSelector;
