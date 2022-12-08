import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import Login from './Auth/Login';
import {useState, useContext} from 'react';
import { userContext } from './Context/UserContext';
import readStoreData from './Storage/readStoreData';
import useGetJWT from './Hook/useGetJWT';

const Stack = createNativeStackNavigator();
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [loggedUser, setLoggedUser] = useState('');
const [needsLogin, setNeedsLogin] = useState(true);
const [needsUpdate, setNeedsUpdate] = useState(false)


const jwt = readStoreData();

useEffect(() => {
  if (jwt) {
      console.log('got jwt !', loggedUser)
      setLoggedUser(prev => ({
          ...prev,
          jwt
      }))
  }
}, [])

useEffect(callback => {
  if (needsLogin && email !== '') {
      console.log('login ?')
      let data = useGetJWT(email, password);
      setLoggedUser(data);
  } else if (!needsLogin && email !== '') {
    console.log('register ?', email)
    //@ts-ignore
    // doit register et setLoggedUser
  }
}, [email, password])


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {loggedUser ? (
          <Stack.Group>
            <Stack.Screen name="UserList" component={UserList}/>
            <Stack.Screen name="Profil" component={Profil}/>
            <Stack.Screen name="Setting" component={Setting}/>
            <Stack.Screen name="Logout" component={Logout}/>
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="Login" component={Login} setEmail={setEmail}
            setPassword={setPassword} needsLogin={needsLogin} setNeedsLogin={setNeedsLogin}/>
            <Stack.Screen name="Register" component={Register}/>
          </Stack.Group>
        )}
        
      </Stack.Navigator>
    </NavigationContainer>  
  );
}
