import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import { auth } from '../../../firebase';

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
  };

  onLogin = async () => {
    const { email, password } = this.state;
    if (email.trim() !== '' && password.trim() !== '') {
      // reset
      this.setState({
        isLoading: true,
        emailError: null,
        passwordError: null,
      });

      try {
        await auth.signInWithEmailAndPassword(email, password);
      } catch (error) {
        console.log(error.code, error.message);
        if (error.code === 'auth/wrong-password') {
          this.setState({
            isLoading: false,
            passwordError: 'Wrong Password',
          });
          this.passwordInput.shake();
        } else if (error.code === 'auth/user-not-found') {
          this.setState({
            isLoading: false,
            emailError: 'User not found',
          });
          this.emailInput.shake();
        }
      }
    }
  };

  onSignUp = async () => {
    const { email, password, passwordConfirmation } = this.state;
    if (email.trim() !== '' && password.trim() !== '' && passwordConfirmation.trim() !== '') {
      // reset
      this.setState({
        isLoading: true,
        emailError: null,
        passwordError: null,
        confirmError: null,
      });

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

      try {
        await auth.createUserWithEmailAndPassword(email, password);
        // go to Welcome
        this.setState({ isLoading: false });
        this.openWelcomeModal();

        const { selectCategory } = this.props;
        selectCategory(0);
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          this.setState({
            isLoading: false,
            emailError: 'Email is already in use',
          });
          this.emailInput.shake();
        } else if (error.code === 'auth/weak-password') {
          this.setState({
            isLoading: false,
            passwordError: 'The given password is invalid.',
          });
          this.passwordInput.shake();
        }
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
      passwordError,
      confirmError,
      emailError,
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
          errorMessage={emailError}
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
          errorMessage={passwordError}
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
            errorMessage={confirmError}
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
