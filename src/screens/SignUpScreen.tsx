import React, { useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { authService } from '../services';

export default function SignUpScreen({ navigation }: any) {

  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    setIsLoading(true);
    const { user, session, error } = await authService.signUpUser('butlerfuqua+user1@gmail.com', 'password');
    if (error) {
      Alert.alert(
        "Trouble Creating Account",
        error.message || `Please try again.`,
        [
          {
            text: "Close",
            // onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
        ]
      );
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
      <Button title="Create Account" onPress={handleSignUp} />
      <Button title="Sign in" onPress={() => navigation.replace('SignIn')} />
    </View>
  );
}
