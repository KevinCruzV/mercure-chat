import {useContext, useEffect, useState} from "react";
import useGetUserList from "../Hook/useGetUserList";
import useGetTopic from "../Hook/useGetTopic";
import topicContext from "../Context/TopicContext";
import {FlatList, Pressable, SafeAreaView, ScrollView, Text, TextInput, View} from "react-native";
import text from "react-native-web/src/exports/Text";


export default function UserList({navigation}, jwt) {
    const [userList, setUserList] = useState([]);
    const [topic, setTopic] = useContext(topicContext);

    const getUserList = useGetUserList();
    const GetTopic = useGetTopic();

    const handleSubmit = (e) => {
        e.preventDefault();
        const userEmail = e.target[0].value;
        GetTopic(jwt.email, userEmail).then(data => {
            console.log(data)
            setTopic(data)
            navigation.navigate('Chat', {topic})
        })

    }


    useEffect(() => {
        getUserList().then(data => setUserList(data.users));
    })

    const _renderItem = ({ item }) =>
        <><TextInput value={item.id}/>
            <Pressable onPress={handleSubmit}><Text>Parler à : {item.email}</Text></Pressable></>


    return (
            <FlatList data={userList} renderItem={_renderItem} keyExtractor={item => item.id}/>
    )
}