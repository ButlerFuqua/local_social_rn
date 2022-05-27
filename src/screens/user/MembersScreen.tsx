import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CustomButton from '../../components/CustomButton';
import LoadingScreen from '../../components/LaodingScreen';
import { userService } from '../../services';
import { ProfileResponse } from '../../services/userService';
import { showAlert } from '../../utils/screenUtils';
import MemberCard from './MemberCard';

export default function MembersScreen(props: any) {
    const isFocused = useIsFocused();

    const [members, setMembers]: any = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMoreMembers, setIsLoadingMoreMembers] = useState(false);

    const getMembers = async () => {
        setIsLoading(true);
        const { data, error } = await userService.getAllProfiles();
        if (error && !data) {
            showAlert('Error fetching profiles', error.message || 'Please try again');
        }
        setMembers(data as ProfileResponse[]);
        setIsLoading(false);
    }
    useEffect(() => {

        getMembers();

    }, [props, isFocused]);

    const loadMoreMembers = async () => {
        setIsLoadingMoreMembers(true);

        const { data, error } = await userService.getAllProfiles({
            from: members.length,
            to: members.length + 10
        });
        if (error) {
            showAlert('Error getting posts', error.message || 'Please try again');
            return
        }
        setMembers([...members, ...data]);

        setIsLoadingMoreMembers(false);
    }

    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <ScrollView style={styles.container}>
            {
                members.map((member: ProfileResponse, idx: number) => (
                    <MemberCard
                        key={idx}
                        member={member}
                    />
                ))
            }
            <CustomButton
                disabled={isLoadingMoreMembers}
                text={!isLoadingMoreMembers ? "Load More" : "Loading..."}
                action={loadMoreMembers}
            />
            <View style={{ marginBottom: 100 }}></View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    }
})