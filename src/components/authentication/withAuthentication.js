/* eslint no-unused-expressions: 0 */
import React, { Component } from "react";
import { firebase } from "../../firebase";
import { goToHome } from "../navigation";

const withAuthentication = WrappedComponent =>
  class WithAuthentication extends Component {
    state = { authFlag: false };

    componentDidMount = () => {
      this.unsubscriber = firebase.auth.onAuthStateChanged(user => {
        const { authFlag } = this.state;
        if (user != null && !authFlag) {
          this.setState({ authFlag: true });
          goToHome();
        }
      });
      this.unsubscriber();
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

export default withAuthentication;
