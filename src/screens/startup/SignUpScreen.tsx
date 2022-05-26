import React, { useState } from 'react';
import { Alert, Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { authService } from '../../services';

import { RootState } from '../../../store'
import { useDispatch } from 'react-redux'
import { setToken, setEmail, setUsername, } from '../../features/user/userSlice'

import { showAlert } from '../../utils/screenUtils';
import CustomButton from '../../components/CustomButton';

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
      dispatch(setUsername(user.email || null));
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
    <View style={styles.container}>
      <TextInput
        placeholder="email"
        value={email}
        onChangeText={setLocalEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <View style={styles.divider}></View>

      <CustomButton
        action={handleSignUp}
        backgroundColor="tomato"
        text="Sign Up!"
      />
      <CustomButton
        action={() => navigation.replace('SignIn')}
        backgroundColor="lightsalmon"
        text="Log in"
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
  divider: {
    marginBottom: 10,
    marginTop: 10,
  },
  button: {
    borderRadius: 50,
    backgroundColor: 'tomato',
    padding: 10,
    textAlign: 'center',
    color: '#fff',
    elevation: 5,
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fefefe',
    borderRadius: 50,
    marginBottom: 5,
    elevation: 5,
    padding: 10
  }
})