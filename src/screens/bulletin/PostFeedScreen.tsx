import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export type Post = {
  author: string;
  body: string;
}

export default function PostFeedScreen(props: any) {
  const isFocused = useIsFocused();

  const [posts, setPosts]: any = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPosts = async () => {
    setIsLoading(true);
    // TODO replace with call to api
    await new Promise(resolve => setTimeout(() => resolve(''), 500))
    let buildingPosts: Post[] = [];
    for (let idx = 0; idx < 50; idx++) {
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
  }, [props, isFocused])

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <ScrollView style={{ flex: 1, padding: 15, }}>
      {posts.map((post: any) => (
        <View key={posts.indexOf(post)} style={{
          marginBottom: 15,
        }}>
          <Text>{post.author}</Text>
          <Text>{post.body}</Text>
        </View>
      ))}
      <View style={{ marginBottom: 100 }}></View>
    </ScrollView>
  );
}
