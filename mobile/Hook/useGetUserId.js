import {decode as atob, encode as btoa} from 'base-64'
export default function useGetCurrentUserId(jwt) {
    
    return JSON.parse(atob(jwt.split('.')[1])).id;
}