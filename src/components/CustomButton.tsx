import React from 'react';
import { Pressable, StyleSheet, Text, } from 'react-native';


export default function CustomButton({ action, color, backgroundColor, text, disabled }: any) {

    const buttonStyles = {
        ...styles.button,
    }

    if (color) {
        buttonStyles.color = color
    }

    if (backgroundColor) {
        buttonStyles.backgroundColor = backgroundColor
    }

    return (
        <Pressable onPress={action} disabled={disabled}>
            <Text style={{
                ...buttonStyles,
                backgroundColor: !disabled ? 'lightseagreen' : 'lightgrey',
                color: !disabled ? (color || '#fff') : 'grey',
                }}>{text}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 50,
        backgroundColor: 'lightseagreen',
        padding: 10,
        textAlign: 'center',
        color: '#fff',
        elevation: 5,
        fontSize: 18,
        marginBottom: 5,
    },
})