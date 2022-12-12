import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function deviceStorage (key, value) {
    
    try {
        await AsyncStorage.setItem(key, value);
        } catch (error) {
        console.log('AsyncStorage Error: ' + error.message);
        }
    
};

