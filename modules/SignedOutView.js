import React from 'react';
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
import ForgotPassword from './ForgotPassword';

export const SignedOutView = ({styles, handleSignIn, handleSignInCheat, handleSignUp, errorMessage, setState}) => (<View style={styles.container}>
  <Image source={require('../img/logo.png')} style={styles.logo} />
  <Text style={styles.h1}>Please Sign in to Continue</Text>
  {errorMessage()}
  <View style={styles.inputs}>
    <View style={styles.inputContainer}>
      <TextInput autoCapitalize="none" autoCorrect={false} autoFocus={true} style={[styles.input, styles.whiteFont]}
        placeholder="Username" placeholderTextColor="#FFF"
        onChangeText={(Username) => setState({Username})}
      />
    </View>
    <View style={styles.inputContainer}>
      <TextInput autoCapitalize="none" autoCorrect={false} password={true} style={[styles.input, styles.whiteFont]}
        placeholder="Password" placeholderTextColor="#FFF"
        onChangeText={(Password) => setState({Password})}
      />
    </View>
  </View>
  <ForgotPassword styles={styles} />
  <View style={styles.signincont}>
    <View style={styles.signin}>
      <TouchableHighlight onPress={handleSignIn}><Text style={styles.whiteFont}>Sign In</Text></TouchableHighlight>
    </View>
    <Text style={{width: 10}} />
    <View style={styles.signin}>
      <TouchableHighlight onPress={handleSignInCheat}><Text style={styles.whiteFont}>Cheat</Text></TouchableHighlight>
    </View>
  </View>
  <View style={styles.signup}>
    <Text style={styles.greyFont}>Don&lsquo;t have an account?<Text style={styles.whiteFont}>  <TouchableHighlight onPress={() => setState({curState: 'UserSignUp'})}>Sign Up</TouchableHighlight></Text></Text>
  </View>
</View>);

export default SignedOutView;