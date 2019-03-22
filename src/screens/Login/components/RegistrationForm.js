import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import firebase from 'react-native-firebase';
import FireTools from '../../../utils/FireTools';
import { goToHome } from '../../../components/navigation';

const SCREEN_WIDTH = Dimensions.get('window').width;

class RegistrationForm extends Component {
  state = {
    email: '',
    password: '',
    passwordConfirmation: '',
    isLoading: false,
    emailError: null,
    passwordError: null,
    confirmError: null,
    authFlag: false,
  };

  componentDidMount() {
    this.unsubscriber = firebase.auth().onAuthStateChanged(user => {
      const { authFlag } = this.state;
      if (user != null && !authFlag) {
        this.setState({ authFlag: true });
        goToHome();
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }

  onLogin = async () => {
    const { email, password } = this.state;
    if (email.trim() !== '' && password.trim() !== '') {
      this.setState({ isLoading: true });
      const credential = await FireTools.loginWithEmail(email, password);
      if (credential) {
        // user state will change from null to value, will fire listener defined above
      } else {
        this.setState({
          isLoading: false,
          emailError: 'Please enter a valid email address',
          passwordError: 'Please enter at least 8 characters',
        });
        this.emailInput.shake();
        this.passwordInput.shake();
      }
    }
  };

  onSignUp = async () => {
    const { email, password, passwordConfirmation } = this.state;
    if (email.trim() !== '' && password.trim() !== '' && passwordConfirmation.trim() !== '') {
      this.setState({ isLoading: true });
      if (password !== passwordConfirmation) {
        this.setState({
          isLoading: false,
          passwordError: 'Please enter at least 8 characters',
          confirmError: 'Please enter the same password',
        });
        this.passwordInput.shake();
        this.confirmationInput.shake();
        return;
      }

      const credential = await FireTools.createUserWithEmail(email, password);
      if (credential) {
        // go to Welcome
        this.setState({ isLoading: false });
        this.openWelcomeModal();

        const { selectCategory } = this.props;
        selectCategory(0);
      } else {
        this.setState({
          isLoading: false,
          emailError: 'Please enter a valid email address',
          passwordError: 'Please enter at least 8 characters',
          confirmError: 'Please enter the same password',
        });
        this.emailInput.shake();
        this.passwordInput.shake();
        this.confirmationInput.shake();
      }
    }
  };

  openWelcomeModal = () => {
    Navigation.showModal({
      component: {
        name: 'WelcomeModal',
        options: {
          animationType: 'slide-up',
        },
      },
    });
  };

  render() {
    const { isSignUpPage, isLoginPage } = this.props;
    const {
      email,
      password,
      passwordConfirmation,
      isLoading,
      passwordErrorMessage,
      confirmErrorMessage,
      emailErrorMessage,
    } = this.state;
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
          errorMessage={emailErrorMessage}
          leftIcon={<Icon name="email-outline" type="material-community" />}
        />
        <Input
          value={password}
          keyboardAppearance="light"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          returnKeyType={isSignUpPage ? 'next' : 'done'}
          blurOnSubmit
          containerStyle={{ marginTop: 16, borderBottomColor: 'rgba(0, 0, 0, 0.38)' }}
          inputStyle={{ marginLeft: 10 }}
          placeholder="Password"
          ref={input => {
            this.passwordInput = input;
          }}
          onSubmitEditing={isSignUpPage ? () => this.confirmationInput.focus() : this.onLogin}
          onChangeText={p => this.setState({ password: p })}
          errorMessage={passwordErrorMessage}
          leftIcon={<Icon name="lock-outline" type="material-community" />}
        />
        {isSignUpPage && (
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
            onSubmitEditing={this.onSignUp}
            onChangeText={pc => this.setState({ passwordConfirmation: pc })}
            errorMessage={confirmErrorMessage}
            leftIcon={<Icon name="lock-outline" type="material-community" />}
          />
        )}
        <Button
          buttonStyle={styles.loginButton}
          containerStyle={{ marginTop: 32 }}
          activeOpacity={0.8}
          title={isLoginPage ? 'LOGIN ' : 'SIGN UP '}
          onPress={isLoginPage ? this.onLogin : this.onSignUp}
          titleStyle={styles.loginTextButton}
          loading={isLoading}
          disabled={isLoading}
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

export default RegistrationForm;
