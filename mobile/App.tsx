import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';

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
