import React, { useState } from 'react';
import { Alert, Button, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { authService } from '../services';

export default function SignInScreen({ navigation }: any) {

  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleSignIn = async () => {
    setIsLoading(true);
    const { user, session, error } = await authService.signInUser('butlerfuqua+user1@gmail.com', 'password');
    if (error) {
      Alert.alert(
        "Trouble Signing in",
        error.message || `Please try again.`,
        [
          {
            text: "Close",
            // onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
        ]
      );
    } else {
      console.log(session?.access_token);
    }

    setIsLoading(false);


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
