/* eslint no-unused-expressions: 0 */
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
  TouchableOpacity,
} from 'react-native';

import firebase from 'react-native-firebase';
import { Button } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import { goToHome } from '../components/navigation';
import LoginForm from '../components/LoginForm';
// import DataStore from '../utils/DataStore';
import FireTools from '../utils/FireTools';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const BG_IMAGE = require('../assets/bg2.jpg');

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental
  && UIManager.setLayoutAnimationEnabledExperimental(true);

const TabSelector = ({ selected }) => (
  <View style={styles.selectorContainer}>
    <View style={selected && styles.selected} />
  </View>
);

const TitleSection = () => (
  <View style={styles.titleContainer}>
    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.titleText}>GOODMATE</Text>
    </View>
  </View>
);

const OptionSelector = ({ isLoginPage, isSignUpPage, selectCategory }) => (
  <View style={{ flexDirection: 'row' }}>
    <Button
      type="clear"
      activeOpacity={0.7}
      onPress={() => selectCategory(0)}
      containerStyle={{ flex: 1 }}
      titleStyle={[styles.categoryText, isLoginPage && styles.selectedCategoryText]}
      title="Login "
    />
    <Button
      type="clear"
      activeOpacity={0.7}
      onPress={() => selectCategory(1)}
      containerStyle={{ flex: 1 }}
      titleStyle={[styles.categoryText, isSignUpPage && styles.selectedCategoryText]}
      title="Sign up "
    />
  </View>
);

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: 0,
      isLoading: false,
      emailError: null,
      passwordError: null,
      confirmError: null,
    };
    this.unsubscriber = null;
    this.selectCategory = this.selectCategory.bind(this);
    this.openHelpModal = this.openHelpModal.bind(this);
  }

  componentDidMount() {
    this.unsubscriber = firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        goToHome();
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }

  selectCategory(selectedCategory) {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      selectedCategory,
      isLoading: false,
    });
  }

  // async loginWithCred(credential) {
  //   if (this.loginForm) {
  //     this.setState({ isLoading: true });
  //   }

  //   const cred = await FireTools.loginWithCred(credential);
  //   if (cred) {
  //     goToHome();
  //   } else {
  //     this.setState({ isLoading: false });
  //   }
  // }

  async loginWithEmail(email, password) {
    if (email.trim() !== '' && password.trim() !== '') {
      if (this.loginForm) {
        this.setState({ isLoading: true });
      }
      const credential = await FireTools.loginWithEmail(email, password);
      if (credential) {
        // user state will change from null to value, will fire listener defined above
      } else {
        this.setState({
          isLoading: false,
          emailError: 'Please enter a valid email address',
          passwordError: 'Please enter at least 8 characters',
        });
        this.loginForm.emailInput.shake();
        this.loginForm.passwordInput.shake();
      }
    }
  }

  async signUp(email, password, passwordConfirmation) {
    if (email.trim() !== '' && password.trim() !== '' && passwordConfirmation.trim() !== '') {
      this.setState({ isLoading: true });
      if (password !== passwordConfirmation) {
        this.setState({
          isLoading: false,
          passwordError: 'Please enter at least 8 characters',
          confirmError: 'Please enter the same password',
        });
        this.loginForm.passwordInput.shake();
        this.loginForm.confirmationInput.shake();
        return;
      }

      const credential = await FireTools.createUserWithEmail(email, password);
      if (credential) {
        // go to Welcome
        this.setState({ isLoading: false });
        this.openWelcomeModal();
        this.selectCategory(0);
      } else {
        this.setState({
          isLoading: false,
          emailError: 'Please enter a valid email address',
          passwordError: 'Please enter at least 8 characters',
          confirmError: 'Please enter the same password',
        });
        this.loginForm.emailInput.shake();
        this.loginForm.passwordInput.shake();
        this.loginForm.confirmationInput.shake();
      }
    }
  }

  openWelcomeModal() {
    Navigation.showModal({
      component: {
        name: 'goodmate.WelcomeModal',
        options: {
          animationType: 'slide-up',
        },
      },
    });
  }

  openHelpModal() {
    Navigation.showModal({
      component: {
        name: 'goodmate.HelpModal',
        options: {
          animationType: 'slide-up',
        },
      },
    });
  }

  render() {
    const { selectedCategory, isLoading } = this.state;

    const isLoginPage = selectedCategory === 0;
    const isSignUpPage = selectedCategory === 1;

    return (
      <View style={styles.container}>
        <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
          <View>
            <KeyboardAvoidingView contentContainerStyle={styles.loginContainer} behavior="position">
              <TitleSection />
              <OptionSelector
                isLoginPage={isLoginPage}
                isSignUpPage={isSignUpPage}
                selectCategory={v => this.selectCategory(v)}
              />
              <View style={styles.rowSelector}>
                <TabSelector selected={isLoginPage} />
                <TabSelector selected={isSignUpPage} />
              </View>
              <LoginForm
                login={(e, p) => this.loginWithEmail(e, p)}
                signUp={(e, p, c) => this.signUp(e, p, c)}
                isLoading={isLoading}
                isLoginPage={isLoginPage}
                isSignUpPage={isSignUpPage}
                emailErrorMessage={this.state.emailError}
                passwordErrorMessage={this.state.passwordError}
                confirmErrorMessage={this.state.confirmError}
                ref={form => {
                  this.loginForm = form;
                }}
              />
            </KeyboardAvoidingView>
            <TouchableOpacity onPress={this.openHelpModal}>
              <View style={styles.helpContainer}>
                <Text style={{ color: 'white', fontSize: 18 }}>Need help?</Text>
              </View>
            </TouchableOpacity>
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
  titleContainer: {
    height: 150,
    backgroundColor: 'transparent',
    justifyContent: 'center',
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
