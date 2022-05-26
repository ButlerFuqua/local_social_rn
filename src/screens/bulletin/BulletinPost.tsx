import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Post } from './PostFeedScreen'

type PostProps = {
    post: Post,
}

export default function BulletinPost({ post }: PostProps) {

    const { author, body } = post;

    return (
        <View style={styles.container}>
            <Text style={styles.author}>{author}</Text>
            <Text style={styles.body}>{body}</Text>
            <View style={styles.meta}>
                <Text>Comments (0)</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    author: {
        fontSize: 15,
        marginBottom: 5,
    },
    body: {
        color: '#000000',
        fontSize: 16,
    },
    meta:{
        marginTop: 5
    }
})