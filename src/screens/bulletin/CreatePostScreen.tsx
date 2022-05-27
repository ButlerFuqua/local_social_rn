import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomTextArea from '../../components/CustomTextArea';
import { postService } from '../../services';

import { RootState } from '../../../store'
import { useSelector } from 'react-redux';
import { showAlert } from '../../utils/screenUtils';
import LoadingScreen from '../../components/LaodingScreen';

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
    const {error} = await postService.createPost(userToken, postBody);
    if(error){
      showAlert('Error creating post', error.message || 'Please Try again');
      setIsLoading(false);
      return;
    }
    props.navigation.replace('Home');
  }

  if (isLoading) {
    return <LoadingScreen />
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
