import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { userService } from '../../services';

import { RootState } from '../../../store'
import { useSelector } from 'react-redux'
import { CommentResponse } from '../../services/commentService';
import { useIsFocused } from '@react-navigation/native';

type PostProps = {
    comment: CommentResponse
    navigateToEdit: any
}

export default function CommentCard({ comment, navigateToEdit, }: PostProps) {

    const isFocused = useIsFocused();

    const userId = useSelector((state: RootState) => state.user.userId);

    const { user_id, body, created_at } = comment;

    const [author, setAuthor] = useState(null);

    const getAuthor = async () => {
        const { data, error } = await userService.getUsername(user_id);
        if (data.username) {
            setAuthor(data.username)
        }
    }

    useEffect(() => {
        getAuthor();
    }, [isFocused]);

    return (
        <View style={styles.container}>
            <Text style={styles.author}>{author || 'Who said dis???'}</Text>
            <Text style={styles.body}>
                {body}
            </Text>
            {comment.edited ? (
                <Text style={styles.edited}>
                    (edited)
                </Text>
            ) : null}

            <View style={styles.meta}>
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