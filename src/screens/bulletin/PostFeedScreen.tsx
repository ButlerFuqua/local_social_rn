import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

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
    // TODO replace with call to api
    await new Promise(resolve => setTimeout(() => resolve(''), 500))
    let buildingPosts: Post[] = [];
    for (let idx = 0; idx < 10; idx++) {
      buildingPosts.push({
        author: `User Name ${idx + 1}`,
        body: `This is post ${idx + 1}. I really like this app and the posts on this app, ya'll.`,
      });
    }
    setPosts(buildingPosts);
    setIsLoading(false);
  }
  useEffect(() => {
    getPosts();
  }, [props, isFocused]);
  
  const loadMorePosts = async () => {
    setIsLoadingMorePosts(true);
    
    // TODO replace will call to posts api
    await new Promise(resolve => setTimeout(() => resolve(''), 500));
    const morePosts: Post[] = [...posts];
    for (let idx = posts.length; idx < posts.length + 10; idx++) {
      morePosts.push({
        author: `User Name ${idx + 1}`,
        body: `This is post ${idx + 1}. I really like this app and the posts on this app, ya'll.`,
      });
    }
   if(morePosts.length < 31){ // todo simulating only 30 posts
    setPosts(morePosts);
   }

    setIsLoadingMorePosts(false);
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <ScrollView style={{ flex: 1, padding: 15, }}>
      {posts.map((post: any) => <BulletinPost key={posts.indexOf(post)} post={post} />)}
      <Button disabled={isLoadingMorePosts} title={!isLoadingMorePosts ? "Load More Posts" : "Loading..."} onPress={loadMorePosts} />
      <View style={{ marginBottom: 100 }}></View>
    </ScrollView>
  );
}
