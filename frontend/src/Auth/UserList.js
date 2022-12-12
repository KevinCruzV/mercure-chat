import {useEffect, useState} from "react";
import useGetUserList from "../Hook/useGetUserList";
import useBackendPing from "../Hook/useGetBackendPing";

export default function UserList() {
    const [userList, setUserList] = useState([]);

    const getUserList = useGetUserList();
    const backendPing = useBackendPing();

    const handleSubmit = (e) => {
        e.preventDefault();
        const userId = e.target[0].value;
        backendPing(userId).then(data => console.log(data))
    }

    const handleMessage = (e) => {
        document.querySelector('h1').insertAdjacentHTML('afterend', '<div class="alert alert-success w-75 mx-auto">Ping !</div>');
        window.setTimeout(() => {
            const $alert = document.querySelector('.alert');
            $alert.parentNode.removeChild($alert);
        }, 2000);
        console.log(JSON.parse(e.data));
    }

    useEffect(() => {
        getUserList().then(data => setUserList(data.users));

    }, [])
    
    return (
        <div>
            <h1 className='m-5 text-center'> user list</h1>
            {userList.map((user,index) => (
               
                <form className='w-75 mx-auto mb-3' onSubmit={handleSubmit} key={index}>
                    <p>{user.email}</p>
                    <button className='btn btn-dark w-100' type='submit' value={user.id}>{user.email}</button>
                </form>

            ))}
        </div>
    )
}