import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import EventSource from "react-native-sse";
import CookieManager from '@react-native-cookies/cookies';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {userContext} from "../Context/UserContext";


const [loggedUser, setLoggedUser] = useContext(userContext);


useEffect(() => {
  // storage jwt

  const url = new URL('http://localhost:3000/.well-known/mercure');
  url.searchParams.append('topic', 'https://example.com/my-private-topic');

  CookieManager.get('http://localhost:1234')
  .then((cookies) => {
    console.log('CookieManager.get =>', cookies);
  });

  const sse = new EventSource(url, {withCredentials: true});
  
  sse.addEventListener("open", (event) => {
    console.log("Open SSE connection.");
  });

  sse.addEventListener("message", (event) => {
    console.log("New message event:", event.data);
  });
  
  sse.addEventListener("error", (event) => {
    if (event.type === "error") {
      console.error("Connection error:", event.message);
    } else if (event.type === "exception") {
      console.error("Error:", event.message, event.error);
    }
  });

  return () => {
    sse.close();
  }
}, []);

const Stack = createNativeStackNavigator();


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
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Register" component={Register}/>
          </Stack.Group>
        )}
        
      </Stack.Navigator>
    </NavigationContainer>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
