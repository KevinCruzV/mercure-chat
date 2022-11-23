export default function useGetUserList() {
    return function () {
        return fetch('http://localhost:1234/user-list', {
            method: 'GET',
            mode: "cors"
        })
            .then(data => data.json())
    }
}