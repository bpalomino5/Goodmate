/* eslint class-methods-use-this: 0,
    react/no-array-index-key: 0,
    no-param-reassign: 0
*/
import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { StyleSheet, View, LayoutAnimation } from 'react-native';
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
  base, bills, totals, primary, editRentSheet,
}) => (
  <View style={{ flex: 1 }}>
    <View style={styles.primaryContainer}>
      <RentSheet base={base} bills={bills} totals={totals} />
      {primary && (
        <Button
          containerStyle={styles.buttonContainer}
          title="Edit Rent Sheet "
          buttonStyle={styles.editButton}
          onPress={editRentSheet}
        />
      )}
    </View>
  </View>
);

class Rent extends Component {
  state = {
    month: '',
    year: '',
    base: [],
    bills: [],
    totals: [],
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
      this.setState({ month: date.month, year: date.year });
    }
  };

  prepRentData = data => {
    const rent = [];
    data.forEach((item, i) => {
      if (i > 0) {
        rent.push({ ...item, removable: true, value: item.value.toString() });
      } else {
        rent.push({ ...item, removable: false, value: item.value.toString() });
      }
    });
    return rent;
  };

  getRentSheet = async (month, year) => {
    await DataStore.storeData('date', { month, year });
    const { primary } = this.state;
    const sheetRef = await FireTools.getRent(month, year);
    if (sheetRef) {
      const base = this.prepRentData(sheetRef.get('base'));
      const bills = this.prepRentData(sheetRef.get('bills'));
      const totals = sheetRef.get('totals');
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
          this.getPersonalSheet();
        }
      }
    } else {
      this.setState({ base: [], bills: [], totals: [], sheetAvailable: false, displayText: 'No rent sheet created yet!' });
    }
  };

  getPersonalSheet = () => {
    const { base, bills } = this.state;
    const personalTotals = [];

    base.forEach((item, i) => {
      const index = personalTotals.findIndex(t => t.section === item.section);
      const ids = Object.values(item.uids);
      if (ids.length > 0) {
        if (ids.indexOf(FireTools.user.uid) === -1) {
          // do not display
          delete base[i];
        } else {
          // divide by length
          base[i].value = item.value / ids.length;

          if (index === -1) {
            personalTotals.push({ value: base[i].value, section: item.section });
          } else {
            personalTotals[index].value += base[i].value;
          }
        }
      }
    });

    bills.forEach((item, i) => {
      const index = personalTotals.findIndex(t => t.section === item.section);
      const ids = Object.values(item.uids);
      if (ids.indexOf(FireTools.user.uid) === -1) {
        // do not display
        delete bills[i];
      } else {
        bills[i].value = item.value / ids.length;

        if (index === -1) {
          personalTotals.push({ value: bills[i].value, section: item.section });
        } else {
          personalTotals[index].value += bills[i].value;
        }
      }
    });

    this.setState({ totals: personalTotals, sheetAvailable: true });
  };

  openRentModal = () => {
    const { month, year } = this.state;
    const date = { month, year };
    const base = [
      {
        section: '',
        type: '',
        value: '',
        removable: false,
        uids: {},
      },
    ];
    const bills = [
      {
        section: '',
        type: '',
        value: '',
        removable: false,
        uids: {},
      },
    ];

    Navigation.showModal({
      component: {
        name: 'AddRentModal',
        passProps: {
          editing: false,
          date,
          base,
          bills,
          onFinish: () => this.getRentSheet(month, year)
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
          base,
          bills,
          date,
          onFinish: () => this.getRentSheet(month, year)
        },
        options: {
          animationType: 'slide-up',
        },
      },
    });
  };

  updateMonth = async month => {
    const { year } = this.state;
    if (year.trim() !== '') {
      await this.getRentSheet(month, year);
    }
    this.setState({ month });
  };

  updateYear = async year => {
    const { month } = this.state;
    if (month.trim() !== '') {
      await this.getRentSheet(month, year);
    }
    this.setState({ year });
  };

  updateType = async type => {
    const { month, year } = this.state;
    if (type.trim() !== '' && month.trim() !== '' && year.trim() !== '') {
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
      primary,
      typeViewable,
      month,
      year,
      base,
      bills,
      totals,
      displayText,
    } = this.state;
    const dateSelected = month !== '' && year !== '';
    return (
      <View style={styles.container}>
        <GoodHeader
          toggleDrawer={() => toggleDrawer(componentId)}
          openRentModal={this.openRentModal}
          disabled={sheetAvailable || dateSelected === false}
          primary={primary}
        />
        <RentFilters
          isGroupPrimary={typeViewable}
          updateMonth={this.updateMonth}
          updateYear={this.updateYear}
          updateType={this.updateType}
          monthVal={month}
          yearVal={year}
        />
        {sheetAvailable ? (
          <RentSheetView
            primary={primary}
            base={base}
            bills={bills}
            totals={totals}
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

export default Rent;
