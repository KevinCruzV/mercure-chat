import React from 'react';
import UserList from '../Auth/UserList';
import useGetJWT from "../Hook/useGetJWT";
function Home() {
    console.log(useGetJWT);
    return (
        <>
        <UserList />
        </>

    );
}

export default Home;