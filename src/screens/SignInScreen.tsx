import React, { useState, useEffect } from 'react';
import { Alert, Button, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { authService, storageService } from '../services';

import { RootState } from '../../store'
import { useSelector, useDispatch } from 'react-redux'
import { setToken, setEmail, } from '../features/user/userSlice'

export default function SignInScreen({ navigation }: any) {

  const userToken = useSelector((state: RootState) => state.user.userToken);
  const dispatch = useDispatch();


  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {

    const bootstrapSignIn = async () => {
      // TODO change this to get from storage, not state management
      if (!userToken) {
        setIsLoading(false);
        return
      }

      // Get user data from token (nullify if there is an error, or token is invalid)

      // Set user data in state

      // navigate to home page


    }

    bootstrapSignIn();



  }, [])

  const handleSignIn = async () => {
    setIsLoading(true);
    const { user, session, error } = await authService.signInUser('butlerfuqua+user1@gmail.com', 'password');
    if (error || !session?.access_token) {
      Alert.alert(
        "Trouble Signing in",
        error?.message || `Please try again.`,
        [
          {
            text: "Close",
            // onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
        ]
      );
      setIsLoading(false);
    } else {
      dispatch(setToken(session.access_token));
      console.log('USER DATA')
      for(let prop in user){
        console.log(prop, (user as any)[prop])
      }
      dispatch(setEmail(user?.email || null));
      navigation.replace('Home');
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
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign in" onPress={handleSignIn} />
      <Button title="Create Account" onPress={() => navigation.replace('SignUp')} />
    </View>
  );
}
