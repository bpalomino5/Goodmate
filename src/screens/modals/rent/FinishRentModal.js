/* eslint react/no-array-index-key:0 */
import 'intl';
import 'intl/locale-data/jsonp/en';
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { Button, Header, Icon, Text, Divider, Overlay, CheckBox } from 'react-native-elements';
import FireTools from '../../../utils/FireTools';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

const GoodHeader = ({ closeModal, infoPress }) => (
  <Header
    statusBarProps={{ backgroundColor: '#5B725A' }}
    backgroundColor="#5B725A"
    leftComponent={
      <Icon name="arrow-back" color="white" underlayColor="transparent" onPress={closeModal} />
    }
    centerComponent={{ text: 'Assign & Finish', style: { fontSize: 18, color: '#fff' } }}
    rightComponent={
      <Icon
        name="info"
        type="feather"
        color="white"
        underlayColor="transparent"
        onPress={() => infoPress(true)}
      />
    }
  />
);

const InfoOverlay = ({ toggleOverlay, isVisible }) => (
  <Overlay
    borderRadius={5}
    overlayStyle={{ padding: 15 }}
    isVisible={isVisible}
    width="auto"
    height="auto"
  >
    <View>
      <Text style={{ fontSize: 24, marginBottom: 5 }}>About Assign</Text>
      <Text style={{ fontSize: 16, color: 'gray', marginBottom: 10 }}>
        Rent items can be divided evenly in price amongst specific roommates. If no assignment is
        made the item will be displayed to all but not included in totals. Select an item to get
        started.
      </Text>
    </View>
    <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'flex-end' }}>
      <Button title="Close " onPress={() => toggleOverlay(false)} />
    </View>
  </Overlay>
);

const AssignmentOverlay = ({
  isVisible, toggleOverlay, roommates, onCheckPress, dataItem,
}) => (
  <Overlay
    borderRadius={5}
    overlayStyle={{ padding: 15 }}
    isVisible={isVisible}
    width="auto"
    height="auto"
  >
    <View>
      <Text style={{ fontSize: 24, marginBottom: 5 }}>Assign to Roommates</Text>
      <Text style={{ fontSize: 16, color: 'gray', marginBottom: 10 }}>
        Select the roommates you want to divide this item by
      </Text>
      {roommates.map((item, i) => (
        <View key={i}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CheckBox
              onPress={() => onCheckPress(item)}
              checked={dataItem.uids !== undefined ? item.first in dataItem.uids : null}
            />
            <Text style={{ fontSize: 20 }}>{item.first}</Text>
          </View>
        </View>
      ))}
    </View>
    <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'flex-end' }}>
      <Button title="Close " onPress={() => toggleOverlay(false)} />
    </View>
  </Overlay>
);

const RentSheet = ({ base, bills, onItemPress }) => (
  <ScrollView>
    <View style={{ flex: 1 }}>
      {base.map((item, i) => (
        <SheetItem key={i} data={item} onPress={() => onItemPress(i, 'base')} />
      ))}
      {bills.map((item, i) => (
        <SheetItem key={i} data={item} onPress={() => onItemPress(i, 'bills')} />
      ))}
    </View>
  </ScrollView>
);

const SheetItem = ({ data, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={{ padding: 5 }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ alignSelf: 'center', margin: 10, width: 65 }}>
          <Text style={{ fontSize: 20 }}>{data.section}</Text>
        </View>
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={{ fontSize: 20, marginBottom: 4 }}>{data.type}</Text>
          <View style={{ flexDirection: 'row' }}>
            {Object.keys(data.uids).map((item, i) => (
              <Text key={i} style={{ fontSize: 14, color: 'grey' }}>
                {item}{' '}
              </Text>
            ))}
          </View>
        </View>
        <View
          style={{
            flex: 0,
            marginRight: 10,
            alignItems: 'center',
            justifyContent: 'center',
            width: 90,
          }}
        >
          <Text style={{ fontSize: 18 }}>{formatter.format(data.value)}</Text>
        </View>
      </View>
    </View>
    <Divider style={{ backgroundColor: 'grey' }} />
  </TouchableOpacity>
);

