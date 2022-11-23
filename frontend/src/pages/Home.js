import React from 'react';
import UserList from '../Auth/UserList';
import useGetJWT from "../Hook/useGetJWT";
function Home() {
    console.log(useGetJWT);
    return (
        <>
        <h1>home</h1>
        <UserList />
        </>

    );
}

export default Home;