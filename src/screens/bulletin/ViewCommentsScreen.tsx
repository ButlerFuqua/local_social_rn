import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LoadingScreen from '../../components/LoadingScreen'
import { commentService, postService } from '../../services';

export default function ViewCommentsScreen({route}: any) {
    const isFocused = useIsFocused();

    const { params: { postId } } = route;

    const [isLoading, setIsLoading] = useState(true);

    const getPostAndComments = async () => {
        setIsLoading(true);

        const getPostAndComments = await commentService.getPostAndComments(postId); 

        setIsLoading(false);
    }

    useEffect(() => {
        getPostAndComments();
    },[isFocused]);

    if(isLoading){
        return <LoadingScreen />
    }

    return (
        <View style={styles.container}>
            <Text>View Post and Comments</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})