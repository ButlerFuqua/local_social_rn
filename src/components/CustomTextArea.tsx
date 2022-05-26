import React from 'react';
import { StyleSheet, TextInput, } from 'react-native';


export default function CustomTextArea({ value, onChangeText, placeholder , secureTextEntry, customStyles}: any) {

    return (
        <TextInput
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            style={{...styles.input, ...customStyles}}
            secureTextEntry={secureTextEntry}
            multiline={true}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#fefefe',
        borderRadius: 5,
        marginBottom: 5,
        elevation: 5,
        padding: 10
    },
})