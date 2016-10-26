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
        curState: 'Initial'
      });
    };
    this._errorMessage = function () {
      if (oThis.state.error.showError)
        return (
          <Text style={styles.error}>{oThis.state.error.message}</Text>
        );
    }
    this._handleSignInCheat = function () {
      oThis.setState({
        curState: 'UserLoggedIn',
        fullName: 'Lord Praveen'
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
          // -------------------------------------------------------- console.warn("Successfully received token.");
          oThis.setState({curState: 'UserTokenSuccess'});
          if (typeof token == "string" && token.length > 50) {
            // -------------------------------------------------------- console.warn("Received token seems to be right.");
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            axios.get('https://feedme.allan.cx/api/v1/account')
              .then((response) => {
                // -------------------------------------------------------- console.warn("User Successfully Logged In.");
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
      });
    };
  }
  render() {
    if (this.state.curState != 'UserLoggedIn')
      return (
        <View style={styles.container}>
          <Image source={require('./img/logo.png')} style={styles.logo} />
          <Text style={styles.h1}>Please Sign in to Continue</Text>
          {this._errorMessage()}
          <View style={styles.inputs}>
            <View style={styles.inputContainer}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus={true}
                style={[styles.input, styles.whiteFont]}
                placeholder="Username"
                placeholderTextColor="#FFF"
                onChangeText={(Username) => this.setState({Username})}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                password={true}
                style={[styles.input, styles.whiteFont]}
                placeholder="Password"
                placeholderTextColor="#FFF"
                onChangeText={(Password) => this.setState({Password})}
              />
            </View>
          </View>
          <View style={styles.forgotContainer}>
            <Text style={styles.greyFont}>Forgot Password</Text>
          </View>
          <View style={styles.signincont}>
            <View style={styles.signin}>
              <TouchableHighlight onPress={this._handleSignIn}><Text style={styles.whiteFont}>Sign In</Text></TouchableHighlight>
            </View>
            <Text style={{width: 10}} />
            <View style={styles.signin}>
              <TouchableHighlight onPress={this._handleSignInCheat}><Text style={styles.whiteFont}>Cheat</Text></TouchableHighlight>
            </View>
          </View>
          <View style={styles.signup}>
            <Text style={styles.greyFont}>Don&lsquo;t have an account?<Text style={styles.whiteFont}>  Sign Up</Text></Text>
          </View>
        </View>
      );
    else
      return (
        <View style={styles.container}>
          <Text style={styles.h1}>Welcome, {this.state.fullName}</Text>
          <View style={styles.signin}>
            <TouchableHighlight onPress={this._handleSignOut}><Text style={styles.whiteFont}>Sign Out</Text></TouchableHighlight>
          </View>
        </View>
      );
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
