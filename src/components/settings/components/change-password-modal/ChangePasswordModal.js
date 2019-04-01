import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Overlay, Text, Button, Input } from "react-native-elements";
import { Navigation } from "react-native-navigation";
import { auth } from "../../../../firebase";
import ModalHeader from "../../../shared/modal-header";

const ReAuthOverlay = ({
  isVisible,
  onClose,
  email,
  password,
  onLogin,
  emailError,
  passwordError,
  onEmailChange,
  onPasswordChange,
  emailInput,
  passwordInput
}) => (
  <Overlay
    borderRadius={5}
    overlayStyle={{ margin: 20 }}
    isVisible={isVisible}
    width="auto"
    height="auto"
  >
    <>
      <View>
        <Text style={{ fontSize: 24, marginBottom: 5 }}>
          Reauthenticate to update
        </Text>
        <Text style={{ fontSize: 16, color: "gray", marginBottom: 10 }}>
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
          containerStyle={{ borderBottomColor: "rgba(0, 0, 0, 0.38)" }}
          onSubmitEditing={() => this.passwordInput.focus()}
          onChangeText={onEmailChange}
          errorMessage={emailError}
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
          containerStyle={{
            marginTop: 16,
            borderBottomColor: "rgba(0, 0, 0, 0.38)"
          }}
          inputStyle={{ marginLeft: 10 }}
          placeholder="Password"
          ref={input => {
            this.passwordInput = input;
          }}
          onSubmitEditing={onLogin}
          onChangeText={onPasswordChange}
          errorMessage={passwordError}
          leftIcon={<Icon name="lock-outline" type="material-community" />}
        />
      </View>
      <View
        style={{ flex: 0, flexDirection: "row", justifyContent: "flex-end" }}
      >
        <Button
          title="Login"
          onPress={onLogin}
          containerStyle={{ marginRight: 10 }}
        />
        <Button title="Close" onPress={onClose} />
      </View>
    </>
  </Overlay>
);

class ChangePasswordModal extends Component {
  state = {
    npassword: "",
    vpassword: "",
    visible: true,
    emailError: null,
    passwordError: null,
    isLoading: false,
    email: "",
    password: ""
  };

  onLogin = async () => {
    const { email, password } = this.state;
    if (email.trim() !== "" && password.trim() !== "") {
      // reset
      this.setState({
        emailError: null,
        passwordError: null
      });

      try {
        const success = await auth.signInWithEmailAndPassword(email, password);
        if (success) {
          this.setState({ visible: false });
        }
      } catch (error) {
        if (error.code === "auth/wrong-password") {
          this.setState({
            passwordError: "Wrong Password"
          });
        } else if (error.code === "auth/user-not-found") {
          this.setState({
            emailError: "User not found"
          });
        }
      }
    }
  };

  onClose = () => {
    this.setState({ visible: false });
    // weird behavior overlay needs to close first
    setTimeout(this.closeModal, 100);
  };

  closeModal = () => Navigation.dismissModal(this.props.componentId);

  submitUpdate = async () => {
    const { npassword, vpassword } = this.state;
    if (npassword.trim() !== "" && vpassword.trim() !== "") {
      if (npassword === vpassword) {
        await auth.updatePassword(npassword);
        this.closeModal();
      }
    }
  };

  render() {
    const {
      npassword,
      vpassword,
      visible,
      emailError,
      passwordError,
      email,
      password,
      emailInput,
      passwordInput
    } = this.state;
    return (
      <View style={styles.container}>
        <ModalHeader
          text="Change Password"
          leftComponent={
            <Icon
              name="close"
              color="white"
              underlayColor="transparent"
              onPress={this.closeModal}
            />
          }
          rightComponent={
            <Icon
              name="check"
              color="white"
              underlayColor="transparent"
              onPress={this.submitUpdate}
            />
          }
        />
        <View style={{ padding: 15 }}>
          <Input
            placeholder="Password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            label="New"
            baseColor="grey"
            tintColor="grey"
            value={npassword}
            onChangeText={t => this.setState({ npassword: t })}
          />
          <Input
            containerStyle={{ marginTop: 20 }}
            placeholder="Rewrite Password"
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
          emailError={emailError}
          passwordError={passwordError}
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
    flex: 1
  }
});

export default ChangePasswordModal;
