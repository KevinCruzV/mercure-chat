import React, {useEffect, useState} from 'react';
import useGetTopic from "../Hook/useGetTopic";
import {Pressable, SafeAreaView, ScrollView, Text, TextInput, View} from "react-native";
import useGetUserList from "../Hook/useGetUserList";
import Message from "./Message";
import useGetConversation from "../Hook/useGetMessage";
import {chat, msg} from "../assets/Styles/Styles";
export default function Chat({navigation, route}) {

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    

    //Envoyer un message
    const handleSubmit = (e) => {
        e.preventDefault();

    }


    async function Conversation () {
        useGetConversation(topic).then(data => {
            if (data.chatMsg !== null) {
                setMessages(data.chat.messages);
                console.log(data);
            } else {
                console.log('ce chat est vide');
            }

        });

    }
    


    useEffect(() => {
    

        Conversation();

        const url = new URL('http://localhost:9090/.well-known/mercure');
        url.searchParams.append('topic', 'https://example.com/my-private-topic');

        const eventSource = new EventSource(url, {withCredentials: true});
        eventSource.onmessage = handleMessage;

        return () => {
            eventSource.close()
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