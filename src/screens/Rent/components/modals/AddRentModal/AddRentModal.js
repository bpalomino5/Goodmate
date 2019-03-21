/* eslint no-param-reassign:0, react/no-array-index-key:0 */
import React, { Component } from 'react';
import { StyleSheet, View, LayoutAnimation } from 'react-native';
import { Header, Icon, Button } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import FireTools from '../../../../../utils/FireTools';

import RentSheet from './RentSheet/RentSheet';
import AddOverlay from './AddOverlay';

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

const NextButton = ({ onPress }) => (
  <View style={styles.SubmitSection}>
    <Button
      containerStyle={{ alignSelf: 'center' }}
      title="Next "
      buttonStyle={styles.nextButton}
      onPress={onPress}
    />
  </View>
);

class AddRentModal extends Component {
  state = {
    isAddOverlay: false,
    main: [],
    utilities: [],
    dataItem: {},
    group: 'main',
    isEditing: false,
  };

  componentDidMount = () => {
    FireTools.init();
    const { main, utilities } = this.props;
    this.setState({ main, utilities });
  };

  closeModal = () => Navigation.dismissModal(this.props.componentId);

  toggleOverlay = open => {
    LayoutAnimation.easeInEaseOut();
    this.setState({ isAddOverlay: open });
  };

  openFinishModal = () => {
    const { main, utilities } = this.state;
    const { date, editing, onFinish } = this.props;

    Navigation.showModal({
      component: {
        name: 'FinishRentModal',
        passProps: {
          main,
          utilities,
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

  addItem = () => {
    const {
      dataItem: { section, value, type },
      group,
    } = this.state;

    LayoutAnimation.easeInEaseOut();
    this.setState(prevState => ({
      [group]: [
        ...prevState[group],
        {
          section,
          type,
          value,
          uids: {},
        },
      ],
    }));

    this.toggleOverlay(false);
  };

  removeItem = () => {
    const { index, group } = this.state;
    LayoutAnimation.easeInEaseOut();
    this.setState(prevState => ({
      [group]: prevState[group].filter((_, i) => i !== index),
      isAddOverlay: false,
    }));
  };

  openAddOverlay = () => {
    this.toggleOverlay(true);
    this.setState({
      dataItem: {
        section: '',
        type: '',
        value: '',
        uids: {},
      },
      isEditing: false,
    });
  };

  openEditOverlay = (index, name) => {
    const { main, utilities } = this.state;
    if (name === 'main') {
      this.setState({ dataItem: main[index], index, group: 'main' });
    } else {
      this.setState({ dataItem: utilities[index], index, group: 'utilities' });
    }
    this.setState({ isEditing: true, isAddOverlay: true });
  };

  onChangeText = (text, type) => {
    const { dataItem } = this.state;
    if (type === 'group') {
      this.setState({ group: text });
    } else {
      dataItem[type] = text;
      this.setState({ dataItem });
    }
  };

  render() {
    const {
      isAddOverlay, main, utilities, dataItem, isEditing, group,
    } = this.state;
    return (
      <View style={styles.container}>
        <GoodHeader closeModal={this.closeModal} openOverlay={this.openAddOverlay} />
        <RentSheet main={main} utilities={utilities} onItemPress={this.openEditOverlay} />
        <NextButton onPress={this.openFinishModal} />
        <AddOverlay
          isEditing={isEditing}
          isVisible={isAddOverlay}
          group={group}
          onAdd={this.addItem}
          onRemove={this.removeItem}
          onClose={() => this.toggleOverlay(false)}
          dataItem={dataItem}
          onChangeText={this.onChangeText}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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