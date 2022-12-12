import {Button, View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet} from "react-native";
import React, {useEffect, useState} from 'react';
import useGetJWT from "../Hook/useGetJWT";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {form} from "../assets/Styles/Styles";
import getStorage from "../Service/getStorage";
import { BarCodeScanner } from 'expo-barcode-scanner'



export default function Login({navigation}){
    // const navigate = useNavigate();
    // let location = useLocation();
    // let from = location.state?.from?.pathname || '/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [seePassword, setSeePassword] = useState(true);
    const [checkValidEmail, setCheckValidEmail] = useState(false);
    const [jwt, setJwt] = useState('');


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
    
        // const isContainsUppercase = /^(?=.*[A-Z]).*$/;
        // if (!isContainsUppercase.test(value)) {
        //   return 'Password must have at least one Uppercase Character.';
        // }
        //
        // const isContainsLowercase = /^(?=.*[a-z]).*$/;
        // if (!isContainsLowercase.test(value)) {
        //   return 'Password must have at least one Lowercase Character.';
        // }
        //
        // const isContainsNumber = /^(?=.*[0-9]).*$/;
        // if (!isContainsNumber.test(value)) {
        //   return 'Password must contain at least one Digit.';
        // }
        //
        // const isValidLength = /^.{8,16}$/;
        // if (!isValidLength.test(value)) {
        //   return 'Password must be 8-16 Characters Long.';
        // }

        return null;
    };


    const handleSubmit = () => {
        const checkPassowrd = checkPasswordValidity(password);
        if (!checkPassowrd) {
          useGetJWT(email, password);
          const value = AsyncStorage.getItem('jwt'); 
          setJwt(value);
          navigation.navigate('UserList', {
            screen: 'UserList',
            jwt: jwt
          });
        } else {
            alert(checkPassowrd);
        }
    }
    const [scanned, setScanned] = useState(false)
    const handleQrCodeScanned = ({type, data}) => {
      setScanned(true)
      setJwt(data)
      navigation.navigate('UserList', {
        screen: 'UserList',
        jwt: jwt
      });
      console.log('data: ' + data + ' type: ' + type);
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
        {email === '' || password === '' || checkValidEmail === true ? (
          <TouchableOpacity
            disabled
            onPress={handleSubmit}>
            <Text style={form.text}>Login</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={form.button} onPress={handleSubmit}>
            <Text style={form.text}>Login</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.barcodebox}>
            <BarCodeScanner 
            onBarCodeScanned={scanned ? undefined : handleQrCodeScanned}
            style={{ height: 400, width: 400 }}
          
            />
      </View>
          <Text> {jwt} </Text>
          {scanned && <Button title='scan again' onPress={() => setScanned(false)} color='tomato' />}
      </ScrollView>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato'
  }
});