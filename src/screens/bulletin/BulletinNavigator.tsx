import React from 'react';
import { Button, Pressable, Text, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PostFeedScreen from './PostFeedScreen';
import CreatePostScreen from './CreatePostScreen';

const Tab = createBottomTabNavigator();

export default function BulletinNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Posts" component={PostFeedScreen} options={{
        headerShown: false,
      }} />
      <Tab.Screen name="Create" component={CreatePostScreen} options={{
        title: "Create Post"
      }} />
    </Tab.Navigator>
  );
}


/**
 * 
 * Wanted to leave this as an example:
 <View style={{
    flex: 1,
  }}>
    <View style={{
      flex: 1,
      padding: 20,
    }}>
    <Text>BulletinScreen</Text>
    </View>
        <View style={{
          position: 'absolute',
          bottom: 20,
          width: '100%',
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        }}>
        <Pressable style={{
        //  height: 50,
          width: 100,
          borderRadius: 50,
          backgroundColor: 'white',
          elevation: 3,
          padding: 10

        }} onPress={() => console.log('pressed!')}>
        <Text>Add Post</Text>
      </Pressable>
        </View>
  </View>
 */