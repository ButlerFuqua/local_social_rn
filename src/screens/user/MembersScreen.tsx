import React, { useState } from 'react';
import { Text, View } from 'react-native';

export default function MembersScreen({ navigation }: any) {

    const [members, setMembers] = useState([]);

    // TODO  - fetch profiles, render with MemberCards,

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>MembersScreen</Text>

        </View>
    );
}
