import * as React from 'react';
import { Button, Pressable, Text, View } from 'react-native';

export default function BulletinScreen() {
  return (
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
  );
}
