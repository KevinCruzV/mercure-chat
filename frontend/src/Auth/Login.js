import {useLocation, useNavigate, navigate} from "react-router-dom";
import {useContext, useState} from "react";
import {userContext} from "../Context/UserContext.js";
import useGetJWT from "../Hook/useGetJWT";

export default function Login() {
    const navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || '/';

    const getJWT = useGetJWT()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useContext(userContext);
    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getJWT(username, password).then(data => {
            if (data.JWT) {
                setUser(data.JWT);
                navigate(from, {replace: true});
                localStorage.setItem("token", data.JWT)
            } else {
                console.log(data)
            }
        })
    }

    return (
        <form  style={{maxWidth: '500px'}} onSubmit={handleSubmit}>
            <h1>Please LogIn</h1>
            <div >
                <label htmlFor="username" >Username</label>
                <input type="text" className="form-control" id="username" onChange={handleUsername} value={username}/>
            </div>
            <div>
                <label htmlFor="password" >Password</label>
                <input type="password" id="password" onChange={handlePassword}
                       value={password}/>
            </div>
            <button type="submit" >Submit</button>
        </form>
    )
}