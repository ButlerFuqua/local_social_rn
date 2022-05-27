import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import BulletinNavigator from './bulletin/BulletinNavigator';
import ProfileScreen from './user/ProfileScreen';
import SettingsScreen from './user/SettingsScreen';
import MembersScreen from './user/MembersScreen';

export default function HomeNavigator({ navigation }: any) {

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
