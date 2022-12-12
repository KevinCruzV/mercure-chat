import {decode as atob, encode as btoa} from 'base-64'
import deviceStorage from "../Service/deviceStorage";

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
            
            .then(data => {
                if (data.JWT) {
                    deviceStorage('jwt', data.JWT)
                } else {
                    console.log(data)
                }
            })
    }
}