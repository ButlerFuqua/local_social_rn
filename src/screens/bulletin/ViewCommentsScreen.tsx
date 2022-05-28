import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LoadingScreen from '../../components/LoadingScreen'

export default function ViewCommentsScreen() {

    const [isLoading, setIsLoading] = useState(true);

    const getPostAndComments = async () => {
        setIsLoading(true);

        // TODO get post and comments

        setIsLoading(false);
    }

    useEffect(() => {
        getPostAndComments();
    },[])

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