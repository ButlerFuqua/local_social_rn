import * as React from 'react';
import { Text, View } from 'react-native';

import { RootState } from '../../store';
import { useSelector } from 'react-redux';


export default function ProfileScreen() {

  const username = useSelector((state: RootState) => state.user.username);
  const email = useSelector((state: RootState) => state.user.email);
  const userToken = useSelector((state: RootState) => state.user.userToken);


    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>ProfileScreen</Text>
        <Text>{email || 'No email'}</Text>
      </View>
    );
  }
  