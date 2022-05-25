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
  const isSignout = useSelector((state: RootState) => state.user.isSignout);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await storageService.getItem('user-token');
        setToken(token);

      } catch (error) {
        console.log(error)
        setToken(null)
      }
      setIsLoading(false);
    }
    setIsLoading(true);
    new Promise(resolve => setTimeout(() => resolve(getToken()), 500))
  }, [])

  if (isLoading) {
    // We haven't finished checking for the token yet
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken == null ? (
          // No token found, user isn't signed in
          <>
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                // When logging out, a pop animation feels intuitive
                // You can remove this if you want the default 'push' animation
                animationTypeForReplace: isSignout ? 'pop' : 'push',
                headerShown: false,
              }}
            />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{
              headerShown: false,
            }} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{
              headerShown: false,
            }} />
          </>
        ) : (
          // User is signed in
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}