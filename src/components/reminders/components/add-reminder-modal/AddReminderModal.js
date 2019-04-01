/* eslint class-methods-use-this: 0
  no-mixed-operators: 0
*/
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Text, Button, Input } from "react-native-elements";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Dropdown } from "react-native-material-dropdown";
import { Navigation } from "react-native-navigation";
import { auth, db } from "../../../../firebase";
import ModalHeader from "../../../shared/modal-header";

const types = [{ value: "Bill" }, { value: "Chore" }];

const SettingItem = ({
  onIconPress,
  iconName,
  type,
  color,
  title,
  value,
  disabled
}) => (
  <View style={styles.item}>
    <Icon
      name={iconName}
      type={type}
      reverse
      color={color}
      size={22}
      disabled={disabled}
      disabledStyle={{ backgroundColor: color }}
      onPress={onIconPress}
    />
    <Text style={styles.itemTitle}>{title}</Text>
    <View style={styles.itemText}>
      <Text style={{ fontSize: 16 }}>{value}</Text>
    </View>
  </View>
);

export default class AddReminderModal extends Component {
  state = {
    isDTPickerVisible: false,
    mode: "date",
    date: "",
    time: "",
    title: "",
    type: "",
    rid: "",
    editing: false
  };

  componentDidMount = async () => {
    const { item } = this.props;
    if (item !== undefined) {
      this.setState({
        title: item.title,
        type: item.type,
        date: item.date,
        time: item.time,
        rid: item.rid,
        editing: auth.isAuthUser(item.created_by)
      });
    } else {
      this.setState({ editing: true });
    }
  };

  closeModal = () => Navigation.dismissModal(this.props.componentId);

  addReminder = async () => {
    const { date, time, title, type, rid, editing } = this.state;

    await db.addReminder(
      {
        date,
        time,
        title,
        type
      },
      rid
    );

    const timestamp = new Date().getTime();
    const name = auth.getDisplayName().split(" ")[0];
    let detail = "";
    if (editing) {
      detail = `Edited Reminder: ${title}`;
    } else {
      detail = `Created New Reminder: ${title}`;
    }
    await db.addActivity({
      description: [detail],
      likes: 0,
      name,
      time: timestamp
    });

    const { onFinish } = this.props;
    onFinish();
    this.closeModal();
  };

  removeReminder = async () => {
    const { rid } = this.state;
    const { onFinish } = this.props;
    await db.removeReminder(rid);
    onFinish();
    this.closeModal();
  };

  formatTime = date => {
    const hours = ((date.getHours() + 11) % 12) + 1;
    const suffix = date.getHours() >= 12 ? "PM" : "AM";
    const min = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    const time = `${hours}:${min} ${suffix}`;
    return time;
  };

  handleDatePicked = date => {
    const { mode } = this.state;
    if (mode === "date") {
      this.setState({ date: date.toLocaleDateString("en-US") });
    } else {
      const time = this.formatTime(date);
      this.setState({ time });
    }

    this.setState({ isDTPickerVisible: false });
  };

  render() {
    const {
      title,
      date,
      time,
      type,
      editing,
      isDTPickerVisible,
      mode
    } = this.state;
    return (
      <View style={styles.container}>
        <ModalHeader
          leftComponent={
            <Icon
              name="arrow-back"
              color="white"
              underlayColor="transparent"
              onPress={this.closeModal}
            />
          }
        />
        <View style={styles.titleInput}>
          <Input
            editable={editing}
            placeholder="Reminder"
            inputContainerStyle={{ borderBottomColor: "white" }}
            inputStyle={{ fontSize: 20, color: "white" }}
            placeholderTextColor="lightgray"
            value={title}
            onChangeText={title => this.setState({ title })}
          />
        </View>
        <View style={[styles.buttonDone, { marginBottom: editing ? 0 : 20 }]}>
          {editing && (
            <Icon
              name="check"
              reverse
              color="#80A07E"
              onPress={this.addReminder}
            />
          )}
        </View>
        <SettingItem
          disabled={!editing}
          title="Date"
          value={date}
          iconName="calendar"
          type="material-community"
          color="#2F7EBF"
          onIconPress={() =>
            this.setState({ mode: "date", isDTPickerVisible: true })
          }
        />
        <SettingItem
          disabled={!editing}
          title="Time"
          value={time}
          iconName="access-time"
          color="#7472B5"
          onIconPress={() =>
            this.setState({ mode: "time", isDTPickerVisible: true })
          }
        />
        <Dropdown
          disabled={!editing}
          containerStyle={styles.dropdown}
          label="Type"
          data={types}
          animationDuration={150}
          value={type}
          onChangeText={value => this.setState({ type: value })}
        />
        <View style={styles.buttonContainer}>
          {editing && (
            <Button
              title="Delete Reminder"
              containerStyle={styles.delete}
              buttonStyle={styles.buttonDelete}
              onPress={this.removeReminder}
            />
          )}
        </View>
        <DateTimePicker
          isVisible={isDTPickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={() => this.setState({ isDTPickerVisible: false })}
          mode={mode}
          is24Hour={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  dropdown: {
    marginLeft: 20,
    marginRight: 20
  },
  titleInput: {
    marginTop: -10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 35,
    backgroundColor: "#385136"
  },
  buttonDone: {
    flex: 0,
    top: -35,
    alignItems: "flex-end",
    marginRight: 20
  },
  buttonContainer: { flex: 1, justifyContent: "flex-end", marginBottom: 30 },
  delete: { flex: 0, alignSelf: "center" },
  buttonDelete: {
    width: 300,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  },
  item: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10
  },
  itemText: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: 20
  },
  itemTitle: { fontSize: 20, marginLeft: 10 }
});
