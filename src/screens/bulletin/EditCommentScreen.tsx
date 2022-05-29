import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomTextArea from '../../components/CustomTextArea';
import { commentService, } from '../../services';

import { RootState } from '../../../store'
import { useSelector } from 'react-redux';
import { showAlert } from '../../utils/screenUtils';
import LoadingScreen from '../../components/LoadingScreen';

type EditCommentScreenProps = {
  route: {
    params: {
      commentId: string
      commentUserId: string
    }
  },
  navigation: any,
}

export default function EditCommentScreen({ route, navigation, }: EditCommentScreenProps) {
  const isFocused = useIsFocused();

  const userToken = useSelector((state: RootState) => state.user.userToken);

  const { params: { commentId, commentUserId } } = route;

  const [isLoading, setIsLoading] = useState(true);
  const [commentBody, setCommentBody] = useState('');
  const [areYouSureDelete, setAreYouSureDelete] = useState(false);

  const getComment = async () => {
    setIsLoading(true);

    if(!userToken){
      return navigation.replace('Home');
    }

    const { data, error } = await commentService.getCommentById(commentId);
    if(!data || error){
      showAlert('Error fetching post', error?.message || 'Please try again');
      return navigation.navigate('Home');
    }

    const { body, created_at } = data;
    setCommentBody(body);

    setIsLoading(false);
  }

  useEffect(() => {
    getComment();
  }, [isFocused]);

  if (isLoading) {
    return <LoadingScreen />
  }

  const handleUpdateComment = async () => {
    setIsLoading(true);
    if(!userToken){
      return navigation.replace('SignIn');
    }
    const {error} = await commentService.updateComment(userToken, commentId, commentBody);
    if(error){
      showAlert('Error updating post', error.message || 'Please Try again');
      setIsLoading(false);
      return;
    }
    navigation.replace('Home');
  }

  const handleDeleteComment = async () => {
    setIsLoading(true);
    if(!userToken){
      return navigation.replace('SignIn');
    }
    const error = await commentService.deleteComment(commentId);
    if(error){
      showAlert('Error deleting comment', error?.message || 'Please Try again');
      setIsLoading(false);
      return;
    }
    navigation.replace('Home');
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Comment</Text>
      <View style={{ marginBottom: 20 }}></View>
      <CustomTextArea
        customStyles={styles.textArea}
        value={commentBody}
        onChangeText={setCommentBody}
      />

      <View style={{ marginBottom: 20 }}></View>

      <CustomButton
        text="Submit"
        action={handleUpdateComment}
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
              action={handleDeleteComment}
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
