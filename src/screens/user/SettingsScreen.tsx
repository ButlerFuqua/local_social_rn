import React from 'react';
import { Button, Text, View } from 'react-native';

import { clearUserData } from '../../features/user/userSlice'
import { useDispatch } from 'react-redux';

export default function SettingsScreen({ navigation }:any) {

  const dispatch = useDispatch();

  const handleSignOut = async () => {
    dispatch(clearUserData());
    navigation.replace('SignIn');
  }

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>SettingsScreen</Text>
        <Button title="SignOut" onPress={handleSignOut} />
      </View>
    );
  }
  