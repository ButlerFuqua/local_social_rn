import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { ProfileResponse } from '../../services/userService';

type MemberCardProps = {
    member: ProfileResponse,
    navigateToProfile: any
}

export default function MemberCard({ member, navigateToProfile }: MemberCardProps) {

    const [avatar, setAvatar] = useState(null);

    const getAvatar = async () => {
        // todo get and set profile pic
    }

    useEffect(() => {
        getAvatar();
    },[member]);

    const { username } = member;

    return (
        <View style={styles.container}>
            <Text style={styles.username}>{username}</Text>
            <CustomButton
                text="View"
                flat={true}
                fontSize={15}
                action={navigateToProfile}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    username: {
        fontSize: 15,
        marginBottom: 5,
    },
})