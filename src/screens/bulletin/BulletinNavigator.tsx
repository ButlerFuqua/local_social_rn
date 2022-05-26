import React from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PostFeedScreen from './PostFeedScreen';
import CreatePostScreen from './CreatePostScreen';

const Tab = createBottomTabNavigator();

const focusedColor = 'teal';

export default function BulletinNavigator() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 25,
        left: 20, 
        right: 20,
        borderRadius: 50,
        height: 50,
      }
    }}>
      <Tab.Screen name="Posts" component={PostFeedScreen} options={{
        headerShown: false,
        tabBarIcon: ({focused}: any) => {
          return (
            <View>
              <Text style={{
                color: focused ? focusedColor : '#333333'
              }}>All Posts</Text>
            </View>
          )
        }
      }} />
      <Tab.Screen name="Create" component={CreatePostScreen} options={{
        title: "Add Post",
        tabBarIcon: ({focused}: any) => {
          return (
            <View>
              <Text style={{
                color: focused ? focusedColor : '#333333',
              }}>Add Post</Text>
            </View>
          )
        }
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