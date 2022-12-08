import AsyncStorage from '@react-native-async-storage/async-storage';

export default function storeData () {

  return storeData = async (value) => {
      try {
        await AsyncStorage.setItem('@storage_Key', value)
      } catch (e) {
        // saving error
        console.log("error")
      }
  }

};

