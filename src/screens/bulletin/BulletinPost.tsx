import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { userService } from '../../services';
import { PostResponse } from '../../services/postService';

type PostProps = {
    post: PostResponse,
}

export default function BulletinPost({ post }: PostProps) {

    const { user_id, body } = post;

    const [author, setAuthor] = useState(null);

    const getAuthor = async () => {
        const { data, error } = await userService.getUsername(user_id);
        if(data.username){
            setAuthor(data.username)
        }
    }

    useEffect(() => {
        getAuthor();
    },[post]);

    return (
        <View style={styles.container}>
            <Text style={styles.author}>{author || 'Who said dis???'}</Text>
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