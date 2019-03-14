/* eslint class-methods-use-this: 0,
    react/no-array-index-key: 0,
    no-param-reassign: 0
*/
import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { StyleSheet, View } from 'react-native';
import {
  Header, Icon, Text, Button,
} from 'react-native-elements';
import FireTools from '../../utils/FireTools';
import DataStore from '../../utils/DataStore';
import { toggleDrawer } from '../../components/navigation';

import RentFilters from './components/RentFilters';
import RentSheet from './components/RentSheet';

const GoodHeader = ({
  toggleDrawer, openRentModal, disabled, primary,
}) => (
  <Header
    statusBarProps={{ backgroundColor: '#546054' }}
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

const RentSheetView = ({
  base,
  bills,
  totals,
  userbase,
  userbills,
  usertotals,
  primary,
  editRentSheet,
}) => (
  <View style={{ flex: 1 }}>
    {primary ? (
      <View style={styles.primaryContainer}>
        <RentSheet base={base} bills={bills} totals={totals} />
        <Button
          containerStyle={styles.buttonContainer}
          title="Edit Rent Sheet "
          buttonStyle={styles.editButton}
          onPress={editRentSheet}
        />
      </View>
    ) : (
      <RentSheet base={userbase} bills={userbills} totals={usertotals} />
    )}
  </View>
);

export default class Rent extends Component {
  state = {
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
    typeViewable: false,
  };

  componentDidMount = async () => {
    FireTools.init();
    const roommates = await FireTools.getRoommates();
    roommates.forEach(mate => {
      if (mate.uid === FireTools.user.uid) {
        this.setState({ primary: mate.primary, typeViewable: mate.primary });
      }
    });

    const date = await DataStore.getData('date');
    if (date) {
      await this.getRentSheet(date.month, date.year);
      this.setState({ month: date.month, year: date.year, dateSelected: true });
    }
  };

  getRentSheet = async (month, year) => {
    await DataStore.storeData('date', { month, year });
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
  };

  reviseRentSheet = (userbase, userbills) => {
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
  };

  openRentModal = () => {
    const { month, year } = this.state;
    const date = { month, year };

    Navigation.showModal({
      component: {
        name: 'AddRentModal',
        passProps: {
          editing: false,
          date: JSON.stringify(date),
          onFinish: this.getRentSheet(month, year),
        },
        options: {
          animationType: 'slide-up',
        },
      },
    });
  };

  editRentSheet = () => {
    const {
      base, bills, month, year,
    } = this.state;
    const date = { month, year };

    Navigation.showModal({
      component: {
        name: 'AddRentModal',
        passProps: {
          editing: true,
          base: JSON.stringify(base),
          bills: JSON.stringify(bills),
          date: JSON.stringify(date),
          onFinish: this.getRentSheet(month, year),
        },
        options: {
          animationType: 'slide-up',
        },
      },
    });
  };

  updateMonth = month => {
    const { year } = this.state;
    if (year.trim() !== '') {
      this.getRentSheet(month, year);
      this.setState({ month, dateSelected: true });
    } else {
      this.setState({ month });
    }
  };

  updateYear = year => {
    const { month } = this.state;
    if (month.trim() !== '') {
      this.getRentSheet(month, year);
      this.setState({ year, dateSelected: true });
    } else {
      this.setState({ year });
    }
  };

  updateType = async type => {
    const { month, year } = this.state;
    if (type.trim() !== '' && month.trim() !== '' && year.trim() !== '') {
      // do something
      if (type === 'Master') {
        this.setState({ primary: true });
        await this.getRentSheet(month, year);
      } else {
        this.setState({ primary: false });
        await this.getRentSheet(month, year);
      }
    }
  };

  render() {
    const { componentId } = this.props;
    const {
      sheetAvailable,
      dateSelected,
      primary,
      typeViewable,
      month,
      year,
      base,
      bills,
      totals,
      displayText,
      userbase,
      userbills,
      usertotals,
    } = this.state;
    return (
      <View style={styles.container}>
        <GoodHeader
          toggleDrawer={() => toggleDrawer(componentId)}
          openRentModal={this.openRentModal}
          disabled={sheetAvailable || dateSelected === false}
          primary={primary}
        />
        <RentFilters
          typeViewable={typeViewable}
          updateMonth={month => this.updateMonth(month)}
          updateYear={year => this.updateYear(year)}
          updateType={type => this.updateType(type)}
          monthVal={month}
          yearVal={year}
        />
        {sheetAvailable ? (
          <RentSheetView
            primary={primary}
            base={base}
            bills={bills}
            totals={totals}
            userbase={userbase}
            userbills={userbills}
            usertotals={usertotals}
            editRentSheet={this.editRentSheet}
          />
        ) : (
          <DefaultView description={displayText} />
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

  primaryContainer: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 10,
    flex: 0,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: 'rgba(92, 99,216, 1)',
    width: 300,
    height: 45,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
  },
});
