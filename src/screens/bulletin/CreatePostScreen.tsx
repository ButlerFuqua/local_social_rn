import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomTextArea from '../../components/CustomTextArea';
import { postService } from '../../services';

import { RootState } from '../../../store'
import { useSelector } from 'react-redux';

export default function CreatePostScreen(props: any) {
  const isFocused = useIsFocused();

  const userToken = useSelector((state: RootState) => state.user.userToken);


  const [postBody, setPostBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // TO clear the post when navigating away from the screen
    setPostBody('');
  }, [props, isFocused])

  const handleCreatePost = async () => {
    setIsLoading(true);
    if(!userToken){
      return props.navigation.replace('SignIn');
    }
    const response = await postService.createPost(userToken, postBody);
    console.log('response', response);
    setIsLoading(false);
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    )
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
