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



export const form = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 20,
    },
    wrapperInput: {
      borderWidth: 0.5,
      borderRadius: 5,
      borderColor: 'grey',
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      padding: 10,
      width: '100%',
    },
    wrapperIcon: {
      position: 'absolute',
      right: 0,
      padding: 10,
    },
    icon: {
      width: 30,
      height: 24,
    },
    button: {
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'orange',
      borderRadius: 5,
      marginTop: 25,
    },
    buttonDisable: {
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'grey',
      borderRadius: 5,
      marginTop: 25,
    },
    text: {
      color: 'white',
      fontWeight: '700',
    },
    textFailed: {
      alignSelf: 'flex-end',
      color: 'red',
    },
  });