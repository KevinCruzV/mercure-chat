import {StyleSheet, Platform, StatusBar} from "react-native";

export const chat = StyleSheet.create({
    chatscreen: {
        backgroundColor: "#F7F7F7",
        flex: 1,
        padding: 10,
        position: "relative",
    },
    chatheading: {
        fontSize: 24,
        fontWeight: "bold",
        color: "green",
    },
    chattopContainer: {
        backgroundColor: "#F7F7F7",
        height: 70,
        width: "100%",
        padding: 20,
        justifyContent: "center",
        marginBottom: 15,
        elevation: 2,
    },
    chatheader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    chatlistContainer: {
        paddingHorizontal: 10,
    },
    chatemptyContainer: {
        width: "100%",
        height: "80%",
        alignItems: "center",
        justifyContent: "center",
    },
    chatemptyText: { fontWeight: "bold", fontSize: 24, paddingBottom: 30 },
    messagingscreen: {
        flex: 1,
    },
})

export const msg = StyleSheet.create({
    messagingscreen: {
        flex: 1,
    },
    messaginginputContainer: {
        width: "100%",
        minHeight: 100,
        backgroundColor: "white",
        paddingVertical: 30,
        paddingHorizontal: 15,
        justifyContent: "center",
        flexDirection: "row",
    },
    messaginginput: {
        borderWidth: 1,
        padding: 15,
        flex: 1,
        marginRight: 10,
        borderRadius: 20,
    },
    messagingbuttonContainer: {
        width: "30%",
        backgroundColor: "green",
        borderRadius: 3,
        alignItems: "center",
        justifyContent: "center",
    },

    textInput: {
        color: "#f2f0f1",
        fontSize: 20,
    },
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
        color: 'black',
        fontWeight: '700',
    },
    textFailed: {
        alignSelf: 'flex-end',
        color: 'red',
    },
})