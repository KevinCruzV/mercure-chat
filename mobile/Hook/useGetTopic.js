export default function useGetTopic() {
    return function (topicName) {
        return fetch(`http://localhost:1234/chat/${topicName}`, {
            method: 'POST',
        })
            .then(data => data.json())
            .then(data => data.message)
    }
}