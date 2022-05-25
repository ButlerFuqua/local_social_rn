import * as React from 'react';
import { Button, Text, View } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { RootState } from '../../store'
import { useSelector, useDispatch } from 'react-redux'
import { setToken, } from '../features/user/userSlice'


import BulletinScreen from './BulletinScreen';
import ProfileScreen from './ProfileScreen';

export default function HomeScreen({ navigation }: any) {

  const handleSignOut = async () => {
    // clear all user data
    setToken(null);
    // navigate to signIn screen
    navigation.replace('SignIn');
  }

  const Drawer = createDrawerNavigator();

  return (
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Bulletin" component={BulletinScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
      </Drawer.Navigator>
  );
  // return (
  //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //     <Text>HomeScreen</Text>
  //     <Button title='Sign Out' onPress={handleSignOut} />
  //   </View>
  // );
}
