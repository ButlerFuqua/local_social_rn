import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomTextArea from '../../components/CustomTextArea';
import { postService } from '../../services';

import { RootState } from '../../../store'
import { useSelector } from 'react-redux';
import { showAlert } from '../../utils/screenUtils';
import LoadingScreen from '../../components/LoadingScreen';

type EditPostScreenProps = {
  route: {
    params: {
      postId: string | number
      postUserId: string
    }
  },
  navigation: any,
}

export default function EditPostScreen({ route, navigation, }: EditPostScreenProps) {
  const isFocused = useIsFocused();

  const userToken = useSelector((state: RootState) => state.user.userToken);

  const { params: { postId, postUserId } } = route;

  const [isLoading, setIsLoading] = useState(true);
  const [postBody, setPostBody] = useState('');
  const [areYouSureDelete, setAreYouSureDelete] = useState(false);

  const getPost = async () => {
    setIsLoading(true);

    if(!userToken){
      return navigation.replace('Home');
    }

    const { data, error } = await postService.getPostById(postId);
    if(!data || error){
      showAlert('Error fetching post', error?.message || 'Please try again');
      return navigation.navigate('Home');
    }

    const { body, created_at } = data;
    setPostBody(body);

    setIsLoading(false);
  }

  useEffect(() => {
    getPost();
  }, [isFocused]);

  if (isLoading) {
    return <LoadingScreen />
  }

  const handleUpdatePost = async () => {
    setIsLoading(true);
    if(!userToken){
      return navigation.replace('SignIn');
    }
    const {error} = await postService.updatePost(userToken, postId, postBody);
    if(error){
      showAlert('Error updating post', error.message || 'Please Try again');
      setIsLoading(false);
      return;
    }
    navigation.replace('Home');
  }

  const handleDeletePost = async () => {
    setIsLoading(true);
    if(!userToken){
      return navigation.replace('SignIn');
    }
    const error = await postService.deletePost(postId);
    if(error){
      showAlert('Error deleting post', error?.message || 'Please Try again');
      setIsLoading(false);
      return;
    }
    navigation.replace('Home');
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit post</Text>
      <View style={{ marginBottom: 20 }}></View>
      <CustomTextArea
        customStyles={styles.textArea}
        value={postBody}
        onChangeText={setPostBody}
      />

      <View style={{ marginBottom: 20 }}></View>

      <CustomButton
        text="Submit"
        action={handleUpdatePost}
      />
      <View style={{ marginBottom: 100 }}></View>
    </ScrollView>
    {
      !areYouSureDelete
      ? (
        <CustomButton
          text="Delete"
          action={() => setAreYouSureDelete(true)}
          backgroundColor="coral"
        />
        
        )
        : (
          <View style={styles.deleteContainer}>
            <Text style={styles.areYouSure}>
              Are you sure?
            </Text>
            <CustomButton
              text="Delete forever"
              action={handleDeletePost}
              backgroundColor="tomato"
            />
          <CustomButton
            text="Cancel"
            action={() => setAreYouSureDelete(false)}
          />

        </View>
      )
    }
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper:{
    flex: 1,
  },
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
  },
  deleteContainer: {
    padding: 30
  },
  areYouSure: {
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 18,
    color: 'red'
  }
});
