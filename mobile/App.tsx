import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import Login from "./Auth/Login";


export default function App() {
  return (
    <SafeAreaView>
      <ScrollView>
        <Login/>
      </ScrollView>
    </SafeAreaView>
  );
}
