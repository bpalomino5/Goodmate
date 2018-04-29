import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Icon, Overlay, Text, Button, Input } from 'react-native-elements';
import { TextField } from 'react-native-material-textfield';
import FireTools from '../../../utils/FireTools';

const GoodHeader = ({ closeModal, submitUpdate }) => (
  <Header
    statusBarProps={{ backgroundColor: '#546054' }}
    backgroundColor="#5B725A"
    leftComponent={
      <Icon name="close" color="white" underlayColor="transparent" onPress={closeModal} />
    }
    centerComponent={{ text: 'Change Password', style: { fontSize: 18, color: '#fff' } }}
    rightComponent={
      <Icon name="check" color="white" underlayColor="transparent" onPress={submitUpdate} />
    }
  />
);

const ReAuthOverlay = ({
  isVisible,
  onClose,
  email,
  password,
  onLogin,
  isEmailValid,
  isPasswordValid,
  onEmailChange,
  onPasswordChange,
}) => (
  <Overlay
    borderRadius={5}
    overlayStyle={{ margin: 20 }}
    isVisible={isVisible}
    width="auto"
    height="auto"
  >
    <View>
      <Text style={{ fontSize: 24, marginBottom: 5 }}>Reauthenticate to update</Text>
      <Text style={{ fontSize: 16, color: 'gray', marginBottom: 10 }}>
        Please re-login in order to securly update your password.
      </Text>
    </View>
    <View style={{ marginBottom: 20 }}>
      <Input
        value={email}
        keyboardAppearance="light"
        autoFocus={false}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        returnKeyType="next"
        inputStyle={{ marginLeft: 10 }}
        placeholder="Email"
        containerStyle={{ borderBottomColor: 'rgba(0, 0, 0, 0.38)' }}
        onSubmitEditing={() => this.passwordInput.focus()}
        onChangeText={onEmailChange}
        errorMessage={isEmailValid}
        leftIcon={<Icon name="email-outline" type="material-community" />}
      />
      <Input
        value={password}
        keyboardAppearance="light"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
        returnKeyType="done"
        blurOnSubmit
        containerStyle={{ marginTop: 16, borderBottomColor: 'rgba(0, 0, 0, 0.38)' }}
        inputStyle={{ marginLeft: 10 }}
        placeholder="Password"
        ref={input => {
          this.passwordInput = input;
        }}
        onSubmitEditing={onLogin}
        onChangeText={onPasswordChange}
        errorMessage={isPasswordValid}
        leftIcon={<Icon name="lock-outline" type="material-community" />}
      />
    </View>
    <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'flex-end' }}>
      <Button
        title="Login "
        onPress={onLogin}
        containerStyle={{ marginRight: 10 }}
        buttonStyle={{
          backgroundColor: 'rgba(92, 99,216, 1)',
        }}
      />
      <Button
        title="Close "
        onPress={onClose}
        buttonStyle={{
          backgroundColor: 'rgba(92, 99,216, 1)',
        }}
      />
    </View>
  </Overlay>
);

export default class ChangePasswordModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      npassword: '',
      vpassword: '',
      visible: true,
      isEmailValid: null,
      isPasswordValid: null,
      email: '',
      password: '',
    };
    this.closeModal = this.closeModal.bind(this);
    this.submitUpdate = this.submitUpdate.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  async componentWillMount() {
    FireTools.init();
  }

  async onLogin() {
    const { email, password } = this.state;
    if (email.trim() !== '' && password.trim() !== '') {
      const response = await FireTools.loginWithEmail(email, password);
      if (response) {
        this.setState({ visible: false });
      } else {
        this.setState({
          isEmailValid: 'Please enter a valid email address',
          isPasswordValid: 'Please enter at least 8 characters',
        });
      }
    }
  }

  onClose() {
    this.closeModal();
  }

  closeModal() {
    this.props.navigator.dismissModal({
      animationType: 'slide-down',
    });
  }

  async submitUpdate() {
    const { npassword, vpassword } = this.state;
    if (npassword.trim() !== '' && vpassword.trim() !== '') {
      if (npassword === vpassword) {
        await FireTools.updatePassword(npassword);
        this.closeModal();
      }
    }
  }

  render() {
    const {
      npassword,
      vpassword,
      visible,
      isEmailValid,
      isPasswordValid,
      email,
      password,
    } = this.state;
    return (
      <View style={styles.container}>
        <GoodHeader closeModal={this.closeModal} submitUpdate={this.submitUpdate} />
        <View style={{ padding: 15 }}>
          <TextField
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            label="New"
            baseColor="grey"
            tintColor="grey"
            value={npassword}
            onChangeText={t => this.setState({ npassword: t })}
          />
          <TextField
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            label="Verify"
            baseColor="grey"
            tintColor="grey"
            value={vpassword}
            onChangeText={t => this.setState({ vpassword: t })}
          />
        </View>
        <ReAuthOverlay
          isVisible={visible}
          onLogin={this.onLogin}
          onClose={this.onClose}
          isEmailValid={isEmailValid}
          isPasswordValid={isPasswordValid}
          email={email}
          password={password}
          onEmailChange={e => this.setState({ email: e })}
          onPasswordChange={p => this.setState({ password: p })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
