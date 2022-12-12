import {useEffect, useState} from "react";
import useGetUserList from "../Hook/useGetUserList";
import useGetTopic from "../Hook/useGetTopic";
import {FlatList, Pressable, SafeAreaView, ScrollView, Text, TextInput, View} from "react-native";
import useGetCurrentUserEmail from "../Hook/useGetUserEmail";


export default function UserList({navigation, route}) {
    const [userList, setUserList] = useState([]);
    const [topic, setTopic] = useState('')
    const [useGetCurrentUserEmail, setCurrentUserEmail] = useState('');
    


    useEffect(() => {

        useGetUserList().then(data => setUserList(data.users));

    })

    const handleSubmit = () => {
        const email = setCurrentUserEmail(route.params.jwt);
        // useGetTopic(email, item.email).then(data => {
        //     console.log(data)
        //     setTopic(data)
        // })
        navigation.navigate('Chat', {
            topic: topic
        })
    }


    return (
        <FlatList
            data={userList}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
                <Pressable onPress={handleSubmit}><Text>{item.email}</Text></Pressable>
        )}
        />
    )
}