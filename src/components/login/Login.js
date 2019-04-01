/* eslint no-unused-expressions: 0 */
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  UIManager,
  LayoutAnimation,
  KeyboardAvoidingView
} from "react-native";

import withAuthentication from "../authentication/withAuthentication";
import RegistrationForm from "./components/RegistrationForm";
import OptionSelector from "./components/OptionSelector";
import HelpButton from "./components/HelpButton";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
import BG_IMAGE from "../../assets/bg2.jpg";

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const Header = () => (
  <View style={styles.titleContainer}>
    <View style={{ flexDirection: "column" }}>
      <Text style={styles.titleText}>Welcome to</Text>
      <Text style={styles.titleText}>Goodmate!</Text>
    </View>
  </View>
);

const LoginPageContainer = ({ children }) => (
  <View style={styles.container}>
    <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
      <View>{children}</View>
    </ImageBackground>
  </View>
);

class Login extends Component {
  state = {
    selectedCategory: 0
  };

  selectCategory = selectedCategory => {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      selectedCategory,
      isLoading: false
    });
  };

  render() {
    const { selectedCategory } = this.state;
    const isLoginPage = selectedCategory === 0;
    const isSignUpPage = selectedCategory === 1;

    return (
      <LoginPageContainer>
        <KeyboardAvoidingView
          contentContainerStyle={styles.loginContainer}
          behavior="position"
        >
          <Header />
          <OptionSelector
            isLoginPage={isLoginPage}
            isSignUpPage={isSignUpPage}
            selectCategory={v => this.selectCategory(v)}
          />
          <RegistrationForm
            selectCategory={this.selectCategory}
            isLoginPage={isLoginPage}
            isSignUpPage={isSignUpPage}
          />
        </KeyboardAvoidingView>
        <HelpButton />
      </LoginPageContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loginContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  titleContainer: {
    height: 150,
    backgroundColor: "transparent",
    // backgroundColor: "red",
    justifyContent: "flex-start"
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center"
  },
  titleText: {
    textAlign: "center",
    color: "white",
    fontSize: 35,
    fontStyle: "italic"
  }
});

export default withAuthentication(Login);
