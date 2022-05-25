import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import BulletinScreen from './BulletinScreen';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';

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
