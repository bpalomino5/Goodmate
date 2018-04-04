/* eslint react/no-array-index-key: 0,
   no-param-reassign: 0,
*/
import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon, Input, Card } from 'react-native-elements';

export default class RentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseItems: [{ title: 'Monthly Rent', value: '' }],
      billItems: [{ title: 'Utilities', value: '' }],
    };
  }

  addItem(key, state, title) {
    this.setState({
      [key]: [...state, { title, value: '' }],
    });
  }

  removeItem(key, state, index) {
    this.setState({
      [key]: state.filter((_, i) => i !== index),
    });
  }

  updateItem(i, text, state) {
    state[i].value = text;
    this.forceUpdate();
  }

  render() {
    return (
      <View>
        <RentFormCard
          title="Base Rent Items"
          data={this.state.baseItems}
          addItem={() => this.addItem('baseItems', this.state.baseItems, 'Other Rent')}
          removeItem={i => this.removeItem('baseItems', this.state.baseItems, i)}
          updateItem={(i, text) => this.updateItem(i, text, this.state.baseItems)}
        />
        <RentFormCard
          title="Bill Items"
          data={this.state.billItems}
          addItem={() => this.addItem('billItems', this.state.billItems, 'Other Bill')}
          removeItem={i => this.removeItem('billItems', this.state.billItems, i)}
          updateItem={(i, text) => this.updateItem(i, text, this.state.billItems)}
        />
      </View>
    );
  }
}

const RentFormCard = ({
  title, data, addItem, updateItem, removeItem,
}) => (
  <Card title={title}>
    {data.map((item, i) => (
      <RentFormItem
        key={i}
        i={i}
        title={item.title}
        addItem={addItem}
        removeItem={() => removeItem(i)}
        textChange={text => updateItem(i, text)}
        value={item.value}
      />
    ))}
  </Card>
);

const RentFormItem = ({
  title, addItem, removeItem, value, textChange,
}) => (
  <View style={{ flex: 0, flexDirection: 'row', marginBottom: 5 }}>
    <Input
      placeholder={title}
      leftIcon={<Icon name="attach-money" color="black" />}
      inputStyle={{ flex: 1 }}
      value={value}
      onChangeText={textChange}
    />
    <Icon name="add" color="green" onPress={addItem} />
    <Icon name="remove" color="red" onPress={removeItem} />
  </View>
);
