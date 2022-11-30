import { StyleSheet, Platform, StatusBar, TextInput } from 'react-native';

export const Styles = StyleSheet.create({
    imageSize: {
        height: 150,
        width: 'auto',
        resizeMode: 'contain',
    },
    textInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    globalBg: {
        backgroundColor: 'green'
    }
})