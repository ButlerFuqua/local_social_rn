import React, { useEffect } from 'react';
import { Button, Text, View } from 'react-native';

import { RootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux';

import { userService } from '../services';
import { setUsername } from '../features/user/userSlice';

export default function ProfileScreen() {

  const userId = useSelector((state: RootState) => state.user.userId);
  const email = useSelector((state: RootState) => state.user.email);
  const username = useSelector((state: RootState) => state.user.username);
  const userToken = useSelector((state: RootState) => state.user.userToken);

  const dispatch = useDispatch();

  const getProfileData = async () => {
   if (userId) {
     const {data} = await userService.getProfileData(userId);
     dispatch(setUsername(data.username))
   }
  }

  useEffect(() => {
   getProfileData();
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>ProfileScreen</Text>
      <Text>{email || 'No email'}</Text>
      <Text>{username || 'No username'}</Text>
      <Button title="getProfileData" onPress={getProfileData} />
    </View>
  );
}
