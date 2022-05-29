import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import CustomButton from '../../components/CustomButton';
import LoadingScreen from '../../components/LoadingScreen'
import { commentService, postService } from '../../services';
import { CommentResponse } from '../../services/commentService';
import { showAlert } from '../../utils/screenUtils';
import CommentCard from './CommentCard';

export default function ViewCommentsScreen({ route, navigation }: any) {
    const isFocused = useIsFocused();

    const { params: { post } } = route;

    const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments]: any = useState([]);

    const getPostAndComments = async () => {
        setIsLoading(true);

        const { data, error } = await commentService.getCommentsByPostId(post.id);
        if (!data || error) {
            showAlert('Error getting comments', error?.message || 'Please try again');
            return navigation.pop();
        }
        setComments(data as CommentResponse[])

        setIsLoading(false);
    }

    useEffect(() => {
        getPostAndComments();
    }, [isFocused]);

    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <View style={styles.container}>
            <Text style={styles.postBody}>{post.body}</Text>
            <View style={{ marginBottom: 10, marginTop: 10 }} ></View>
            <Text style={styles.commentsTitle}>
                Comments
            </Text>
            <ScrollView>
                {
                    !comments.length
                        ? (
                            <View style={styles.beTheFirst}>
                                <Text style={styles.beTheFirstText}>
                                    Be the first to comment!</Text>
                            </View>
                        )
                        : comments.map((comment: CommentResponse) => (
                            <CommentCard
                                comment={comment}
                                navigateToEdit={() => {
                                    navigation.navigate('EditComment', {
                                        commentId: comment.id,
                                        commentUserId: comment.user_id
                                    })
                                }}
                            />
                        ))
                }
                <View style={{ marginBottom: 50 }}></View>
            </ScrollView>
            <CustomButton
                text="Add Comment"
                action={() => {
                    navigation.navigate('CreateComment', {
                        post
                    })
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },
    postBody: {
        fontSize: 18,
        backgroundColor: '#fff',
        padding: 10,
    },
    commentsTitle: {
        fontSize: 18,
        marginBottom: 10,
    },
    beTheFirst: {
        marginTop: 5,
        backgroundColor: '#fff',
        padding: 5,
    },
    beTheFirstText: {
        textAlign: 'center',
        fontSize: 18,
    },
    commentList: {
        flex: 1,
    }
})