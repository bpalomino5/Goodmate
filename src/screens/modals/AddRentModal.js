import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, LayoutAnimation } from 'react-native';
import { Header, Icon, Button, Overlay, Text, Input } from 'react-native-elements';
import RentForm from '../../components/RentForm';

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

const SectionOverlay = ({
  isVisible,
  toggleOverlay,
  sectionValue,
  onChangeText,
  submitSection,
}) => (
  <Overlay
    borderRadius={5}
    overlayStyle={{ padding: 15 }}
    isVisible={isVisible}
    width="auto"
    height="auto"
  >
    <View>
      <Text style={{ fontSize: 24, marginBottom: 5 }}>Add Section</Text>
      <Text style={{ fontSize: 16, color: 'gray', marginBottom: 10 }}>
        Sections are useful for grouping rent & bill items
      </Text>
      <Input
        placeholder="Section Name"
        containerStyle={{ marginBottom: 10 }}
        value={sectionValue}
        onChangeText={text => onChangeText(text)}
      />
    </View>
    <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'flex-end' }}>
      <Button
        title="Add "
        containerStyle={{ marginRight: 5 }}
        onPress={() => {
          toggleOverlay(false);
          submitSection();
        }}
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
      sections: [],
      sectionValue: '',
    };
    this.closeModal = this.closeModal.bind(this);
    this.addSection = this.addSection.bind(this);
    this.submitRent = this.submitRent.bind(this);
  }

  componentDidMount() {
    if (this.props.base !== undefined) {
      this.loadRentData();
    }
  }

  loadRentData() {
    const base = JSON.parse(this.props.base);
    const bills = JSON.parse(this.props.bills);
    const sections = [];
    // update base
    base.forEach(item => {
      if (sections.indexOf(item.section) === -1) {
        sections.push({ value: item.section });
      }
      this.rentRef.setState({
        baseItems: [
          ...this.rentRef.state.baseItems,
          {
            section: item.section,
            type: item.type,
            value: item.value.toString(),
            removable: true,
          },
        ],
      });
    });

    // update bills
    bills.forEach(item => {
      if (sections.indexOf(item.section) === -1) {
        sections.push({ value: item.section });
      }

      this.rentRef.setState({
        billItems: [
          ...this.rentRef.state.billItems,
          {
            section: item.section,
            type: item.type,
            value: item.value.toString(),
            removable: true,
          },
        ],
      });
    });

    // update sections
    console.log(sections);
    this.setState({ sections });
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

  addSection() {
    const value = this.state.sectionValue;
    this.setState({
      sections: [...this.state.sections, { value }],
      sectionValue: '',
    });
  }

  submitRent() {
    this.rentRef.setState({
      baseItems: [
        ...this.rentRef.state.baseItems,
        {
          section: '',
          type: '',
          value: '',
          removable: true,
        },
      ],
    });
    console.log(this.rentRef.state.baseItems);
    console.log(this.rentRef.state.billItems);
  }

  render() {
    return (
      <View style={styles.container}>
        <GoodHeader closeModal={this.closeModal} openOverlay={() => this.toggleOverlay(true)} />
        <View style={styles.InputSection}>
          <ScrollView>
            <RentForm
              sections={this.state.sections}
              ref={refs => {
                this.rentRef = refs;
              }}
            />
          </ScrollView>
        </View>
        <View style={styles.SubmitSection}>
          <Button
            containerStyle={{ marginTop: 20 }}
            title="Submit "
            buttonStyle={{ borderRadius: 30, width: 150, height: 40 }}
            onPress={this.submitRent}
          />
        </View>
        <SectionOverlay
          isVisible={this.state.isOverlayOpen}
          toggleOverlay={toggle => this.toggleOverlay(toggle)}
          sectionValue={this.state.sectionValue}
          onChangeText={text => this.setState({ sectionValue: text })}
          submitSection={this.addSection}
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
