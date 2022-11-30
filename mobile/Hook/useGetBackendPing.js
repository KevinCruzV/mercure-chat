export default function useBackendPing() {
    return function (userId) {
        return fetch(`http://localhost:1234/chat/${userId}`, {
            method: 'POST',
        })
            .then(data => data.json())
            .then(data => data.message)
    }
}