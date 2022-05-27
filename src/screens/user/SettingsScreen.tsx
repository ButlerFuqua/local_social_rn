import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { clearUserData } from '../../features/user/userSlice'
import { useDispatch } from 'react-redux';

export default function SettingsScreen({ navigation }: any) {

  const dispatch = useDispatch();

  const handleSignOut = async () => {
    dispatch(clearUserData());
    navigation.replace('SignIn');
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={[
          { 
            label: 'Sign out',
            action: handleSignOut
           },
        ]}
        renderItem={({ item }) => (
          <Pressable onPress={item.action}>
            <Text style={styles.item}>
            {item.label}
          </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 2
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
})
