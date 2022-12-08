import {Pressable, View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView} from "react-native";
// import {useLocation, useNavigate, navigate} from "react-router-dom";
import React, {SetStateAction, useContext, useState} from "react";
import {userContext} from "../Context/UserContext";
import useGetJWT from "../Hook/useGetJWT";
import { form, Styles } from '../assets/Styles/Styles';



export default function Login(needsLogin, setNeedsLogin, setEmail, setPassword){
  const [needsLogin, setNeedsLogin] = useState(true);
    // const navigate = useNavigate();
    // let location = useLocation();
    // let from = location.state?.from?.pathname || '/';
    const getJWT = useGetJWT()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [seePassword, setSeePassword] = useState(true);
    const [checkValidEmail, setCheckValidEmail] = useState(false);
    const [user, setUser] = useContext(userContext);
    

    const handleCheckEmail = (text) => {
        let re = /\S+@\S+\.\S+/;
        let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    
        setEmail(text);
        if (re.test(text) || regex.test(text)) {
          setCheckValidEmail(false);
        } else {
          setCheckValidEmail(true);
        }
    };

    const checkPasswordValidity = (value) => {
        const isNonWhiteSpace = /^\S*$/;
        if (!isNonWhiteSpace.test(value)) {
          return 'Password must not contain Whitespaces.';
        }
    
        const isContainsUppercase = /^(?=.*[A-Z]).*$/;
        if (!isContainsUppercase.test(value)) {
          return 'Password must have at least one Uppercase Character.';
        }
    
        const isContainsLowercase = /^(?=.*[a-z]).*$/;
        if (!isContainsLowercase.test(value)) {
          return 'Password must have at least one Lowercase Character.';
        }
    
        const isContainsNumber = /^(?=.*[0-9]).*$/;
        if (!isContainsNumber.test(value)) {
          return 'Password must contain at least one Digit.';
        }
    
        const isValidLength = /^.{8,16}$/;
        if (!isValidLength.test(value)) {
          return 'Password must be 8-16 Characters Long.';
        }

        return null;
    };


    const handleSubmit = () => {
        const checkPassowrd = checkPasswordValidity(password);
        if (!checkPassowrd) {
          getJWT(email, password).then(data => {
              if (data.JWT) {
                  setUser(data.JWT);
                  navigation.navigate('UserList')
                  console.log("coucou");
              } else {
                  console.log(data)
              }
          })
          setNeedsLogin(!needsLogin);
        }
        else {
            alert(checkPassowrd);
        }
    }

    return(
        <SafeAreaView>
        <ScrollView>
        <View style={form.container}>
        <View style={form.wrapperInput}>
          <TextInput
            style={form.input}
            placeholder="Email"
            value={email}
            onChangeText={text => handleCheckEmail(text)}
          />
        </View>
        {checkValidEmail ? (
          <Text style={form.textFailed}>Wrong format email</Text>
        ) : (
          <Text style={form.textFailed}> </Text>
        )}
        <View style={form.wrapperInput}>
          <TextInput
            style={form.input}
            placeholder="Password"
            value={password}
            secureTextEntry={seePassword}
            onChangeText={text => setPassword(text)}
          />
          <TouchableOpacity
            style={form.wrapperIcon}
            onPress={() => setSeePassword(!seePassword)}>
          </TouchableOpacity>
        </View>
        {email == '' || password == '' || checkValidEmail == true ? (
          <TouchableOpacity
            disabled
            style={form.buttonDisable}
            onPress={handleSubmit}>
            <Text style={form.text}>Login</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={form.button} onPress={handleSubmit}>
            <Text style={form.text}>Login</Text>
          </TouchableOpacity>
        )}
      </View>
      </ScrollView>
      </SafeAreaView>
    );

}
