/* eslint class-methods-use-this: 0,
    react/no-array-index-key: 0,
    no-param-reassign: 0
*/

import 'intl';
import 'intl/locale-data/jsonp/en';
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

const GoodHeader = ({
  toggleDrawer, openRentModal, disabled, primary,
}) => (
  <Header
    statusBarProps={{ backgroundColor: '#546054' }}
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
      primary ? (
        <Icon
          name="doc"
          type="simple-line-icon"
          color={disabled ? 'grey' : 'white'}
          underlayColor="transparent"
          onPress={disabled ? null : openRentModal}
        />
      ) : null
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
    </Card>
    <Card title="Bills" titleStyle={{ alignSelf: 'flex-start' }}>
      {bills.map((item, i) => (
        <RentCardItem key={i} title={item.type} value={formatter.format(item.value)} />
      ))}
    </Card>
    <Card title="Totals" titleStyle={{ alignSelf: 'flex-start' }}>
      {totals.map((item, i) => (
        <RentCardItem key={i} title={item.section} value={formatter.format(item.value)} />
      ))}
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
    statusBarColor: '#546054',
  };

  constructor(props) {
    super(props);
    this.state = {
      dateSelected: false,
      month: '',
      year: '',
      base: [],
      bills: [],
      totals: [],
      userbase: [],
      userbills: [],
      usertotals: [],
      sheetAvailable: false,
      displayText: 'Please select a date!',
      primary: false,
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.openRentModal = this.openRentModal.bind(this);
    this.editRentSheet = this.editRentSheet.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  async componentDidMount() {
    FireTools.init();
    const roommates = await FireTools.getRoommates();
    roommates.forEach(mate => {
      if (mate.uid === FireTools.user.uid) {
        this.setState({ primary: mate.primary });
      }
    });
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

  async getRentSheet(month, year) {
    const { primary } = this.state;
    const sheetRef = await FireTools.getRent(month, year);
    if (sheetRef) {
      const base = sheetRef.get('base');
      const bills = sheetRef.get('bills');
      const totals = sheetRef.get('totals');
      const userbase = sheetRef.get('base');
      const userbills = sheetRef.get('bills');
      if (base != null && bills != null && totals != null) {
        if (primary) {
          // display master sheet
          this.setState({
            base,
            bills,
            totals,
            sheetAvailable: true,
          });
        } else {
          // display normal user sheet
          this.reviseRentSheet(userbase, userbills);
        }
      }
    } else {
      this.setState({ sheetAvailable: false, displayText: 'No rent sheet created yet!' });
    }
  }

  reviseRentSheet(userbase, userbills) {
    const usertotals = [];

    userbase.forEach((item, i) => {
      const index = usertotals.findIndex(t => t.section === item.section);
      const ids = Object.values(item.uids);
      if (ids.length > 0) {
        if (ids.indexOf(FireTools.user.uid) === -1) {
          // do not display
          delete userbase[i];
        } else {
          // divide by length
          userbase[i].value = item.value / ids.length;

          if (index === -1) {
            usertotals.push({ value: userbase[i].value, section: item.section });
          } else {
            usertotals[index].value += userbase[i].value;
          }
        }
      }
    });

    userbills.forEach((item, i) => {
      const index = usertotals.findIndex(t => t.section === item.section);
      const ids = Object.values(item.uids);
      if (ids.indexOf(FireTools.user.uid) === -1) {
        // do not display
        delete userbills[i];
      } else {
        userbills[i].value = item.value / ids.length;

        if (index === -1) {
          usertotals.push({ value: userbills[i].value, section: item.section });
        } else {
          usertotals[index].value += userbills[i].value;
        }
      }
    });

    this.setState({
      userbase,
      userbills,
      usertotals,
      sheetAvailable: true,
    });
  }

  toggleDrawer() {
    this.props.navigator.toggleDrawer({
      side: 'left',
      animated: true,
    });
  }

  openRentModal() {
    const { month, year } = this.state;
    const date = { month, year };

    this.props.navigator.showModal({
      screen: 'goodmate.AddRentModal',
      animationType: 'slide-up',
      passProps: {
        date: JSON.stringify(date),
        onFinish: () => this.getRentSheet(month, year),
      },
    });
  }

  editRentSheet() {
    const {
      base, bills, month, year,
    } = this.state;
    const date = { month, year };

    this.props.navigator.showModal({
      screen: 'goodmate.AddRentModal',
      animationType: 'slide-up',
      passProps: {
        base: JSON.stringify(base),
        bills: JSON.stringify(bills),
        date: JSON.stringify(date),
        onFinish: () => this.getRentSheet(month, year),
      },
    });
  }

  updateMonth(month) {
    const { year } = this.state;
    if (year.trim() !== '') {
      this.getRentSheet(month, year);
      this.setState({ month, dateSelected: true });
    } else {
      this.setState({ month });
    }
  }

  updateYear(year) {
    const { month } = this.state;
    if (month.trim() !== '') {
      this.getRentSheet(month, year);
      this.setState({ year, dateSelected: true });
    } else {
      this.setState({ year });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <GoodHeader
          toggleDrawer={this.toggleDrawer}
          openRentModal={this.openRentModal}
          disabled={this.state.sheetAvailable || this.state.dateSelected === false}
          primary={this.state.primary}
        />
        <DateSelection
          updateMonth={month => this.updateMonth(month)}
          updateYear={year => this.updateYear(year)}
        />
        {this.state.sheetAvailable ? (
          <View style={{ flex: 1 }}>
            {this.state.primary ? (
              <View style={styles.primaryContainer}>
                <RentSheet
                  base={this.state.base}
                  bills={this.state.bills}
                  totals={this.state.totals}
                />
                <Button
                  containerStyle={{ marginTop: 10, marginBottom: 10 }}
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
              <RentSheet
                base={this.state.userbase}
                bills={this.state.userbills}
                totals={this.state.usertotals}
              />
            )}
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
  primaryContainer: {
    flex: 1,
  },
});
