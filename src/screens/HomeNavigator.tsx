import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import BulletinNavigator from './bulletin/BulletinNavigator';
import ProfileScreen from './user/ProfileScreen';
import SettingsScreen from './user/SettingsScreen';
import MembersScreen from './user/MembersScreen';

export default function HomeNavigator({ navigation }: any) {

  const userId = useSelector((state: RootState) => state.user.userId);

  const Drawer = createDrawerNavigator();

  return (
      <Drawer.Navigator initialRouteName="Bulletin">
        <Drawer.Screen name="Bulletin" component={BulletinNavigator} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Members" component={MembersScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
  );
}
