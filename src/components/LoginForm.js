import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
    };
  }

  render() {
    const { email, password, passwordConfirmation } = this.state;
    return (
      <View style={styles.formContainer}>
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
          ref={input => {
            this.emailInput = input;
          }}
          onSubmitEditing={() => this.passwordInput.focus()}
          onChangeText={e => this.setState({ email: e })}
          displayError={!this.props.isEmailValid}
          errorMessage="Please enter a valid email address"
          leftIcon={<Icon name="email-outline" type="material-community" />}
        />
        <Input
          value={password}
          keyboardAppearance="light"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          returnKeyType={this.props.isSignUpPage ? 'next' : 'done'}
          blurOnSubmit
          containerStyle={{ marginTop: 16, borderBottomColor: 'rgba(0, 0, 0, 0.38)' }}
          inputStyle={{ marginLeft: 10 }}
          placeholder="Password"
          ref={input => {
            this.passwordInput = input;
          }}
          onSubmitEditing={
            this.props.isSignUpPage
              ? () => this.confirmationInput.focus()
              : () => this.props.login(email, password)
          }
          onChangeText={p => this.setState({ password: p })}
          displayError={!this.props.isPasswordValid}
          errorMessage="Please enter at least 8 characters"
          leftIcon={<Icon name="lock-outline" type="material-community" />}
        />
        {this.props.isSignUpPage && (
          <Input
            value={passwordConfirmation}
            secureTextEntry
            keyboardAppearance="light"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            returnKeyType="done"
            blurOnSubmit
            containerStyle={{ marginTop: 16, borderBottomColor: 'rgba(0, 0, 0, 0.38)' }}
            inputStyle={{ marginLeft: 10 }}
            placeholder="Confirm password"
            ref={input => {
              this.confirmationInput = input;
            }}
            onSubmitEditing={() => this.props.signUp(email, password, passwordConfirmation)}
            onChangeText={pc => this.setState({ passwordConfirmation: pc })}
            displayError={!this.props.isConfirmationValid}
            errorMessage="Please enter the same password"
            leftIcon={<Icon name="lock-outline" type="material-community" />}
          />
        )}
        <Button
          buttonStyle={styles.loginButton}
          containerStyle={{ marginTop: 32 }}
          activeOpacity={0.8}
          title={this.props.isLoginPage ? 'LOGIN ' : 'SIGN UP '}
          onPress={
            this.props.isLoginPage
              ? () => this.props.login(email, password)
              : () => this.props.signUp(email, password, passwordConfirmation)
          }
          titleStyle={styles.loginTextButton}
          loading={this.props.isLoading}
          disabled={this.props.isLoading}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: 'white',
    width: SCREEN_WIDTH - 30,
    borderRadius: 10,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: 'center',
  },
  loginTextButton: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#5B725A',
    borderRadius: 10,
    height: 50,
    width: 200,
  },
});
