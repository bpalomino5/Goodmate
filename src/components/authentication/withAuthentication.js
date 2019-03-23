/* eslint no-unused-expressions: 0 */
import React, { Component } from 'react';
import { firebase } from '../../firebase';
import { goToHome } from '../navigation';
// import AuthUserContext from './AuthUserContext';

const withAuthentication = WrappedComponent => class WithAuthentication extends Component {
    state = { authFlag: false };

    componentDidMount() {
      this.unsubscriber = firebase.auth.onAuthStateChanged(user => {
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

    render() {
      // const { authUser } = this.state;
      return (
        //   <AuthUserContext.Provider value={authUser}>
        <WrappedComponent {...this.props} />
        //   </AuthUserContext.Provider>
      );
    }
};

export default withAuthentication;
