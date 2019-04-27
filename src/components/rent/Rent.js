import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Text } from "react-native-elements";
import { getData, storeData } from "../../datastore";
import { db, auth } from "../../firebase";

import RentFilters from "./components/RentFilters";
import RentSheet from "./components/RentSheet";

const DefaultView = ({ description }) => (
  <View
    style={{
      flex: 1,
      alignItems: "center",
      marginTop: 200
    }}
  >
    <Text h4>{description}</Text>
  </View>
);

const RentSheetView = ({ main, utilities, totals }) => (
  <View style={styles.primaryContainer}>
    <RentSheet main={main} utilities={utilities} totals={totals} />
  </View>
);

class Rent extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: "Rent   ",
      headerBackTitle: null,
      headerRight: (
        <>
          {!params.disabled && (
            <Icon
              containerStyle={{ marginRight: 10 }}
              name="doc"
              type="simple-line-icon"
              color="white"
              underlayColor="transparent"
              onPress={() =>
                navigation.navigate("AddRentModal", {
                  getBills: navigation.getParam("getBills"),
                  getDate: navigation.getParam("getDate"),
                  finishRent: navigation.getParam("finishRent")
                })
              }
            />
          )}
        </>
      )
    };
  };

  state = {
    month: "",
    year: "",
    main: [],
    utilities: [],
    totals: [],
    sheetAvailable: false,
    displayText: "Please select a date!",
    primary: false,
    typeViewable: false
  };

  componentDidMount = async () => {
    const roommates = await db.getRoommates();
    roommates.forEach(mate => {
      if (auth.isAuthUser(mate.uid)) {
        this.setState({ primary: mate.primary, typeViewable: mate.primary });
      }
    });
    const date = await getData("date");
    if (date) {
      await this.getRentSheet(date.month, date.year);
      this.setState({ month: date.month, year: date.year });
    }

    const { navigation } = this.props;
    navigation.setParams({
      getBills: this.getBills,
      getDate: this.getDate,
      finishRent: this.finishRent
    });
  };

  finishRent = async () => {
    const { month, year } = this.state;
    await this.getRentSheet(month, year);
  };

  getDate = () => {
    const { month, year } = this.state;
    return { month, year };
  };

  /**
   * Helper Function for Passing State to Modal
   */
  getBills = () => {
    const { main, utilities } = this.state;
    return { main, utilities };
  };

  prepRentData = data => {
    const rent = [];
    data.forEach((item, i) => {
      if (i > 0) {
        rent.push({ ...item, value: item.value.toString() });
      } else {
        rent.push({ ...item, value: item.value.toString() });
      }
    });
    return rent;
  };

  getRentSheet = async (month, year) => {
    await storeData("date", { month, year });
    const { primary } = this.state;

    // update headerRight
    const { navigation } = this.props;
    navigation.setParams({ disabled: !primary });

    const sheetRef = await db.getRent(month, year);
    if (sheetRef) {
      const main = this.prepRentData(sheetRef.get("base"));
      const utilities = this.prepRentData(sheetRef.get("bills"));
      const totals = sheetRef.get("totals");
      if (main != null && utilities != null && totals != null) {
        this.setState({ main, utilities, totals });
        if (primary) {
          // master sheet
          this.setState({ sheetAvailable: true });
        } else {
          // normal user sheet
          this.getPersonalSheet();
        }
      }
    } else {
      this.setState({
        main: [],
        utilities: [],
        totals: [],
        sheetAvailable: false,
        displayText: "No rent sheet created yet!"
      });
    }
  };

  getPersonalSheet = () => {
    const { main, utilities } = this.state;
    const personalTotals = [];

    const _main = main.filter(item => {
      const index = personalTotals.findIndex(t => t.section === item.section);
      const ids = Object.values(item.uids);
      if (ids.length > 0) {
        if (auth.hasCurrentAuthUser(ids)) {
          // divide by length
          const value = item.value / ids.length;
          if (index === -1) {
            personalTotals.push({ value, section: item.section });
          } else {
            personalTotals[index].value += value;
          }
          return item;
        }
      } else {
        // default no assignment
        return item;
      }
    });

    const _utilities = utilities.filter(item => {
      const index = personalTotals.findIndex(t => t.section === item.section);
      const ids = Object.values(item.uids);
      if (ids.length > 0) {
        if (auth.hasCurrentAuthUser(ids)) {
          item.value /= ids.length;
          if (index === -1) {
            personalTotals.push({ value: item.value, section: item.section });
          } else {
            personalTotals[index].value += item.value;
          }
          return item;
        }
      } else {
        return item;
      }
    });

    this.setState({
      main: _main,
      utilities: _utilities,
      totals: personalTotals,
      sheetAvailable: true
    });
  };

  updateMonth = async month => {
    const { year } = this.state;
    if (year.trim() !== "") {
      await this.getRentSheet(month, year);
    }
    this.setState({ month });
  };

  updateYear = async year => {
    const { month } = this.state;
    if (month.trim() !== "") {
      await this.getRentSheet(month, year);
    }
    this.setState({ year });
  };

  updateType = async type => {
    const { month, year } = this.state;
    if (type.trim() !== "" && month.trim() !== "" && year.trim() !== "") {
      if (type === "Master") {
        this.setState({ primary: true });
        await this.getRentSheet(month, year);
      } else {
        this.setState({ primary: false });
        await this.getRentSheet(month, year);
      }
    }
  };

  render() {
    const {
      sheetAvailable,
      typeViewable,
      month,
      year,
      main,
      utilities,
      totals,
      displayText
    } = this.state;
    return (
      <View style={styles.container}>
        <RentFilters
          isGroupPrimary={typeViewable}
          updateMonth={this.updateMonth}
          updateYear={this.updateYear}
          updateType={this.updateType}
          monthVal={month}
          yearVal={year}
        />
        {sheetAvailable ? (
          <RentSheetView main={main} utilities={utilities} totals={totals} />
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
    backgroundColor: "white"
  },

  primaryContainer: {
    flex: 1
  }
});

export default Rent;
