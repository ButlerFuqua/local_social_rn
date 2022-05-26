import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import BulletinScreen from './bulletin/BulletinScreen';
import ProfileScreen from './user/ProfileScreen';
import SettingsScreen from './user/SettingsScreen';

export default function HomeScreen({ navigation }: any) {

  const Drawer = createDrawerNavigator();

  return (
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Bulletin" component={BulletinScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
  );
}
