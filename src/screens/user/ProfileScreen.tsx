import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { RootState } from '../../../store';
import { useSelector } from 'react-redux';

import { userService } from '../../services';
import { showAlert } from '../../utils/screenUtils';
import { useIsFocused } from '@react-navigation/native';
import LoadingScreen from '../../components/LoadingScreen';

export default function ProfileScreen({navigation, route}: any) {

  const {userId} = route.params;

  const currentUserId = useSelector((state: RootState) => state.user.userId);
  if(!currentUserId){
    showAlert('Error', 'Please try again');
    return navigation.replace('Home');
  }
  const isFocused = useIsFocused();

  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getProfileData = async () => {

    setIsLoading(true);

     const {data, error} = await userService.getProfileData(userId || currentUserId);
     if(error || !data){
      showAlert('Error fetching profile', error.message || 'Please try again');
      navigation.replace('Home');
      return
     }

     const { username } = data;
     setUsername(username);

     setIsLoading(false);

  }

  useEffect(() => {
   getProfileData();
  }, [isFocused]);

  if(isLoading){
    return <LoadingScreen />
  }

  return (
    <View style={styles.container}>
      <Text style={styles.username}>{username || 'Loading...'}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  username: {
    fontSize: 18,
    textAlign: 'center',
  },
})