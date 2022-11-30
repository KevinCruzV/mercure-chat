import {Pressable, View, Text, TextInput} from "react-native";
// import {useLocation, useNavigate, navigate} from "react-router-dom";
import {SetStateAction, useContext, useState} from "react";
import {userContext} from "../Context/UserContext.js";
import useGetJWT from "../Hook/useGetJWT";
import { Global } from '../assets/Styles/Styles';
import Styles

export default function Login(){

    // const navigate = useNavigate();
    // let location = useLocation();
    // let from = location.state?.from?.pathname || '/';

    const getJWT = useGetJWT()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useContext(userContext);
    const [error, setError] = useState(null);

    const isValidEmail = (email: SetStateAction<string>) => {
        return /\S+@\S+\.\S+/.test(email.toString());
    }

    const handleEmail = (e: { target: { value: SetStateAction<string>; }; }) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e: { target: { value: SetStateAction<string>; }; }) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e: {target: any; preventDefault: () => void;}) => {
        e.preventDefault();
        if (!isValidEmail(e.target.value)) {
            setError('Email is invalid');
        } else {
            setError(null);
            getJWT(username, password).then(data => {
                if (data.JWT) {
                    setUser(data.JWT);
                    // navigate(from, {replace: true});
                } else {
                    console.log(data)
                }
            })
        }
    }

    return(
        <View>
            {/* <form  style={{maxWidth: '500px'}} onSubmit={handleSubmit}> */}
            <TextInput onChange={handleEmail} value={username} style={Styles.globalBg}/>
            <TextInput onChange={handlePassword} value={password} secureTextEntry={true} style={Styles.Global.textImput}/>
            <Pressable onPress={handleSubmit}>
                <Text>Submit</Text>
            </Pressable>
        </View>
    );

}
