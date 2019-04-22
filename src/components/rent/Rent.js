import React, { Component } from "react";
// import { Navigation } from "react-native-navigation";
import { StyleSheet, View } from "react-native";
import { Icon, Text } from "react-native-elements";
import { getData, storeData } from "../../datastore";
// import { toggleDrawer } from "../navigation";
// import { db, auth } from "../../firebase";

// import Header from "../shared/header";
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
  <View style={{ flex: 1 }}>
    <View style={styles.primaryContainer}>
      <RentSheet main={main} utilities={utilities} totals={totals} />
    </View>
  </View>
);

class Rent extends Component {
  static navigationOptions = {
    title: "Rent",
    headerRight: (
      <Icon
        name="doc"
        type="simple-line-icon"
        color="white"
        underlayColor="transparent"
      />
    )
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
    // const roommates = await db.getRoommates();
    // roommates.forEach(mate => {
    //   if (auth.isAuthUser(mate.uid)) {
    //     this.setState({ primary: mate.primary, typeViewable: mate.primary });
    //   }
    // });
    // const date = await getData("date");
    // if (date) {
    //   await this.getRentSheet(date.month, date.year);
    //   this.setState({ month: date.month, year: date.year });
    // }
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
    const sheetRef = await db.getRent(month, year);
    if (sheetRef) {
      const main = this.prepRentData(sheetRef.get("base"));
      const utilities = this.prepRentData(sheetRef.get("bills"));
      const totals = sheetRef.get("totals");
      if (main != null && utilities != null && totals != null) {
        this.setState({ main, utilities, totals });
        if (primary) {
          // display master sheet
          this.setState({ sheetAvailable: true });
        } else {
          // display normal user sheet
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

  openRentModal = () => {
    const { month, year } = this.state;
    const date = { month, year };
    const main = [
      {
        section: "",
        type: "",
        value: "",
        uids: {}
      }
    ];
    const utilities = [
      {
        section: "",
        type: "",
        value: "",
        uids: {}
      }
    ];

    // Navigation.showModal({
    //   component: {
    //     name: "AddRentModal",
    //     passProps: {
    //       editing: false,
    //       date,
    //       main,
    //       utilities,
    //       onFinish: () => this.getRentSheet(month, year)
    //     },
    //     options: {
    //       animationType: "slide-up"
    //     }
    //   }
    // });
  };

  editRentSheet = () => {
    const { main, utilities, month, year } = this.state;
    const date = { month, year };

    // Navigation.showModal({
    //   component: {
    //     name: "AddRentModal",
    //     passProps: {
    //       editing: true,
    //       main,
    //       utilities,
    //       date,
    //       onFinish: () => this.getRentSheet(month, year)
    //     },
    //     options: {
    //       animationType: "slide-up"
    //     }
    //   }
    // });
  };

  updateMonth = async month => {
    const { year } = this.state;
    if (year.trim() !== "") {
      //   await this.getRentSheet(month, year);
    }
    this.setState({ month });
  };

  updateYear = async year => {
    const { month } = this.state;
    if (month.trim() !== "") {
      //   await this.getRentSheet(month, year);
    }
    this.setState({ year });
  };

  updateType = async type => {
    const { month, year } = this.state;
    if (type.trim() !== "" && month.trim() !== "" && year.trim() !== "") {
      if (type === "Master") {
        this.setState({ primary: true });
        // await this.getRentSheet(month, year);
      } else {
        this.setState({ primary: false });
        // await this.getRentSheet(month, year);
      }
    }
  };

  render() {
    const {
      sheetAvailable,
      primary,
      typeViewable,
      month,
      year,
      main,
      utilities,
      totals,
      displayText
    } = this.state;
    const dateSelected = month !== "" && year !== "";
    const disabled = dateSelected === false;
    return (
      <View style={styles.container}>
        {/* <Header
          toggleDrawer={() => toggleDrawer(componentId)}
          text="Rent"
          rightComponent={
            primary ? (
              <Icon
                name="doc"
                type="simple-line-icon"
                color={disabled ? "grey" : "white"}
                underlayColor="transparent"
                onPress={
                  disabled
                    ? null
                    : sheetAvailable
                    ? this.editRentSheet
                    : this.openRentModal
                }
              />
            ) : null
          }
        /> */}
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
    // backgroundColor: '#E3E1DE',
  },

  primaryContainer: {
    flex: 1
  }
});

export default Rent;