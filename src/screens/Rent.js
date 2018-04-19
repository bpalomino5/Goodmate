/* eslint class-methods-use-this: 0
    react/no-array-index-key: 0
*/

import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Header, Icon, Text, Card, Button } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import FireTools from '../utils/FireTools';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

const months = [
  { value: 'January' },
  { value: 'Feburary' },
  { value: 'March' },
  { value: 'April' },
  { value: 'May' },
  { value: 'June' },
  { value: 'July' },
  { value: 'August' },
  { value: 'September' },
  { value: 'October' },
  { value: 'November' },
  { value: 'December' },
];

const years = [
  { value: '2018' },
  { value: '2019' },
  { value: '2020' },
  { value: '2021' },
  { value: '2022' },
];

const GoodHeader = ({ toggleDrawer, openRentModal }) => (
  <Header
    statusBarProps={{ backgroundColor: '#5B725A' }}
    backgroundColor="#5B725A"
    leftComponent={
      <Icon
        name="menu"
        type="Feather"
        color="white"
        underlayColor="transparent"
        onPress={toggleDrawer}
      />
    }
    centerComponent={{ text: 'Rent', style: { fontSize: 18, color: '#fff' } }}
    rightComponent={
      <Icon
        name="plus"
        type="feather"
        color="white"
        underlayColor="transparent"
        onPress={openRentModal}
      />
    }
  />
);

const DateSelection = ({ updateMonth, updateYear }) => (
  <View style={styles.dateSelection}>
    <Dropdown
      containerStyle={{ flex: 1, marginRight: 7 }}
      label="Month"
      data={months}
      onChangeText={value => updateMonth(value)}
      animationDuration={180}
    />
    <Dropdown
      containerStyle={{ width: 100 }}
      label="Year"
      data={years}
      onChangeText={value => updateYear(value)}
      animationDuration={180}
    />
  </View>
);

const DefaultView = ({ description }) => (
  <View
    style={{
      flex: 1,
      alignItems: 'center',
      marginTop: 200,
    }}
  >
    <Text h4>{description}</Text>
  </View>
);

const RentSheet = ({ base, bills, totals }) => (
  <ScrollView>
    <Card title="Base" titleStyle={{ alignSelf: 'flex-start' }}>
      {base.map((item, i) => (
        <RentCardItem key={i} title={item.type} value={formatter.format(item.value)} />
      ))}
      {/* <RentCardItem title="Monthly Rent" value="$1,843.00" /> */}
      {/* <RentCardItem title="Bedroom 1" value="$501.44" /> */}
    </Card>
    <Card title="Bills" titleStyle={{ alignSelf: 'flex-start' }}>
      {bills.map((item, i) => (
        <RentCardItem key={i} title={item.type} value={formatter.format(item.value)} />
      ))}
      {/* <RentCardItem title="Utilties" value="$22.23" /> */}
      {/* <RentCardItem title="Electricity" value="$22.98" /> */}
      {/* <RentCardItem title="Internet" value="$13.75" /> */}
      {/* <RentCardItem title="Garage" value="$50.00" /> */}
    </Card>
    <Card title="Totals" titleStyle={{ alignSelf: 'flex-start' }}>
      {totals.map((item, i) => (
        <RentCardItem key={i} title={item.section} value={formatter.format(item.value)} />
      ))}
      {/* <RentCardItem title="Avalon" value="$573.67" /> */}
      {/* <RentCardItem title="Bryan Payment" value="$45.96" /> */}
      {/* <RentCardItem title="Final Total" value="$619.63" /> */}
    </Card>
  </ScrollView>
);

const RentCardItem = ({ title, value }) => (
  <View style={styles.rentCardItem}>
    <Text>{title}</Text>
    <Text>{value}</Text>
  </View>
);

export default class Rent extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    statusBarColor: '#5B725A',
  };

  constructor(props) {
    super(props);
    this.state = {
      month: '',
      year: '',
      base: [],
      bills: [],
      totals: [],
      dateSelected: false,
      displayText: 'Please select a date!',
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.openRentModal = this.openRentModal.bind(this);
    this.editRentSheet = this.editRentSheet.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  async componentDidMount() {
    FireTools.init();
  }

  onNavigatorEvent(event) {
    if (event.type === 'DeepLink') {
      if (event.link !== 'goodmate.Rent') {
        this.props.navigator.resetTo({
          screen: event.link,
        });
      }
    }
  }

  async getRentSheet() {
    const { month, year } = this.state;
    const sheetRef = await FireTools.getRent(month, year);
    if (sheetRef) {
      const base = sheetRef.get('base');
      const bills = sheetRef.get('bill');
      const totals = sheetRef.get('totals');
      if (base != null && bills != null && totals != null) {
        this.setState({
          base,
          bills,
          totals,
          dateSelected: true,
        });
      }
    } else {
      this.setState({ dateSelected: false, displayText: 'No rent sheet created yet!' });
    }
  }

  toggleDrawer() {
    this.props.navigator.toggleDrawer({
      side: 'left',
      animated: true,
    });
  }

  openRentModal() {
    this.props.navigator.showModal({
      screen: 'goodmate.AddRentModal',
      animationType: 'slide-up',
    });
  }

  editRentSheet() {
    const { base, bills, totals } = this.state;
    this.props.navigator.showModal({
      screen: 'goodmate.AddRentModal',
      animationType: 'slide-up',
      passProps: {
        base: JSON.stringify(base),
        bills: JSON.stringify(bills),
        totals: JSON.stringify(totals),
      },
    });
  }

  render() {
    if (this.state.month.trim() !== '' && this.state.year.trim() !== '') {
      this.getRentSheet();
    }

    return (
      <View style={styles.container}>
        <GoodHeader toggleDrawer={this.toggleDrawer} openRentModal={this.openRentModal} />
        <DateSelection
          updateMonth={month => this.setState({ month })}
          updateYear={year => this.setState({ year })}
        />
        {this.state.dateSelected ? (
          <View style={{ flex: 1 }}>
            <RentSheet base={this.state.base} bills={this.state.bills} totals={this.state.totals} />
            <Button
              containerStyle={{ marginTop: 10, marginBottom: 20 }}
              title="Edit Rent Sheet "
              buttonStyle={{
                backgroundColor: 'rgba(92, 99,216, 1)',
                width: 300,
                height: 45,
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 5,
              }}
              onPress={this.editRentSheet}
            />
          </View>
        ) : (
          <DefaultView description={this.state.displayText} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3E1DE',
  },
  dateSelection: {
    flex: 0,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
  },
  rentCardItem: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 2,
  },
});
