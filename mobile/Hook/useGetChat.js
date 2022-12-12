export default function useGetChat() {
    return function (topic) {
        return fetch(`http://localhost:1234/chat/${topic}`, {
            method: 'GET',
            mode: 'cors',
        })
            .then(res => res.json())
    }
}