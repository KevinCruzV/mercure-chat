
export default function useGetJWT() {

    return function (username, password) {
        const credentials = btoa(`${username}:${password}`);

        return fetch('http://localhost:1234/login', {
            method: 'GET',
            credentials: "include",
            mode: "cors",
            headers: {
                'Authorization': `Basic ${credentials}`
            }
        })
            .then(data => data.json())
    }
}