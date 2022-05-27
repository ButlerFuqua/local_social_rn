import React from 'react';
import { Pressable, StyleSheet, Text, } from 'react-native';


export default function CustomButton({
    action,
    color,
    backgroundColor,
    text,
    disabled,
    flat,
    fontSize,
}: any) {

    const buttonStyles = {
        ...styles.button,
    }

    if (color) {
        buttonStyles.color = color
    }

    if (backgroundColor) {
        buttonStyles.backgroundColor = backgroundColor
    }

    if(flat) {
        buttonStyles.backgroundColor = 'rgba(255,255,255,0)'
        buttonStyles.elevation = 0;
        buttonStyles.color = color || 'teal';
    }

    if(fontSize){
        buttonStyles.fontSize = fontSize;
    }

    if(disabled){
        buttonStyles.backgroundColor = !disabled ? buttonStyles.backgroundColor : 'lightgrey'
        buttonStyles.color = !disabled ? (color || '#fff') : 'grey'
    }

    return (
        <Pressable onPress={action} disabled={disabled}>
            <Text style={{
                ...buttonStyles,
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