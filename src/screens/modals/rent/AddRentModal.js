/* eslint no-param-reassign:0, react/no-array-index-key:0 */
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, LayoutAnimation, Platform, Keyboard } from 'react-native';
import { Header, Icon, Button, Overlay, Text, Input } from 'react-native-elements';
import RentForm from '../../../components/RentForm';
import FireTools from '../../../utils/FireTools';
import { Navigation } from 'react-native-navigation'

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

const InfoOverlay = ({ isVisible, toggleOverlay, description }) => (
  <Overlay
    borderRadius={5}
    overlayStyle={{ padding: 15 }}
    isVisible={isVisible}
    width="auto"
    height="auto"
  >
    <View>
      <Text style={{ fontSize: 24, marginBottom: 5 }}>Helpful Tip</Text>
      <Text style={{ fontSize: 16, color: 'gray', marginBottom: 10 }}>{description}</Text>
    </View>
    <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'flex-end' }}>
      <Button
        title="Close "
        onPress={() => toggleOverlay(false)}
        buttonStyle={{
          backgroundColor: 'rgba(92, 99,216, 1)',
        }}
      />
    </View>
  </Overlay>
);

const SectionOverlay = ({
  isVisible,
  sectionValue,
  onChangeText,
  onAdd,
  onClose,
}) => (
  <Overlay
    borderRadius={5}
    containerStyle={{ justifyContent: 'flex-start', marginTop: Platform.OS === 'ios' ? 70 : 45 }}
    overlayStyle={{ padding: 15 }}
    isVisible={isVisible}
    width="auto"
    height="auto"
  >
    <View>
      <Text style={{ fontSize: 24, marginBottom: 5 }}>Sections</Text>
      <Text style={{ fontSize: 16, color: 'gray', marginBottom: 10 }}>
        Sections are used for grouping individual base & bill items into added totals. Create at
        least one section to group all your items under one total payment. Assign that section to
        each row under the section dropdown.
      </Text>
      <Text style={{ fontSize: 16, color: 'gray', marginBottom: 10 }}>
        i.e. Apartment Total, Utilities Total
      </Text>
      <Input
        label="Add new section"
        placeholder="Section Name"
        containerStyle={{ marginBottom: 10, marginTop: 15 }}
        value={sectionValue}
        onChangeText={text => onChangeText(text)}
      />
    </View>
    <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'flex-end' }}>
      <Button
        title="Add "
        containerStyle={{ marginRight: 5 }}
        onPress={onAdd}
        buttonStyle={{
          backgroundColor: 'rgba(92, 99,216, 1)',
        }}
      />
      <Button
        title="Close "
        onPress={onClose}
        buttonStyle={{
          backgroundColor: 'rgba(92, 99,216, 1)',
        }}
      />
    </View>
  </Overlay>
);

