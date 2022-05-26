import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import BulletinNavigator from './bulletin/BulletinNavigator';
import ProfileScreen from './user/ProfileScreen';
import SettingsScreen from './user/SettingsScreen';

export default function HomeNavigator({ navigation }: any) {

  const Drawer = createDrawerNavigator();

  return (
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Bulletin" component={BulletinNavigator} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
  );
}
