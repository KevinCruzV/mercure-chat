import React, {useEffect, useState} from 'react';
import useGetTopic from "../Hook/useGetTopic";
import {SafeAreaView, ScrollView} from "react-native";
import useGetUserList from "../Hook/useGetUserList";
export default function Chat() {
    const [message, setMessage] = useState([]);

    const getTopic = useGetTopic();
    // const backendPing = useBackendPing();
    const getUserList = useGetUserList();

    //Envoyer un message
    const handleSubmit = (e) => {
        e.preventDefault();
        const userId = e.target[0].value;
        //backendPing(userId).then(data => console.log(data))
    }

    // recevoir un message
    const handleMessage = (e) => {
        document.querySelector('h1').insertAdjacentHTML('afterend', '<div class="alert alert-success w-75 mx-auto">Ping !</div>');
        window.setTimeout(() => {
            const $alert = document.querySelector('.alert');
            $alert.parentNode.removeChild($alert);
        }, 2000);
        console.log(JSON.parse(e.data));
    }

    useEffect(() => {
        getUserList().then(data => setMessage(data.users));

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
        
        <Text style="">Chat</Text>
        {message.map((message,index) => (
            <>
            <View key={index}>
            <Text>{message.email}</Text>
            <Text>{message.id} : {message.content}</Text>
            </View>
            </>
        ))}

        </ScrollView>
    </SafeAreaView>
    
    )
}