import React, { Component } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  ImageBackground,
  LayoutAnimation,
  UIManager
} from "react-native";

import Layout from "../../../constants/Layout";
import RegistrationForm from "./components/RegistrationForm";
import OptionSelector from "./components/OptionSelector";
import HelpButton from "./components/HelpButton";
import BG_IMAGE from "../../assets/bg2.jpg";

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const Header = () => (
  <View style={styles.titleContainer}>
    <View style={{ flexDirection: "row" }}>
      <Text style={styles.titleText}>GOODMATE</Text>
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
  static navigationOptions = {
    header: null,
    headerBackTitle: null
  };

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
    const { navigation } = this.props;
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
            navigation={navigation}
            isLoginPage={isLoginPage}
            isSignUpPage={isSignUpPage}
          />
        </KeyboardAvoidingView>
        <HelpButton navigation={navigation} />
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
    justifyContent: "center"
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: Layout.window.width,
    height: Layout.window.height,
    justifyContent: "center",
    alignItems: "center"
  },
  titleText: {
    color: "white",
    fontSize: 30
  }
});

export default Login;
