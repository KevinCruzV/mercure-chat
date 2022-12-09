import {useContext, useEffect, useState} from "react";
import useGetUserList from "../Hook/useGetUserList";
import useGetTopic from "../Hook/useGetTopic";
import topicContext from "../Context/TopicContext";
import {form} from "../assets/Styles/Styles";
import {SafeAreaView, ScrollView, View} from "react-native";

export default function UserList({navigation}, loggedUser) {
    const [userList, setUserList] = useState([]);
    const [topic, setTopic] = useContext(topicContext);

    const getUserList = useGetUserList();
    const GetTopic = useGetTopic();

    const handleSubmit = (e) => {
        e.preventDefault();
        const userEmail = e.target[0].value;
        GetTopic(loggedUser.email, userEmail).then(data => {
            console.log(data)
            setTopic(data)
            navigation.navigate('Chat')
        })

    }



    useEffect(() => {
        getUserList().then(data => setUserList(data.users));

        const url = new URL('http://localhost:9090/.well-known/mercure');
        url.searchParams.append('topic', 'https://example.com/my-private-topic');

        const eventSource = new EventSource(url, {withCredentials: true});
        eventSource.onmessage = handleMessage;

        return () => {
            eventSource.close()
        }

    }, [])
    return (
        <SafeAreaView>
            <ScrollView>

            {userList.map((user,index) => (
                <View style={form.container}>
                <form className='w-75 mx-auto mb-3' onSubmit={handleSubmit} key={index}>
                    <p>{user.email}</p>
                    <button className='btn btn-dark w-100' type='submit' value={user.email}>{user.email}</button>
                </form>
                </View>
            ))}

        </ScrollView>
        </SafeAreaView>
    );
}