import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, LayoutAnimation } from 'react-native';
import { Header, Icon, Button, Overlay, Text, Input } from 'react-native-elements';
import RentForm from './RentForm';

const GoodHeader = ({ closeModal, openOverlay }) => (
  <Header
    statusBarProps={{ backgroundColor: '#5B725A' }}
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

const SectionOverlay = ({ isVisible, toggleOverlay }) => (
  <Overlay isVisible={isVisible} width="auto" height="auto">
    <View>
      <Text style={{ fontSize: 24, marginBottom: 5 }}>Add Section</Text>
      <Text style={{ fontSize: 16, color: 'gray', marginBottom: 10 }}>
        Sections are useful for grouping rent & bill items
      </Text>
      <Input placeholder="Section Name" containerStyle={{ marginBottom: 10 }} />
    </View>
    <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'flex-end' }}>
      <Button
        title="Add "
        containerStyle={{ marginRight: 5 }}
        onPress={() => toggleOverlay(false)}
      />
      <Button title="Close " onPress={() => toggleOverlay(false)} />
    </View>
  </Overlay>
);

export default class AddRentModal extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    statusBarColor: '#5B725A',
  };

  constructor(props) {
    super(props);
    this.state = {
      isOverlayOpen: false,
    };
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.props.navigator.dismissModal({
      animationType: 'slide-down',
    });
  }

  toggleOverlay(open) {
    LayoutAnimation.easeInEaseOut();
    this.setState({ isOverlayOpen: open });
  }

  render() {
    return (
      <View style={styles.container}>
        <GoodHeader closeModal={this.closeModal} openOverlay={() => this.toggleOverlay(true)} />
        <View style={styles.InputSection}>
          <ScrollView>
            <RentForm />
          </ScrollView>
        </View>
        <View style={styles.SubmitSection}>
          <Button
            containerStyle={{ marginTop: 20 }}
            title="Submit "
            buttonStyle={{ borderRadius: 30, width: 150, height: 40 }}
          />
        </View>
        <SectionOverlay
          isVisible={this.state.isOverlayOpen}
          toggleOverlay={toggle => this.toggleOverlay(toggle)}
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
  },
});
