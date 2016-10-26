import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';

export const SignedInView = ({styles, fullName, handleSignOut}) => (<View style={styles.container}>
  <Text style={styles.h1}>Welcome, {fullName}</Text>
  <View style={styles.signin}>
    <TouchableHighlight onPress={handleSignOut}><Text style={styles.whiteFont}>Sign Out</Text></TouchableHighlight>
  </View>
</View>);

export default SignedInView;
