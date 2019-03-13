/* eslint class-methods-use-this: 0
  no-mixed-operators: 0
*/
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Icon, Text, Button } from 'react-native-elements';
import { TextField } from 'react-native-material-textfield';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Dropdown } from 'react-native-material-dropdown';
import FireTools from '../../../../utils/FireTools';
import { Navigation } from 'react-native-navigation'

const types = [{ value: 'Bill' }, { value: 'Chore' }];

const GoodHeader = ({ closeModal }) => (
  <Header
    statusBarProps={{ backgroundColor: '#5B725A' }}
    backgroundColor="#5B725A"
    leftComponent={
      <Icon name="arrow-back" color="white" underlayColor="transparent" onPress={closeModal} />
    }
    centerComponent={{ text: '', style: { fontSize: 18, color: '#fff' } }}
    outerContainerStyles={{ height: 80 }}
  />
);

const SettingItem = ({
  onIconPress, iconName, type, color, title, value,
}) => (
  <View
    style={{
      flex: 0,
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 10,
    }}
  >
    <Icon name={iconName} type={type} reverse color={color} size={22} onPress={onIconPress} />
    <Text style={{ fontSize: 20, marginLeft: 10 }}>{title}</Text>
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: 20,
      }}
    >
      <Text style={{ fontSize: 16 }}>{value}</Text>
    </View>
  </View>
);

export default class AddReminderModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDTPickerVisible: false,
      mode: 'date',
      date: '',
      time: '',
      title: '',
      type: '',
      rid: '',
      editing: false,
    };
    this.addReminder = this.addReminder.bind(this);
    this.removeReminder = this.removeReminder.bind(this);
  }

  async componentDidMount() {
    FireTools.init();
    if (this.props.item !== undefined) {
      this.setState({
        title: this.props.item.title,
        type: this.props.item.type,
        date: this.props.item.date,
        time: this.props.item.time,
        rid: this.props.item.rid,
        editing: this.props.item.created_by === FireTools.user.uid,
      });
    }
  }

  closeModal = () => Navigation.dismissModal(this.props.componentId);

  async addReminder() {
    const {
      date, time, title, type, rid, editing,
    } = this.state;

    await FireTools.addReminder(
      {
        date,
        time,
        title,
        type,
        created_by: FireTools.user.uid,
      },
      rid,
    );

    const timestamp = new Date().getTime();
    const name = FireTools.user.displayName.split(' ')[0];
    let desc = '';
    if (editing) {
      desc = `Edited reminder: ${title}`;
    } else {
      desc = `Created new reminder: ${title}`;
    }
    await FireTools.addActivity({
      description: [desc],
      likes: 0,
      name,
      time: timestamp,
      created_by: FireTools.user.uid,
    });

    this.props.onFinish();
    this.closeModal();
  }

  async removeReminder() {
    const { rid } = this.state;
    await FireTools.removeReminder(rid);
    this.props.onFinish();
    this.closeModal();
  }

  formatTime(date) {
    const hours = (date.getHours() + 11) % 12 + 1;
    const suffix = date.getHours() >= 12 ? 'PM' : 'AM';
    const min = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    const time = `${hours}:${min} ${suffix}`;
    return time;
  }

  handleDatePicked = date => {
    if (this.state.mode === 'date') {
      this.setState({ date: date.toLocaleDateString('en-US') });
    } else {
      const time = this.formatTime(date);
      this.setState({ time });
    }

    this.setState({ isDTPickerVisible: false });
  };

  render() {
    return (
      <View style={styles.container}>
        <GoodHeader closeModal={this.closeModal} />
        <View style={styles.titleInput}>
          <TextField
            fontSize={20}
            labelFontSize={14}
            label="Reminder"
            textColor="white"
            baseColor="white"
            tintColor="white"
            value={this.state.title}
            onChangeText={title => this.setState({ title })}
          />
        </View>
        <View style={styles.buttonDone}>
          <Icon name="check" reverse color="#80A07E" onPress={this.addReminder} />
        </View>
        <SettingItem
          title="Date"
          value={this.state.date}
          iconName="calendar"
          type="material-community"
          color="#2F7EBF"
          onIconPress={() => this.setState({ mode: 'date', isDTPickerVisible: true })}
        />
        <SettingItem
          title="Time"
          value={this.state.time}
          iconName="access-time"
          color="#7472B5"
          onIconPress={() => this.setState({ mode: 'time', isDTPickerVisible: true })}
        />
        <Dropdown
          containerStyle={{
            marginLeft: 20,
            marginRight: 20,
          }}
          label="Type"
          data={types}
          animationDuration={150}
          value={this.state.type}
          onChangeText={value => this.setState({ type: value })}
        />
        <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 30 }}>
          {this.state.editing && (
            <Button
              title="Delete Reminder "
              containerStyle={{ flex: 0, alignSelf: 'center' }}
              buttonStyle={{
                backgroundColor: 'rgba(92, 99,216, 1)',
                width: 300,
                height: 45,
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 5,
              }}
              onPress={this.removeReminder}
            />
          )}
        </View>
        <DateTimePicker
          isVisible={this.state.isDTPickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={() => this.setState({ isDTPickerVisible: false })}
          mode={this.state.mode}
          is24Hour={false}
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
  titleInput: {
    marginTop: -10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 35,
    backgroundColor: '#5B725A',
  },
  buttonDone: {
    flex: 0,
    top: -35,
    alignItems: 'flex-end',
    marginRight: 20,
  },
});
