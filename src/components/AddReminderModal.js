/* eslint class-methods-use-this: 0
  no-mixed-operators: 0
*/
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Icon, Text } from 'react-native-elements';
import { TextField } from 'react-native-material-textfield';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Dropdown } from 'react-native-material-dropdown';

const types = [{ value: 'Bill' }, { value: 'Chore' }];

const GoodHeader = ({ closeModal }) => (
  <Header
    statusBarProps={{ backgroundColor: '#5B725A' }}
    backgroundColor="#5B725A"
    leftComponent={
      <Icon name="arrow-back" color="white" underlayColor="transparent" onPress={closeModal} />
    }
    centerComponent={{ text: '', style: { fontSize: 18, color: '#fff' } }}
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
  static navigatorStyle = {
    navBarHidden: true,
    statusBarColor: '#5B725A',
  };

  constructor(props) {
    super(props);
    this.state = {
      isDTPickerVisible: false,
      mode: 'date',
      date: '',
      time: '',
      title: '',
      type: '',
    };
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    if (this.props.item !== undefined) {
      this.setState({ title: this.props.item.title, type: this.props.item.type });
    }
  }

  closeModal() {
    this.props.navigator.dismissModal({
      animationType: 'slide-down',
    });
  }

  formatTime(date) {
    const hours = (date.getHours() + 11) % 12 + 1;
    const suffix = date.getHours() >= 12 ? 'PM' : 'AM';
    const min = date.getMinutes() === 0 ? '00' : date.getMinutes();
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
            label="Reminder"
            textColor="white"
            baseColor="white"
            tintColor="white"
            value={this.state.title}
            onChangeText={title => this.setState({ title })}
          />
        </View>
        <View style={styles.buttonDone}>
          <Icon name="check" reverse color="#80A07E" onPress={this.closeModal} />
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
