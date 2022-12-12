import React, {useEffect, useState} from 'react';
import useGetTopic from "../Hook/useGetTopic";
import {Pressable, SafeAreaView, ScrollView, Text, TextInput, View} from "react-native";
import useGetUserList from "../Hook/useGetUserList";
import Message from "./Message";
import useGetChat from "../Hook/useGetChat";
import {chat, msg} from "../assets/Styles/Styles";
import useBackendMsg from '../Hook/useBackendMsg';
import useGetCurrentUserId from '../Hook/useGetUserId';
import RNEventSource from 'react-native-event-source';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Chat({navigation, route}) {

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const topic = route.params.topic;

    const value = AsyncStorage.getItem('jwt'); 
    const userid = useGetCurrentUserId(value);

    //Envoyer un message
    const handleSubmit = (e) => {
        useGetChat(topic).then(data => {
            useBackendMsg(newMessage, userid, data.id);

        });
        

    }


    async function Conversation () {
        useGetChat(topic).then(data => {
            if (data.chatMsg !== null) {
                setMessages(data.chatMsg);
                console.log(data);
            } else {
                console.log('ce chat est vide');
            }

        });

    }


    useEffect(() => {
    

        

        const url = new URL('http://localhost:9090/.well-known/mercure');
        url.searchParams.append('topic', 'https://example.com/my-private-topic');

        const eventSource = new RNEventSource(url, {
            headers: {
                Authorization: 'Bearer ' + value,
            }
        })
        eventSource.addEventListener("open", (event) => {
            console.log("Open SSE connection.");
        });

        eventSource.addEventListener("message", (event) => {
        console.log("New message event:", event.data);
        let data = JSON.parse(event.data)
        setNewMessage(event.data)

        });
        
        eventSource.addEventListener("error", (event) => {
        if (event.type === "error") {
            console.error("Connection error:", event.message);
        } else if (event.type === "exception") {
            console.error("Error:", event.message, event.error);
        }
        });


        return () => {
            eventSource.addEventListener("close", (event) => {
                console.log("Close SSE connection.");
            });
        }


    }, [])


    return(
        <SafeAreaView>
            <ScrollView>
                <View style={msg.messagingscreen}>
                    <View style={[msg.messagingscreen, {paddingVertical: 15, paddingHorizontal: 10 }]}>
                    {messages.map((message) => {
                        if (currentUserId !== message.user.id) {
                            return <Message fromMe={false} content={message.content} username={message.user.username}/>
                        } else {
                            return <Message fromMe={true} content={message.content} username={message.user.username}/>
                        }
                    })}
                    </View>

                    <View style={msg.messaginginputContainer}>
                    <TextInput
                        style={msg.messaginginput}
                        value={newMessage}
                        onChangeText={(text) => setNewMessage(text)}
                    />
                    <Pressable style={msg.messagingbuttonContainer} onPress={handleSubmit}>
                        <View style={msg.textInput}>
                        <Text>Send</Text>
                        </View>
                    </Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    
    )
}