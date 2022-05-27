import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ProfileResponse } from '../../services/userService';

type MemberCardProps = {
    member: ProfileResponse,
}

export default function MemberCard({ member }: MemberCardProps) {

    const [avatar, setAvatar] = useState(null);

    const getAvatar = async () => {
        // todo get and set profile pic
    }

    useEffect(() => {
        getAvatar();
        console.log('ran useEffect')
    },[member]);

    const { username } = member;

    return (
        <View style={styles.container}>
            <Text style={styles.username}>{username}</Text>
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
    username: {
        fontSize: 15,
        marginBottom: 5,
    },
})