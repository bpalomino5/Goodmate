/* eslint no-param-reassign:0, react/no-array-index-key:0 */
import React, { Component } from 'react';
import {
  StyleSheet, View, ScrollView, LayoutAnimation, Platform, Keyboard,
} from 'react-native';
import { Header, Icon, Button } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import FireTools from '../../../../../utils/FireTools';

import RentForm from './RentForm/RentForm';
import InfoOverlay from './InfoOverlay';
import SectionOverlay from './SectionOverlay';

const GoodHeader = ({ closeModal, openOverlay }) => (
  <Header
    statusBarProps={{ backgroundColor: '#546054' }}
    backgroundColor="#5B725A"
    leftComponent={
      <Icon name="arrow-back" color="white" underlayColor="transparent" onPress={closeModal} />
    }
    centerComponent={{ text: 'Create Rent Sheet', style: { fontSize: 18, color: '#fff' } }}
    rightComponent={
      <Icon name="add" color="white" underlayColor="transparent" onPress={openOverlay} />
    }
  />
);

getSections = (base, bills) => {
  const sections = [];

  base.forEach(item => {
    if (sections.findIndex(s => s.value === item.section) === -1) {
      sections.push({ value: item.section });
    }
  });

  bills.forEach(item => {
    if (sections.findIndex(s => s.value === item.section) === -1) {
      sections.push({ value: item.section });
    }
  });

  return sections;
};

const NextButton = ({ isOverlayOpen, onPress }) => (
  <>
    {!isOverlayOpen && (
      <View style={styles.SubmitSection}>
        <Button
          containerStyle={{ alignSelf: 'center' }}
          title="Next "
          buttonStyle={styles.nextButton}
          onPress={onPress}
        />
      </View>
    )}
  </>
);

const RentSheet = ({
  base, bills, sections, addItem, removeItem, updateItem, infoPress,
}) => (
  <View style={styles.InputSection}>
    <ScrollView>
      <RentForm
        base={base}
        bills={bills}
        sections={sections}
        addItem={addItem}
        removeItem={removeItem}
        updateItem={updateItem}
        infoPress={infoPress}
      />
    </ScrollView>
  </View>
);

class AddRentModal extends Component {
  state = {
    isOverlayOpen: false,
    isInfoVisible: false,
    sections: [],
    sectionValue: '',
    description: '',
    base: [],
    bills: [],
  };

  componentDidMount = () => {
    FireTools.init();
    const { base, bills } = this.props;
    const sections = getSections(base, bills);
    this.setState({ base, bills, sections });
  };

  onAdd = () => {
    if (Platform.OS === 'ios') {
      this.toggleOverlay(false);
      this.addSection();
    } else {
      Keyboard.dismiss();
      setTimeout(() => {
        this.toggleOverlay(false);
        this.addSection();
      }, 100);
    }
  };

  onClose = () => {
    if (Platform.OS === 'ios') {
      this.toggleOverlay(false);
    } else {
      Keyboard.dismiss();
      setTimeout(() => {
        this.toggleOverlay(false);
      }, 100);
    }
  };

  closeModal = () => Navigation.dismissModal(this.props.componentId);

  toggleOverlay = open => {
    LayoutAnimation.easeInEaseOut();
    this.setState({ isOverlayOpen: open });
  };

  addSection = () => {
    const { sectionValue } = this.state;
    this.setState(prevState => ({
      sections: [...prevState.sections, { value: sectionValue }],
      sectionValue: '',
    }));
  };

  openFinishModal = () => {
    const { base, bills } = this.state;
    const { date, editing, onFinish } = this.props;

    Navigation.showModal({
      component: {
        name: 'FinishRentModal',
        passProps: {
          base,
          bills,
          date,
          editing,
          onFinish,
        },
        options: {
          animationType: 'slide-up',
        },
      },
    });
  };

  infoPress = type => {
    let description = '';
    if (type === 'base') {
      description = "Base items are used to show values that don't change per month such as bedroom prices.\ni.e. Bedroom 1: $500, Master Bedroom: $1000";
    } else {
      description = 'Bill items are used to show the rent values that do change per month such as utility bills.\n i.e. Electricity: $50, Internet: $100';
    }
    this.setState({ isInfoVisible: true, description });
  };

  infoToggle = open => {
    LayoutAnimation.easeInEaseOut();
    this.setState({ isInfoVisible: open });
  };

  addItem = key => {
    LayoutAnimation.easeInEaseOut();
    this.setState(prevState => ({
      [key]: [
        ...prevState[key],
        {
          section: '',
          type: '',
          value: '',
          removable: true,
          uids: {},
        },
      ],
    }));
  };

  removeItem = (key, index) => {
    LayoutAnimation.easeInEaseOut();
    this.setState(prevState => ({
      [key]: prevState[key].filter((_, i) => i !== index),
    }));
  };

  updateItem = (key, index, prop, value) => {
    const rentData = [...this.state[key]];
    rentData[index] = { ...rentData[index], [prop]: value };
    this.setState({ [key]: rentData });
  };

  render() {
    const {
      sections,
      isOverlayOpen,
      sectionValue,
      isInfoVisible,
      description,
      base,
      bills,
    } = this.state;
    return (
      <View style={styles.container}>
        <GoodHeader closeModal={this.closeModal} openOverlay={() => this.toggleOverlay(true)} />
        <RentSheet
          base={base}
          bills={bills}
          sections={sections}
          addItem={this.addItem}
          removeItem={this.removeItem}
          updateItem={this.updateItem}
          infoPress={this.infoPress}
        />
        <NextButton isOverlayOpen={isOverlayOpen} onPress={this.openFinishModal} />
        <SectionOverlay
          isVisible={isOverlayOpen}
          sectionValue={sectionValue}
          onChangeText={text => this.setState({ sectionValue: text })}
          onAdd={this.onAdd}
          onClose={this.onClose}
        />
        <InfoOverlay
          isVisible={isInfoVisible}
          toggleOverlay={this.infoToggle}
          description={description}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3E1DE',
  },
  InputSection: {
    flex: 1,
  },
  SubmitSection: {
    flex: 0,
    padding: 10,
    marginTop: 0,
    backgroundColor: 'white',
  },
  nextButton: {
    backgroundColor: 'rgba(92, 99,216, 1)',
    width: 300,
    height: 45,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
  },
});

export default AddRentModal;
