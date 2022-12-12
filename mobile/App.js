import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import UserList from "./Component/UserList";
import Login from "./Auth/Login";
import Chat from "./Component/Chat";


export default function App() {

  const [jwt, setJwt] = useState('')




  useEffect( async () => {
    // storage jwt
    try {
      const value = AsyncStorage.getItem('jwt');
      if (value !== null) {
        //We have data!!
        console.log(value);
        setJwt(await value);
      }
    } catch (error) {
      //Error retrieving data
      console.log('pas de jwt dans le storage')
    }


  }, []);
  
  const Stack = createNativeStackNavigator();


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/*{jwt ? (*/}
        {/*  <Stack.Group>*/}
            <Stack.Screen name="UserList" component={UserList} jwt={jwt} />
            <Stack.Screen name="Chat" component={Chat} />
          {/*</Stack.Group>*/}
        {/*) : (*/}
          {/*<Stack.Group>*/}
            <Stack.Screen name="Login" component={Login} />
          {/*</Stack.Group>*/}
        {/*)}*/}
        
        
      </Stack.Navigator>
    </NavigationContainer>  
  );
}