export default class FinishRentModal extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    statusBarColor: '#5B725A',
  };

  constructor(props) {
    super(props);
    this.state = {
      baseItems: [],
      billItems: [],
      isVisible: false,
      roommates: [],
      dataItem: {},
      infoVisible: false,
    };
    this.closeModal = this.closeModal.bind(this);
    this.submitRent = this.submitRent.bind(this);
  }

  async componentWillMount() {
    FireTools.init();
    if (this.props.base !== undefined) {
      const base = JSON.parse(this.props.base);
      const bills = JSON.parse(this.props.bills);
      this.setState({ baseItems: base });
      this.setState({ billItems: bills });
    }

    const roommates = await FireTools.getRoommates();
    this.setState({ roommates });
  }

  onCheckPress(item) {
    const { dataItem } = this.state;
    // check if uids is already assigned
    if (item.first in dataItem.uids) {
      // remove uid
      delete dataItem.uids[item.first];
    } else {
      // add uid
      dataItem.uids[item.first] = item.uid;
    }
    this.forceUpdate();
  }

  closeModal() {
    this.props.navigator.dismissModal({
      animationType: 'slide-down',
    });
  }

  async submitRent() {
    const base = [];
    const bills = [];
    const totals = [];
    const date = JSON.parse(this.props.date);

    const { baseItems, billItems } = this.state;
    // strip removables from data and calc totals
    baseItems.forEach(item => {
      const index = totals.findIndex(t => t.section === item.section);
      if (index === -1) {
        // not in totals, add to totals
        if (Object.keys(item.uids).length > 0) {
          // assigned, add to totals
          totals.push({ value: parseFloat(item.value), section: item.section });
        }
      } else {
        // in totals, update totals
        totals[index].value += parseFloat(item.value);
      }
      base.push({
        section: item.section,
        value: parseFloat(item.value),
        type: item.type,
        uids: item.uids,
      });
    });

    billItems.forEach(item => {
      const index = totals.findIndex(t => t.section === item.section);
      if (index === -1) {
        if (Object.keys(item.uids).length > 0) {
          // assigned, add to totals
          totals.push({ value: parseFloat(item.value), section: item.section });
        }
      } else {
        totals[index].value += parseFloat(item.value);
      }
      bills.push({
        section: item.section,
        value: parseFloat(item.value),
        type: item.type,
        uids: item.uids,
      });
    });

    // send to firestore
    const rentSheet = {
      base,
      bills,
      totals,
      date,
    };
    // console.log(rentSheet);
    await FireTools.submitRent(rentSheet);
    this.props.onFinish();
    this.props.navigator.dismissAllModals({
      animationType: 'slide-down',
    });
  }

  openOverlay(i, name) {
    if (name === 'base') {
      this.setState({ dataItem: this.state.baseItems[i] });
    } else {
      this.setState({ dataItem: this.state.billItems[i] });
    }

    this.setState({ isVisible: true });
  }

  toggleOverlay(toggle) {
    this.setState({ isVisible: toggle });
  }

  displayInfoOverlay(toggle) {
    this.setState({ infoVisible: toggle });
  }

  render() {
    const {
      isVisible, baseItems, billItems, roommates, dataItem, infoVisible,
    } = this.state;
    return (
      <View style={styles.container}>
        <GoodHeader closeModal={this.closeModal} infoPress={t => this.displayInfoOverlay(t)} />
        <RentSheet
          base={baseItems}
          bills={billItems}
          onItemPress={(i, name) => this.openOverlay(i, name)}
        />
        <AssignmentOverlay
          isVisible={isVisible}
          toggleOverlay={t => this.toggleOverlay(t)}
          roommates={roommates}
          dataItem={dataItem}
          onCheckPress={item => this.onCheckPress(item)}
        />
        <InfoOverlay isVisible={infoVisible} toggleOverlay={t => this.displayInfoOverlay(t)} />
        <View style={styles.SubmitSection}>
          <Button
            containerStyle={{ marginTop: 20 }}
            title="Submit "
            buttonStyle={{
              backgroundColor: 'rgba(92, 99,216, 1)',
              width: 300,
              height: 45,
              borderColor: 'transparent',
              borderWidth: 0,
              borderRadius: 5,
            }}
            onPress={this.submitRent}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  SubmitSection: {
    flex: 0,
    padding: 10,
  },
});
