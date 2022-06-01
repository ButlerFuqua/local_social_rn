import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomTextArea from '../../components/CustomTextArea';
import { userService } from '../../services';

import { RootState } from '../../../store'
import { useSelector } from 'react-redux';
import { showAlert } from '../../utils/screenUtils';
import LoadingScreen from '../../components/LoadingScreen';
import CustomTextInput from '../../components/CustomTextInput';

type EditPostScreenProps = {
  route: {
    params: {
      postId: string | number
      postUserId: string
    }
  },
  navigation: any,
}

export default function EditProfileScreen({ navigation, }: EditPostScreenProps) {
  const isFocused = useIsFocused();

  const userToken = useSelector((state: RootState) => state.user.userToken);
  const userId = useSelector((state: RootState) => state.user.userId);
  if (!userId) {
    showAlert('User not found', 'Please try again');
    return navigation.replace('SignIn');
  }

  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [areYouSureDelete, setAreYouSureDelete] = useState(false);

  const getProfile = async () => {
    setIsLoading(true);

    if (!userToken) {
      return navigation.replace('Home');
    }

    const { data, error } = await userService.getProfileData(userId);
    if (!data || error) {
      showAlert('Error fetching post', error?.message || 'Please try again');
      return navigation.pop();
    }

    const { username, } = data;
    setUsername(username);

    setIsLoading(false);
  }

  useEffect(() => {
    getProfile();
  }, [isFocused]);

  if (isLoading) {
    return <LoadingScreen />
  }

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    if (!userToken) {
      return navigation.replace('SignIn');
    }

    // * Validation
    // trim and lower
    let modifiedUsername = username.trim().toLowerCase();
    // Minimum characters
    if (modifiedUsername.length < 6) {
      setIsLoading(false);
      return showAlert('Incorrect username', 'Username must be at least 6 characters long.');
    }
    // remove spaces
    modifiedUsername = modifiedUsername.replace(/\s/g, '_');


    const { error } = await userService.updateProfile(userToken, {
      username: modifiedUsername,
    });
    if (error) {
      let message;
      if (error?.code === '23505') {
        message = `That username is already taken.`
      }
      showAlert('Error updating profile', message || 'Please Try again');
      setIsLoading(false);
      return;
    }
    navigation.pop();
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>
        <View style={{ marginBottom: 20 }}></View>
        <View style={styles.inputField}>
          <Text style={styles.label}>Username</Text>
          <CustomTextInput
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={{ marginBottom: 20 }}></View>

        <CustomButton
          text="Submit"
          action={handleUpdateProfile}
        />
        <View style={{ marginBottom: 100 }}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 15
  },
  inputField: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 10,
  },
  deleteContainer: {
    padding: 30
  },
  areYouSure: {
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 18,
    color: 'red'
  }
});
