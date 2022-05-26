import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomTextArea from '../../components/CustomTextArea';

export default function CreatePostScreen(props: any) {
  const isFocused = useIsFocused();

  const [postBody, setPostBody] = useState('');

  useEffect(() => {
    // TO clear the post when navigating away from the screen
    setPostBody('');
  }, [props, isFocused])

  const handleCreatePost = async () => {
    console.log(postBody)
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create post</Text>
      <View style={{ marginBottom: 20 }}></View>
      <CustomTextArea
        customStyles={styles.textArea}
        value={postBody}
        onChangeText={setPostBody}
      />

      <View style={{ marginBottom: 20 }}></View>

      <CustomButton
        text="Submit"
        action={handleCreatePost}
      />
      <View style={{ marginBottom: 100 }}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center',
  },
  textArea: {
    width: '95%',
    alignSelf: 'center',
  }
});
