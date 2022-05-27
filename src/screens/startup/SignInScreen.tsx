import React, { useState, useEffect } from 'react';
import { Alert, Button, Pressable, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { authService, storageService } from '../../services';

import { RootState } from '../../../store'
import { useSelector, useDispatch } from 'react-redux'
import { setToken, setEmail, setUserId} from '../../features/user/userSlice'

import { showAlert } from '../../utils/screenUtils';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { supabaseClient } from '../../clients';
import LoadingScreen from '../../components/LaodingScreen';

export default function SignInScreen({ navigation }: any) {

  const userToken = useSelector((state: RootState) => state.user.userToken);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [email, setLocalEmail] = useState('butlerfuqua+user@gmail.com');
  const [password, setPassword] = useState('password');

  useEffect(() => {
    const bootstrapSignIn = async () => {
      // TODO change this to get from storage, not state management
      if (!userToken) {
        setIsLoading(false);
        return
      }
      // Get user data from token (nullify if there is an error, or token is invalid)
      const { user, error } = await authService.getUserDataFromToken(userToken);
      if(!user && error ){
        return;
      }
      dispatch(setEmail(user?.email || null));
      dispatch(setUserId(user?.id || null));
      supabaseClient.auth.setAuth(userToken);
      navigation.replace('Home');
    }

    bootstrapSignIn();
  }, []);

  const handleSignIn = async () => {
    setIsLoading(true);
    const { user, session, error } = await authService.signInUser(email, password);
    if (error || !session?.access_token) {
      showAlert("Trouble Signing in", error?.message || `Please try again.`);
      setIsLoading(false);
    } else {
      // TODO change this to save to storage, not state management
      dispatch(setToken(session.access_token));
      dispatch(setEmail(user?.email || null));
      dispatch(setUserId(user?.id || null));
      supabaseClient.auth.setAuth(session.access_token);
      navigation.replace('Home');
    }
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <View style={styles.container}>
        <CustomTextInput 
          placeholder="email"
          value={email}
          onChangeText={setLocalEmail}
        />
        <CustomTextInput 
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        />
      
      <View style={styles.divider}></View>

      <CustomButton
        action={handleSignIn}
        text="Log in"
      />
      <CustomButton
        action={() => navigation.replace('SignUp')}
        backgroundColor="teal"
        text="Create Account"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'stretch', 
    padding: 20,
  },
  divider:{
    marginBottom: 10,
    marginTop: 10,
  },
})