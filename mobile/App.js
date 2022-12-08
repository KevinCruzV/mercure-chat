import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import EventSource from "react-native-sse";
import CookieManager from '@react-native-cookies/cookies';

useEffect(() => {
  // storage jwt

  const url = new URL('http://localhost:3000/.well-known/mercure');
  url.searchParams.append('topic', 'https://example.com/my-private-topic');

  CookieManager.get('http://localhost:1234')
  .then((cookies) => {
    console.log('CookieManager.get =>', cookies);
  });

  //document.cookie = `mercureAuthorization=${jwt};Secure;SameSite=Strict`;

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



export default function App() {
  return (
    <SafeAreaView>
      <ScrollView>
        <Text>
          Coucou
        </Text>
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
});
