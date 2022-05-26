import React from 'react';
import { StyleSheet, TextInput, } from 'react-native';


export default function CustomTextInput({ value, onChangeText, placeholder , secureTextEntry}: any) {

    return (
        <TextInput
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            style={styles.input}
            secureTextEntry={secureTextEntry}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#fefefe',
        borderRadius: 50,
        marginBottom: 5,
        elevation: 5,
        padding: 10
    },
})