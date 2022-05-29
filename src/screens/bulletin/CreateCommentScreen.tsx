import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomTextArea from '../../components/CustomTextArea';
import { commentService } from '../../services';

import { RootState } from '../../../store'
import { useSelector } from 'react-redux';
import { showAlert } from '../../utils/screenUtils';
import LoadingScreen from '../../components/LoadingScreen';

export default function CreateCommentScreen({ route, navigation }: any) {
  const isFocused = useIsFocused();

  const userToken = useSelector((state: RootState) => state.user.userToken);

  const { params: { post } } = route;

  const [commentBody, setCommentBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // TO clear the comment when navigating away from the screen
    setCommentBody('');
  }, [isFocused])

  const handleCreateComment = async () => {
    setIsLoading(true);
    if(!userToken){
      return navigation.replace('SignIn');
    }
    const {error} = await commentService.createComment(userToken, post.id, commentBody);
    if(error){
      showAlert('Error creating comment', error.message || 'Please Try again');
      setIsLoading(false);
      return;
    }
    navigation.pop();
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add Comment</Text>
      <View style={{ marginBottom: 20 }}></View>
      <CustomTextArea
        customStyles={styles.textArea}
        value={commentBody}
        onChangeText={setCommentBody}
      />

      <View style={{ marginBottom: 20 }}></View>

      <CustomButton
        text="Submit"
        action={handleCreateComment}
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
