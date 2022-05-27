import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CustomButton from '../../components/CustomButton';
import LoadingScreen from '../../components/LaodingScreen';
import { postService } from '../../services';
import { showAlert } from '../../utils/screenUtils';

import BulletinPost from './BulletinPost';

export type Post = {
  author: string;
  body: string;
}

export default function PostFeedScreen(props: any) {
  const isFocused = useIsFocused();

  const [posts, setPosts]: any = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMorePosts, setIsLoadingMorePosts] = useState(false);

  const getPosts = async () => {
    setIsLoading(true);
    const { data, error } = await postService.getAllPosts();
    if (error) {
      throw error;
    }
    setPosts(data);
    setIsLoading(false);
  }
  useEffect(() => {
    getPosts();
  }, [props, isFocused]);

  const loadMorePosts = async () => {
    setIsLoadingMorePosts(true);

    // TODO replace will call to posts api
    const { data, error } = await postService.getAllPosts({
      from: posts.length,
      to: posts.length + 10
    });
    if(error){
      showAlert('Error getting posts', error.message || 'Please try again');
      return
    }
    setPosts([...posts, ...data]);

    setIsLoadingMorePosts(false);
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <ScrollView style={{ flex: 1, padding: 15, }}>
      {posts.map((post: any) =>
        <BulletinPost key={posts.indexOf(post)} post={post} />
      )}
      {/* <Button disabled={isLoadingMorePosts} title={!isLoadingMorePosts ? "Load More Posts" : "Loading..."} onPress={loadMorePosts} /> */}


      <CustomButton
        disabled={isLoadingMorePosts}
        text={!isLoadingMorePosts ? "Load More Posts" : "Loading..."}
        action={loadMorePosts}
      />

      <View style={{ marginBottom: 100 }}></View>
    </ScrollView>
  );
}
