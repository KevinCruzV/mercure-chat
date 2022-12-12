export default function useGetTopic() {
    return function (user1,user2) {
        return fetch(`http://localhost:1234/topic/${user1}/${user2}`, {
            method: 'GET',
        })
            .then(data => data.json())
    }
}