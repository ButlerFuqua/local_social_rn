import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SplashScreen from '../screens/SplashScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { storageService } from '../services';

import { RootState } from '../../store'
import { useSelector, useDispatch } from 'react-redux'
import { setToken, } from '../features/user/userSlice'

const Stack = createNativeStackNavigator();

export default function Navigator() {

  const userToken = useSelector((state: RootState) => state.user.userToken);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrapNavigator = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(() => setIsLoading(false), 500));
    }
    bootstrapNavigator();

  }, [])

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SignIn'>
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{
            // When logging out, a pop animation feels intuitive
            // You can remove this if you want the default 'push' animation
            // animationTypeForReplace: isSignout ? 'pop' : 'push',
            headerShown: false,
          }}
        />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{
          headerShown: false,
        }} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{
          headerShown: false,
        }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{
          headerShown: false,
        }} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}