import storeData from "../Storage/storeData";
import {btoa} from 'react-native-quick-base64';

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
            .then(data => storeData(data))
            .then(data => data.json())
            
    }
}