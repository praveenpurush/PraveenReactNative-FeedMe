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

export const SignUpView = ({styles, handleSignIn, handleSignInCheat, handleSignUp, errorMessage, setState}) => (<View style={styles.container}>
  <Image source={require('../img/logo.png')} style={styles.logo} />
  <Text style={styles.h1}>Please Sign Up here</Text>
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
    <View style={styles.inputContainer}>
      <TextInput autoCapitalize="none" autoCorrect={false} autoFocus={false} style={[styles.input, styles.whiteFont]}
        placeholder="Full Name" placeholderTextColor="#FFF"
        onChangeText={(regName) => setState({regName})}
      />
    </View>
  </View>
  <View style={styles.signincont}>
    <View style={styles.signin}>
      <TouchableHighlight onPress={handleSignUp}><Text style={styles.whiteFont}>Sign Up</Text></TouchableHighlight>
    </View>
  </View>
  <View style={styles.signup}>
    <Text style={styles.greyFont}>Have an account already? <Text style={styles.whiteFont} onPress={() => setState({curState: 'Initial'})}>Sign In</Text></Text>
  </View>
</View>);

export default SignUpView;