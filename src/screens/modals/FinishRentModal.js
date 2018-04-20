import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Button, Header, Icon, Text, Divider } from 'react-native-elements';

const GoodHeader = ({ closeModal, openOverlay }) => (
  <Header
    statusBarProps={{ backgroundColor: '#5B725A' }}
    backgroundColor="#5B725A"
    leftComponent={
      <Icon name="arrow-back" color="white" underlayColor="transparent" onPress={closeModal} />
    }
    centerComponent={{ text: 'Finalize', style: { fontSize: 18, color: '#fff' } }}
    rightComponent={
      <Icon name="add" color="white" underlayColor="transparent" onPress={openOverlay} />
    }
  />
);

export default class FinishRentModal extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    statusBarColor: '#5B725A',
  };

  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.submitRent = this.submitRent.bind(this);
  }

  componentDidMount() {
    if (this.props.base !== undefined) {
      const base = JSON.parse(this.props.base);
      const bills = JSON.parse(this.props.bills);
      console.log(base, bills);
    }
  }

  closeModal() {
    this.props.navigator.dismissModal({
      animationType: 'slide-down',
    });
  }

  submitRent() {
    this.props.navigator.dismissAllModals({
      animationType: 'slide-down',
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <GoodHeader closeModal={this.closeModal} />
        <View style={{ flex: 1 }}>
          <TouchableOpacity>
            <View style={{ padding: 5 }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ alignSelf: 'center', padding: 10, backgroundColor: 'white' }}>
                  <Text style={{ fontSize: 20 }}>Avalon</Text>
                </View>
                <View style={{ marginLeft: 12, width: 220 }}>
                  <Text style={{ fontSize: 20, marginBottom: 4 }}>Garage</Text>
                  <Text style={{ fontSize: 14, color: 'grey' }}>Brandon, CJ, Bryan, Marvin</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    marginRight: 10,
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ fontSize: 18 }}>$100.00</Text>
                </View>
              </View>
            </View>
            <Divider style={{ backgroundColor: 'grey' }} />
          </TouchableOpacity>
        </View>
        <View style={styles.SubmitSection}>
          <Button
            containerStyle={{ marginTop: 20 }}
            title="Submit "
            buttonStyle={{
              backgroundColor: 'rgba(92, 99,216, 1)',
              width: 300,
              height: 45,
              borderColor: 'transparent',
              borderWidth: 0,
              borderRadius: 5,
            }}
            onPress={this.submitRent}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  SubmitSection: {
    flex: 0,
    padding: 10,
  },
});
