/* eslint react/no-array-index-key: 0,
   no-param-reassign: 0,
*/
import React, { Component } from 'react';
import { View, LayoutAnimation } from 'react-native';
import { Icon, Input, Card, Text, Divider } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';

export default class RentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseItems: [
        {
          section: '',
          type: '',
          value: '',
          removable: false,
          uids: {},
        },
      ],
      billItems: [
        {
          section: '',
          type: '',
          value: '',
          removable: false,
          uids: {},
        },
      ],
    };
  }

  addItem(key, state) {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      [key]: [
        ...state,
        {
          section: '',
          type: '',
          value: '',
          removable: true,
          uids: {},
        },
      ],
    });
  }

  removeItem(key, state, index) {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      [key]: state.filter((_, i) => i !== index),
    });
  }

  updateItemValue(i, text, state) {
    state[i].value = text;
    this.forceUpdate();
  }

  updateItemType(i, type, state) {
    state[i].type = type;
    this.forceUpdate();
  }

  updateItemSection(i, section, state) {
    state[i].section = section;
    this.forceUpdate();
  }

  render() {
    return (
      <View>
        <RentFormCard
          title="Base Rent Items"
          data={this.state.baseItems}
          sections={this.props.sections}
          addItem={() => this.addItem('baseItems', this.state.baseItems)}
          removeItem={i => this.removeItem('baseItems', this.state.baseItems, i)}
          updateItemType={(i, text) => this.updateItemType(i, text, this.state.baseItems)}
          updateItemValue={(i, text) => this.updateItemValue(i, text, this.state.baseItems)}
          updateItemSection={(i, text) => this.updateItemSection(i, text, this.state.baseItems)}
          infoPress={() => this.props.infoPress('base')}
        />
        <RentFormCard
          title="Bill Items"
          data={this.state.billItems}
          sections={this.props.sections}
          addItem={() => this.addItem('billItems', this.state.billItems)}
          removeItem={i => this.removeItem('billItems', this.state.billItems, i)}
          updateItemType={(i, text) => this.updateItemType(i, text, this.state.billItems)}
          updateItemValue={(i, text) => this.updateItemValue(i, text, this.state.billItems)}
          updateItemSection={(i, text) => this.updateItemSection(i, text, this.state.billItems)}
          infoPress={() => this.props.infoPress('bill')}
        />
      </View>
    );
  }
}

const RentFormCard = ({
  title,
  data,
  addItem,
  updateItemType,
  updateItemValue,
  removeItem,
  sections,
  updateItemSection,
  infoPress,
}) => (
  <Card containerStyle={{ margin: 0, marginTop: 15 }}>
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}
    >
      <View style={{ flex: 1, justifyContent: 'center', marginLeft: 20 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '800',
            textAlign: 'center',
            color: '#3A4451',
            marginBottom: 15,
          }}
        >
          {title}
        </Text>
      </View>
      <View
        style={{
          flex: 0,
          alignItems: 'flex-end',
          justifyContent: 'flex-start',
          marginRight: 5,
        }}
      >
        <Icon
          name="info"
          type="feather"
          color="black"
          underlayColor="transparent"
          onPress={infoPress}
        />
      </View>
    </View>
    <Divider />
    {data.map((item, i) => (
      <RentFormItem
        key={i}
        i={i}
        addItem={addItem}
        removeItem={() => removeItem(i)}
        type={item.type}
        typeChange={text => updateItemType(i, text)}
        value={item.value}
        valueChange={text => updateItemValue(i, text)}
        removable={item.removable}
        sections={sections}
        sectionValue={item.section}
        setSection={text => updateItemSection(i, text)}
      />
    ))}
  </Card>
);

const RentFormItem = ({
  type,
  typeChange,
  addItem,
  removeItem,
  value,
  valueChange,
  removable,
  sections,
  setSection,
  sectionValue,
}) => (
  <View
    style={{
      flex: 0,
      flexDirection: 'row',
      alignItems: 'center',
    }}
  >
    <Dropdown
      containerStyle={{
        width: 85,
        marginRight: 10,
      }}
      label="Section"
      data={sections}
      value={sectionValue}
      animationDuration={150}
      onChangeText={setSection}
    />
    <Input
      placeholder="Name"
      value={type}
      onChangeText={typeChange}
      containerStyle={{ flex: 1, marginRight: 5, marginTop: 15 }}
    />
    <Icon name="attach-money" size={20} color="black" containerStyle={{ marginTop: 10 }} />
    <Input
      placeholder="Value"
      value={value}
      onChangeText={valueChange}
      containerStyle={{
        width: 90,
        marginLeft: -15,
        marginRight: 5,
        marginTop: 15,
      }}
    />
    {removable === false ? (
      <Icon
        name="add-circle-outline"
        color="green"
        onPress={addItem}
        containerStyle={{ marginRight: 5 }}
      />
    ) : (
      <Icon
        name="remove-circle-outline"
        color="red"
        onPress={removeItem}
        containerStyle={{ marginRight: 5 }}
      />
    )}
  </View>
);
