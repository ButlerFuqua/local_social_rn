import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import CustomButton from '../../components/CustomButton';
import LoadingScreen from '../../components/LoadingScreen';
import { clearUserData } from '../../features/user/userSlice';
import { userService } from '../../services';
import { showAlert } from '../../utils/screenUtils';

export default function DeleteAccountScreen({ navigation }: any) {

    const userToken = useSelector((state: RootState) => state.user.userToken);
    const dispatch = useDispatch();
    if (!userToken) {
        return navigation.replace('SignIn');
    }


    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        const { error } = await userService.disableProfile(userToken);
        setIsLoading(true);
        if (error) {
            navigation.pop();
            return showAlert('Error disabling profile', error.message || 'Sorry, there was an error.');
        }

        showAlert(
            'Profile disabled',
            'Your profile is hidden from other users, and your account will soon be permanently deleted unless you log back in an re-enable it'
        );

        dispatch(clearUserData());

        navigation.replace('SignIn');

    }

    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Are you sure?
            </Text>
            <Text style={styles.body}>
                You will lose all your data and this cannot be undone.
            </Text>
            <CustomButton
                text="Yes, delete my account forever"
                backgroundColor="tomato"
                action={handleDelete}
            />
            <CustomButton
                text="Cancel"
                action={() => {
                    navigation.pop()
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: 15,
    },
    title: {
        fontSize: 20,
        marginBottom: 10,
        color: '#000000',
        textAlign: 'center',
    },
    body: {
        fontSize: 18,
        marginBottom: 20,
    },
})