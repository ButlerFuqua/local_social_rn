import * as React from 'react';
import { Button, Text, View } from 'react-native';

import { setToken, } from '../features/user/userSlice'

export default function SettingsScreen({ navigation }:any) {

  const handleSignOut = async () => {
    // clear all user data
    setToken(null);
    // navigate to signIn screen
    navigation.replace('SignIn');
  }

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>SettingsScreen</Text>
        <Button title="SignOut" onPress={handleSignOut} />
      </View>
    );
  }
  