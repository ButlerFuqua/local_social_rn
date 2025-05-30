import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { postService, userService } from '../../services';
import { PostResponse } from '../../services/postService';

import { RootState } from '../../../store'
import { useSelector } from 'react-redux'

type PostProps = {
    post: PostResponse
    navigateToEdit: any
    navigateToViewComments: any
}

export default function BulletinPost({ post, navigateToEdit, navigateToViewComments }: PostProps) {

    const userId = useSelector((state: RootState) => state.user.userId);

    const { user_id, body } = post;

    const [author, setAuthor] = useState(null);
    const [commentCount, setCommentCount]: any = useState(null);

    const getAuthor = async () => {
        const { data, error } = await userService.getUsername(user_id);
        if (data.username) {
            setAuthor(data.username)
        }
    }

    const getCommentCount = async () => {
        const {data, error} = await postService.getCommentCount(post.id);
        if(data && !error){
            setCommentCount(data.length);
        }
    }

    useEffect(() => {
        getAuthor();
        getCommentCount();
    }, [post]);

    return (
        <View style={styles.container}>
            <Text style={styles.author}>{author || 'Who said dis???'}</Text>
            <Text style={styles.body}>
                {body}
            </Text>
            {post.edited ? (
                <Text style={styles.edited}>
                    (edited)
                </Text>
            ) : null}

            <View style={styles.meta}>
                <Pressable onPress={navigateToViewComments}>
                    <Text style={styles.commentButon}>Comments (
                        {commentCount !== null ? commentCount : '???'}
                    )</Text>
                </Pressable>
                {
                    user_id === userId
                        ? (
                            <Pressable onPress={navigateToEdit}>
                                <Text style={styles.editButton}>Edit</Text>
                            </Pressable>
                        ) : null
                }
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
        marginTop: 5,
        marginBottom: 5,
    },
    meta: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    editButton: {
        color: 'teal',
    },
    edited: {
        fontStyle: 'italic',
        fontSize: 13,
        marginTop: 3,
    },
    commentButon: {
        color: 'lightseagreen'
    }
})