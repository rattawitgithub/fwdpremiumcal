import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import { Button } from '@material-ui/core';
import GoogleIcon from 'src/icons/Google';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '797401886567-9cumct9mrt3v2va409rasa7fa6fq02hh.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();

          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <Button
          color="secondary"
          fullWidth
          startIcon={<GoogleIcon />}
          onClick={this.onSignOutClick}
          size="large"
          variant="text"
        >
          Sign Out
        </Button>
      );
    } else {
      return (
        <Button
          color="secondary"
          fullWidth
          startIcon={<GoogleIcon />}
          onClick={this.onSignInClick}
          size="large"
          variant="text"
        >
          Sign In with Google
        </Button>
      );
    }
  }

  render() {
    return <>{this.renderAuthButton()}</>;
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
