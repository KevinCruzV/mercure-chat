import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function getStorage (key) {
    
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          // We have data!!
          
        }
      } catch (error) {
        // Error retrieving data
    }
    
};

