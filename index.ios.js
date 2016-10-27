import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ListView,
  Image,
  Text,
  TextInput,
  StatusBar,
  TouchableHighlight,
  View
} from 'react-native';
import axios from 'axios';
import SignedOutView from './modules/SignedOutView';
import SignedInView from './modules/SignedInView';
import SignUpView from './modules/SignUpView';

export default class PraveenRNApp extends Component {
  constructor(props) {
    super(props);
    oThis = this;
    this.state = {
      Username: '',
      Password: '',
      token: '',
      code: '',
      error: {
        message: '',
        showError: false
      },
      fullName: '',
      accountValues: ["Praveen Kumar", "Accenture", "Newcastle"],
      curState: 'Initial'
    };
    this._handleSignOut = function () {
      oThis.setState({
        Username: '',
        Password: '',
        token: '',
        code: '',
        error: {
          message: '',
          showError: false
        },
        fullName: '',
        accountValues: ["Praveen Kumar", "Accenture", "Newcastle"],
        curState: 'Initial'
      });
    };
    this._errorMessage = function () {
       if (oThis.state.error.showError)
        return (
          <Text style={styles.error}>{oThis.state.error.message}</Text>
        );
      else
        return null;
    }
    this._handleSignInCheat = function () {
      oThis.setState({
        curState: 'UserLoggedIn',
        fullName: 'Lord Praveen'
      });
    };
    this._setState = function (state) {
      oThis.setState(state);
    };
    this._handleSignUp = function () {
      fetch("https://feedme.allan.cx/api/v1/signup", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "email": oThis.state.Username,
          "password": oThis.state.Password,
          "name": oThis.state.regName
        })
      }).then((responseJson) => {
        var res = JSON.parse(responseJson._bodyInit);
        if (responseJson.ok) {
          // Success
          if (res.code == "USER_CREATED") {
            oThis.setState({
              curState: "Initial"
            });
            console.warn("Registration Success! Please sign in.");
          }
        } else {
          if (res.code == "SIGNUP_ERROR")
            console.warn("Registration Failed! Username already exists.");
          else if (res.code == "INVALID_PROMO")
            console.warn("Registration Failed! Invalid Promo Code.");
        }
      });
    };
    this._handleSignIn = function () {
      fetch("https://feedme.allan.cx/api/v1/authenticate", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "email": oThis.state.Username,
          "password": oThis.state.Password
        })
      }).then((responseJson) => {
        if (responseJson.ok) {
          var token = JSON.parse(responseJson._bodyInit);
          token = token.token;
          oThis.setState({curState: 'UserTokenSuccess'});
          if (typeof token == "string" && token.length > 50) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            axios.get('https://feedme.allan.cx/api/v1/account')
              .then((response) => {
                oThis.setState({
                  purchases: (response.data.purchases) ? response.data.purchases : [],
                  account: response.data.account,
                  fullName: response.data.account.name,
                  curState: 'UserLoggedIn'
                });
              })
              .catch((err) => console.log('error '+ JSON.stringify(err)))
          }
        } else {
          oThis.setState({
            error: {
              message: 'Username or Password Incorrect',
              showError: true
            }
          });
        }
      }).catch((err) => console.log('error '+ JSON.stringify(err)));
    };
  }
  render() {
    switch (this.state.curState) {
      case "UserLoggedIn":
        return (
            <SignedInView styles={styles} fullName={this.state.fullName} handleSignOut={this._handleSignOut} />
        );
        break;
      case "UserSignUp":
        return (
            <SignUpView styles={styles} handleSignIn={this._handleSignIn} handleSignUp={this._handleSignUp} handleSignInCheat={this._handleSignInCheat} errorMessage={this._errorMessage} setState={this._setState} />
        );
        break;
      case "Initial":
        return (
            <SignedOutView styles={styles} handleSignIn={this._handleSignIn} handleSignInCheat={this._handleSignInCheat} errorMessage={this._errorMessage} setState={this._setState} />
        );
        break;
      default:
        return null;
    }
  }
}

const baseFont = 'Avenir Next';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#324759'
  },
  logo: {
    width: 150,
    height: 37.5,
    marginBottom: 15
  },
  h1: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    fontFamily: baseFont
  },
  signin: {
    backgroundColor: '#FF3366',
    padding: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  signincont: {
    flexWrap: 'wrap', 
    alignItems: 'flex-start',
    flexDirection:'row',
  },
  signup: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputs: {
    marginTop: 10,
    marginBottom: 10,
  },
  inputContainer: {
    padding: 10,
    borderWidth: 1,
    borderBottomColor: '#999',
    borderColor: 'transparent',
    width: 250
  },
  input: {
    height: 20,
    fontSize: 14,
    fontFamily: baseFont
  },
  forgotContainer: {
    alignItems: 'flex-end',
    padding: 15,
  },
  error: {
    color: '#fff',
    padding: 10,
    borderWidth: 2,
    borderColor: '#f00',
    backgroundColor: '#f33',
    borderRadius: 5,
    overflow: 'hidden',
    paddingBottom: 7,
    textAlign: 'center',
    // width: '100%'
  },
  greyFont: {
    color: '#D8D8D8',
    fontFamily: baseFont
  },
  whiteFont: {
    color: '#FFF',
    fontFamily: baseFont
  }
});

AppRegistry.registerComponent('PraveenRNApp', () => PraveenRNApp);
