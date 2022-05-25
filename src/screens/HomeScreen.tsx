import * as React from 'react';
import { Button, Text, View } from 'react-native';

import { RootState } from '../../store'
import { useSelector, useDispatch } from 'react-redux'
import { setToken, } from '../features/user/userSlice'

export default function HomeScreen({navigation}:any) {

  const handleSignOut = async () => {
    // clear all user data
    setToken(null);
    // navigate to signIn screen
    navigation.replace('SignIn');
  }

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>HomeScreen</Text>
        <Button title='Sign Out' onPress={handleSignOut} />
      </View>
    );
  }
  