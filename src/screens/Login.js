import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  UIManager,
  LayoutAnimation,
  KeyboardAvoidingView,
} from 'react-native';
import firebase from 'react-native-firebase';
import { Input, Button } from 'react-native-elements';

// import Icon from 'react-native-vector-icons/FontAwesome';
// import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../assets/home.jpg');

// Enable LayoutAnimation on Android
/* eslint no-unused-expressions: 0 */
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const TabSelector = ({ selected }) => (
  <View style={styles.selectorContainer}>
    <View style={selected && styles.selected} />
  </View>
);

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      selectedCategory: 0,
      isLoading: false,
      isEmailValid: true,
      isPasswordValid: true,
      isConfirmationValid: true,
    };
    this.login = this.login.bind(this);
    this.selectCategory = this.selectCategory.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  selectCategory(selectedCategory) {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      selectedCategory,
      isLoading: false,
    });
  }

  login() {
    const { email, password } = this.state;
    this.setState({ isLoading: true });
    // Firebase API call
    firebase
      .auth()
      .signInAndRetrieveDataWithEmailAndPassword(email, password)
      .then(response => {
        if (response) {
          // go to Home
          this.props.navigator.resetTo({
            screen: 'goodmate.Home',
            title: 'Home',
          });
        }
      })
      .catch(error => {
        LayoutAnimation.easeInEaseOut();
        this.setState({
          isLoading: false,
          isEmailValid: this.emailInput.shake(),
          isPasswordValid: password.length >= 8 || this.passwordInput.shake(),
        });
        console.log(error.code, error.message);
      });
  }

  signUp() {
    const { email, password, passwordConfirmation } = this.state;
    this.setState({ isLoading: true });

    if (password !== passwordConfirmation) {
      this.setState({
        isConfirmationValid: this.confirmationInput.shake(),
        isLoading: false,
      });
      return;
    }

    firebase.auth()
      .createUserAndRetrieveDataWithEmailAndPassword(email, password)
      .then(response => {
        if (response) {
          // go to Login
          this.selectCategory(0);
        }
      })
      .catch((error) => {
        // Handle Errors here.
        LayoutAnimation.easeInEaseOut();
        this.setState({
          isLoading: false,
          isEmailValid: this.emailInput.shake(),
          isPasswordValid: password.length >= 8 || this.passwordInput.shake(),
          isConfirmationValid: password === passwordConfirmation || this.confirmationInput.shake(),
        });
        console.log(error.code, error.message);
      });
  }

  render() {
    const {
      selectedCategory,
      isLoading,
      isEmailValid,
      isPasswordValid,
      isConfirmationValid,
      email,
      password,
      passwordConfirmation,
    } = this.state;
    const isLoginPage = selectedCategory === 0;
    const isSignUpPage = selectedCategory === 1;
    return (
      <View style={styles.container}>
        <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
          <View>
            <KeyboardAvoidingView contentContainerStyle={styles.loginContainer} behavior="position">
              <View style={styles.titleContainer}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.titleText}>GOODMATE</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Button
                  disabled={isLoading}
                  clear
                  activeOpacity={0.7}
                  onPress={() => this.selectCategory(0)}
                  containerStyle={{ flex: 1 }}
                  titleStyle={[styles.categoryText, isLoginPage && styles.selectedCategoryText]}
                  title="Login"
                />
                <Button
                  disabled={isLoading}
                  clear
                  activeOpacity={0.7}
                  onPress={() => this.selectCategory(1)}
                  containerStyle={{ flex: 1 }}
                  titleStyle={[styles.categoryText, isSignUpPage && styles.selectedCategoryText]}
                  title="Sign up"
                />
              </View>
              <View style={styles.rowSelector}>
                <TabSelector selected={isLoginPage} />
                <TabSelector selected={isSignUpPage} />
              </View>
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
                  ref={input => { this.emailInput = input; }}
                  onSubmitEditing={() => this.passwordInput.focus()}
                  onChangeText={e => this.setState({ email: e })}
                  displayError={!isEmailValid}
                  errorMessage="Please enter a valid email address"
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
                  ref={input => { this.passwordInput = input; }}
                  onSubmitEditing={() =>
                    (isSignUpPage ? this.confirmationInput.focus() : this.login())
                  }
                  onChangeText={p => this.setState({ password: p })}
                  displayError={!isPasswordValid}
                  errorMessage="Please enter at least 8 characters"
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
                    ref={input => { this.confirmationInput = input; }}
                    onSubmitEditing={this.signUp}
                    onChangeText={pc => this.setState({ passwordConfirmation: pc })}
                    displayError={!isConfirmationValid}
                    errorMessage="Please enter the same password"
                  />
                )}
                <Button
                  buttonStyle={styles.loginButton}
                  containerStyle={{ marginTop: 32, flex: 0 }}
                  activeOpacity={0.8}
                  title={isLoginPage ? 'LOGIN' : 'SIGN UP'}
                  onPress={isLoginPage ? this.login : this.signUp}
                  titleStyle={styles.loginTextButton}
                  loading={isLoading}
                  disabled={isLoading}
                />
              </View>
            </KeyboardAvoidingView>
            <View style={styles.helpContainer}>
              <Button
                title="Need help ?"
                titleStyle={{ color: 'white' }}
                buttonStyle={{ backgroundColor: 'transparent' }}
                underlayColor="transparent"
                onPress={() => console.log('Account created')}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowSelector: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectorContainer: {
    flex: 1,
    alignItems: 'center',
  },
  selected: {
    position: 'absolute',
    borderRadius: 50,
    height: 0,
    width: 0,
    top: -5,
    borderRightWidth: 70,
    borderBottomWidth: 70,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginTextButton: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: 'rgba(232, 147, 142, 1)',
    borderRadius: 10,
    height: 50,
    width: 200,
  },
  titleContainer: {
    height: 150,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: 'white',
    width: SCREEN_WIDTH - 30,
    borderRadius: 10,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    backgroundColor: 'transparent',
    opacity: 0.54,
  },
  selectedCategoryText: {
    opacity: 1,
  },
  titleText: {
    color: 'white',
    fontSize: 30,
  },
  helpContainer: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