export default class AddRentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOverlayOpen: false,
      isInfoVisible: false,
      sections: [],
      sectionValue: '',
      description: '',
    };
    this.addSection = this.addSection.bind(this);
    this.openFinishModal = this.openFinishModal.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  componentDidMount() {
    FireTools.init();
    if (this.props.base !== undefined) {
      this.loadRentData();
    }
  }

  onAdd() {
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
  }

  onClose() {
    if (Platform.OS === 'ios') {
      this.toggleOverlay(false);
    } else {
      Keyboard.dismiss();
      setTimeout(() => {
        this.toggleOverlay(false);
      }, 100);
    }
  }

  handleFirstCase(base, bills, sections) {
    // base
    let item = base.shift();
    if (sections.findIndex(s => s.value === item.section) === -1) {
      sections.push({ value: item.section });
    }
    this.rentRef.state.baseItems[0].section = item.section;
    this.rentRef.state.baseItems[0].type = item.type;
    this.rentRef.state.baseItems[0].value = item.value.toString();
    this.rentRef.state.baseItems[0].removable = false;
    this.rentRef.state.baseItems[0].uids = item.uids;

    // bills
    item = bills.shift();
    if (sections.findIndex(s => s.value === item.section) === -1) {
      sections.push({ value: item.section });
    }
    this.rentRef.state.billItems[0].section = item.section;
    this.rentRef.state.billItems[0].type = item.type;
    this.rentRef.state.billItems[0].value = item.value.toString();
    this.rentRef.state.billItems[0].removable = false;
    this.rentRef.state.billItems[0].uids = item.uids;
  }

  loadRentData() {
    const base = JSON.parse(this.props.base);
    const bills = JSON.parse(this.props.bills);
    const sections = [];
    this.handleFirstCase(base, bills, sections);

    // update base
    base.forEach(item => {
      if (sections.findIndex(s => s.value === item.section) === -1) {
        sections.push({ value: item.section });
      }

      this.rentRef.state.baseItems.push({
        section: item.section,
        type: item.type,
        value: item.value.toString(),
        removable: true,
        uids: item.uids,
      });
    });

    // update bills
    bills.forEach(item => {
      if (sections.findIndex(s => s.value === item.section) === -1) {
        sections.push({ value: item.section });
      }

      this.rentRef.state.billItems.push({
        section: item.section,
        type: item.type,
        value: item.value.toString(),
        removable: true,
        uids: item.uids,
      });
    });
    // update sections
    this.setState({ sections });
  }

  closeModal = () => Navigation.dismissModal(this.props.componentId);

  toggleOverlay(open) {
    LayoutAnimation.easeInEaseOut();
    this.setState({ isOverlayOpen: open });
  }

  addSection() {
    const value = this.state.sectionValue;
    this.setState({
      sections: [...this.state.sections, { value }],
      sectionValue: '',
    });
  }

  openFinishModal() {
    const base = JSON.stringify(this.rentRef.state.baseItems);
    const bills = JSON.stringify(this.rentRef.state.billItems);

    Navigation.showModal({
      component: {
        name: 'goodmate.FinishRentModal',
        passProps: {
          base,
          bills,
          date: this.props.date,
          onFinish: this.props.onFinish,
          editing: this.props.editing,
        },
        options: {
          animationType: 'slide-up',
        },
      },
    });
  }

  infoPress(t) {
    let description = '';
    if (t === 'base') {
      description =
        "Base items are used to show values that don't change per month such as bedroom prices.\ni.e. Bedroom 1: $500, Master Bedroom: $1000";
    } else {
      description =
        'Bill items are used to show the rent values that do change per month such as utility bills.\n i.e. Electricity: $50, Internet: $100';
    }
    this.setState({ isInfoVisible: true, description });
  }

  infoToggle(open) {
    LayoutAnimation.easeInEaseOut();
    this.setState({ isInfoVisible: open });
  }

  render() {
    return (
      <View style={styles.container}>
        <GoodHeader closeModal={this.closeModal} openOverlay={() => this.toggleOverlay(true)} />
        <View style={styles.InputSection}>
          <ScrollView>
            <RentForm
              sections={this.state.sections}
              infoPress={t => this.infoPress(t)}
              ref={refs => {
                this.rentRef = refs;
              }}
            />
          </ScrollView>
        </View>
        {!this.state.isOverlayOpen && (
          <View style={styles.SubmitSection}>
            <Button
              containerStyle={{ alignSelf: 'center' }}
              title="Next "
              buttonStyle={{
                backgroundColor: 'rgba(92, 99,216, 1)',
                width: 300,
                height: 45,
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 5,
              }}
              onPress={this.openFinishModal}
            />
          </View>
        )}

        <SectionOverlay
          isVisible={this.state.isOverlayOpen}
          sectionValue={this.state.sectionValue}
          onChangeText={text => this.setState({ sectionValue: text })}
          onAdd={this.onAdd}
          onClose={this.onClose}
        />
        <InfoOverlay
          isVisible={this.state.isInfoVisible}
          toggleOverlay={toggle => this.infoToggle(toggle)}
          description={this.state.description}
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
    marginTop: 20,
  },
});
