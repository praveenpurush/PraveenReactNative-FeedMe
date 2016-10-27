import React from 'react';
import {View, Text, TouchableHighlight, ListView} from 'react-native';

export const SignedInView = ({styles, fullName, handleSignOut, state, getAccInfo}) => (<View style={styles.container}>
  <Text style={styles.h1}>Welcome, {fullName}</Text>
  <Text>Account Information</Text>
  <ListView
    dataSource={getAccInfo()}
    renderRow={(rowData) => <Text>{rowData}</Text>}
  />
  <View style={styles.signin}>
    <TouchableHighlight onPress={handleSignOut}><Text style={styles.whiteFont}>Sign Out</Text></TouchableHighlight>
  </View>
</View>);

export default SignedInView;
