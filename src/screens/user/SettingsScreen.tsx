import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { clearUserData } from '../../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import { userService } from '../../services';
import { RootState } from '../../../store';
import { showAlert } from '../../utils/screenUtils';

export default function SettingsScreen({ navigation }: any) {

  const userId = useSelector((state: RootState) => state.user.userId);
  const userToken = useSelector((state: RootState) => state.user.userToken);
  if(!userId || !userToken){
    return navigation.replace('SignIn');
  }
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isProfileIsDisabled, setIsProfileIsDisabled] = useState(false);

  const getProfileData = async () => {

    setIsLoading(true);

     const {data, error} = await userService.getProfileData(userId);
     if(error || !data){
      showAlert('Error fetching profile', error.message || 'Please try again');
      navigation.replace('Bulletin');
      return
     }

     const { disabled } = data;
     setIsProfileIsDisabled(disabled);

     setIsLoading(false);

  }

  useEffect(() => {
    getProfileData();
  }, []);

  const handleSignOut = async () => {
    dispatch(clearUserData());
    navigation.replace('SignIn');
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={[
          { 
            label: 'Sign out',
            action: handleSignOut
           },
          { 
            label: !isProfileIsDisabled ? 'Delete Account' : 'Re-enable Profile',
            action: () => {
              if(!isProfileIsDisabled){
                navigation.navigate('DeleteAccount');
              }else {
                userService.updateProfile(userToken, {disabled: false});
                showAlert('Profile Enabled', 'Your account is no longer scheduled for deletion.')
                navigation.navigate('Bulletin');
              }
            }
           },
        ]}
        renderItem={({ item }) => (
          <Pressable onPress={item.action}>
            <Text style={styles.item}>
            {item.label}
          </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 2
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
})
