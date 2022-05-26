import React, { useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { authService } from '../services';

import { RootState } from '../../store'
import { useDispatch } from 'react-redux'
import { setToken, setEmail, } from '../features/user/userSlice'

import { showAlert } from '../utils/screenUtils';

export default function SignUpScreen({ navigation }: any) {

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setLocalEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    setIsLoading(true);
    const { user, session, error } = await authService.signUpUser(email, password);
    if (error || !user || !session) {
      showAlert("Trouble Creating Account", error?.message || `Please try again.`);
      setIsLoading(false);
      return
    }

    if (session.access_token) {
      dispatch(setEmail(user.email || null));
      dispatch(setToken(session.access_token));
      navigation.replace('Home');
    } else {
      showAlert("Trouble Creating Account", `Please try again.`);
      setIsLoading(false);
    }



  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    )
  }


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        placeholder="email"
        value={email}
        onChangeText={setLocalEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Create Account" onPress={handleSignUp} />
      <Button title="Sign in" onPress={() => navigation.replace('SignIn')} />
    </View>
  );
}
